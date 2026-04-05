import { NextRequest, NextResponse } from "next/server";
import { emitStudyEvent } from "@/lib/events";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const INTERNAL_PACS_KEY = process.env.INTERNAL_PACS_KEY;

// --- TRIPLE-LOCK LAYER 1: In-Memory Throttle ---
// Use global to persist across Next.js hot-reloads in Docker
const globalForLocks = global as unknown as {
    triggerLocks: Map<string, number> | undefined;
};
const triggerLocks = globalForLocks.triggerLocks ?? new Map<string, number>();
if (process.env.NODE_ENV !== "production") globalForLocks.triggerLocks = triggerLocks;

const LOCK_DURATION_MS = 30000; // 30 seconds throttle per study

async function getTelegramCredentials() {
    const [tokenRow, chatIdRow] = await Promise.all([
        db.appConfig.findUnique({ where: { key: "TELEGRAM_BOT_TOKEN" } }),
        db.appConfig.findUnique({ where: { key: "TELEGRAM_CHAT_ID" } }),
    ]);

    return {
        botToken: tokenRow?.value || process.env.TELEGRAM_BOT_TOKEN || "",
        chatId: chatIdRow?.value || process.env.TELEGRAM_CHAT_ID || "",
    };
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const querySecret = searchParams.get("secret");
    const authHeader = req.headers.get("Authorization");
    const skipTelegram = searchParams.get("skipTelegram") === "1";
    
    const expectedKey = process.env.INTERNAL_PACS_KEY || "pacs_secret_token_2026";
    let isValid = (authHeader === `Bearer ${expectedKey}`) || (querySecret === expectedKey);

    if (!isValid) {
        console.error("Unauthorized Internal Request - Match failed - querySecret:", querySecret, "expectedKey:", expectedKey);
        return NextResponse.json({ error: "Unauthorized Internal Request" }, { status: 401 });
    }

    // Capture studyId early
    const { studyId } = await req.json();
    if (!studyId) {
        return NextResponse.json({ error: "Study ID is required" }, { status: 400 });
    }

    // Emit for real-time frontend notification (This triggers the SOUND and UI refresh)
    emitStudyEvent({ studyId });

    // 1. Fetch study details to get StudyInstanceUID for DB lock check
    const studyResponse = await fetch(`${ORTHANC_URL}/studies/${studyId}`, {
        headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
    });

    if (!studyResponse.ok) {
        return NextResponse.json({ error: `Failed to fetch study details: ${studyResponse.status}` }, { status: 500 });
    }

    const studyData = await studyResponse.json();
    const studyInstanceUid = studyData.MainDicomTags?.StudyInstanceUID;

    // --- TRIPLE-LOCK LAYER 2: In-Memory Check ---
    const now = Date.now();
    const lastTrigger = triggerLocks.get(studyId);
    if (lastTrigger && (now - lastTrigger < LOCK_DURATION_MS)) {
        console.log(`IN-MEMORY LOCK: Throttling trigger for ${studyId}. Gap: ${now - lastTrigger}ms`);
        return NextResponse.json({ success: true, message: "Trigger throttled (In-Memory)" });
    }
    triggerLocks.set(studyId, now);

    if (skipTelegram) {
        // --- TRIPLE-LOCK LAYER 3: Database Atomic Lock ---
        if (studyInstanceUid) {
            const existingResult = await db.aiResult.findUnique({
                where: { studyInstanceUid }
            });

            // If result exists AND is either DONE (conclusion != PROCESSING) 
            // OR is a RECENT PROCESSING task (less than 2 mins old), we skip.
            if (existingResult) {
                const isFinished = existingResult.conclusion !== "PROCESSING";
                const isRecent = (now - new Date(existingResult.updatedAt).getTime()) < (120 * 1000);
                
                if (isFinished || isRecent) {
                    console.log(`DATABASE LOCK: AI Result ${isFinished ? "FINISHED" : "IN-PROGRESS"} for ${studyInstanceUid}. Skipping trigger.`);
                    return NextResponse.json({ success: true, message: `AI already ${isFinished ? "done" : "processing"} (Database Lock)` });
                }
            }

            // CLAIM the study by marking it as PROCESSING
            await db.aiResult.upsert({
                where: { studyInstanceUid },
                update: { 
                    conclusion: "PROCESSING",
                    updatedAt: new Date()
                },
                create: {
                    studyInstanceUid,
                    modality: studyData.MainDicomTags?.Modality || "CT",
                    conclusion: "PROCESSING",
                    findings: {},
                }
            });
            console.log(`DATABASE CLAIM: Marked study ${studyInstanceUid} as PROCESSING`);
        }

        // If skipTelegram is true, it means mode is likely AUTO
        // We catch this here to trigger the AI Engine automatically
        const modeRow = await db.appConfig.findUnique({ where: { key: "AI_MODE" } });
        if (modeRow?.value === "AUTO") {
            const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "http://backend-ai:8000";
            console.log(`AUTO MODE DETECTED: Triggering AI Engine for ${studyId} at ${AI_BACKEND_URL}`);
            
            // Fire and forget AI trigger
            fetch(`${AI_BACKEND_URL}/process-dicom/${studyId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            }).catch(err => console.error("AUTO AI Trigger Failed:", err));
        }

        return NextResponse.json({ success: true, message: "SSE Event emitted, AUTO-AI task triggered if applicable" });
    }

    // 1. Get credentials (DB or Env)
    const { botToken: TELEGRAM_BOT_TOKEN, chatId: TELEGRAM_CHAT_ID } = await getTelegramCredentials();

    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "your_bot_token_here") {
        return NextResponse.json({ error: "Telegram Bot Token is not configured" }, { status: 500 });
    }

    try {
        // StudyId is already captured at line 41

        // Emit for real-time frontend notification
        emitStudyEvent({ studyId });

        if (!studyData.Series || studyData.Series.length === 0) {
            throw new Error("No series found in this study");
        }

        const seriesIds = studyData.Series;

        // 3. Find the first valid IMAGE instance (Skip SR, SC, PR)
        let selectedInstanceId: string | null = null;
        let selectedModality: string | null = null;

        for (const sId of seriesIds) {
            const sRes = await fetch(`${ORTHANC_URL}/series/${sId}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (sRes.ok) {
                const sData = await sRes.json();
                const mod = sData.MainDicomTags?.Modality?.trim().toUpperCase();
                
                console.log(`[LOG-V2] Checking series ${sId} modality: ${mod}`);

                // Skip non-image modalities
                if (!mod || ["SR", "SC", "PR"].includes(mod)) {
                    console.log(`[LOG-V2] Skipping non-image series ${sId} (${mod})`);
                    continue;
                }

                if (sData.Instances && sData.Instances.length > 0) {
                    selectedInstanceId = sData.Instances[0];
                    selectedModality = mod;
                    console.log(`[LOG-V2] SUCCESS: Selected ${selectedInstanceId} (Modality ${mod})`);
                    break;
                }
            }
        }

        // Fallback if no images found
        if (!selectedInstanceId) {
            console.log("No strictly image modality series found. Picking first available instance as fallback.");
            const sRes = await fetch(`${ORTHANC_URL}/series/${seriesIds[0]}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (sRes.ok) {
                const sData = await sRes.json();
                selectedInstanceId = sData.Instances?.[0];
            }
        }

        if (!selectedInstanceId) {
            throw new Error("No instances found in this study anyway");
        }

        // 4. Get preview image of the selected instance
        const previewUrl = `${ORTHANC_URL}/instances/${selectedInstanceId}/preview`;
        const previewResponse = await fetch(previewUrl, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!previewResponse.ok) {
            throw new Error(`Failed to fetch instance preview: ${previewResponse.status} for ${selectedInstanceId}`);
        }

        const imageBuffer = await previewResponse.arrayBuffer();

        // 5. Send to Telegram
        const studyUID = studyData.MainDicomTags?.StudyInstanceUID;
        
        // Use carefully configured variable from root .env/compose
        const publicUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
        
        const viewerUrl = `${publicUrl}/orthanc/ohif/viewer?StudyInstanceUIDs=${studyUID}`;
        const exportUrl = `${publicUrl}/worklist?export=${studyUID}`;
        const thumbUrl = `${publicUrl}/api/orthanc/instances/${selectedInstanceId}/preview`;

        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CHAT_ID || "");
        
        // Create a Blob from the ArrayBuffer
        const blob = new Blob([imageBuffer], { type: "image/jpeg" });
        formData.append("photo", blob, "preview.jpg");
        
        let caption = `🔔 NEW STUDY AUTOMATED\nPatient: ${studyData.PatientMainDicomTags?.PatientName || "Unknown"}\nID: ${studyData.PatientMainDicomTags?.PatientID || "Unknown"}\nStudy: ${studyData.MainDicomTags?.StudyDescription || "No Description"}\nSOAP Dokter: -`;
        
        if (studyUID) {
            caption += `\n\n🔗 View in OHIF:\n${viewerUrl}`;
            caption += `\n\n📄 Print Kesimpulan:\n${exportUrl}`;
        }

        formData.append("caption", caption);

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
        const telegramResponse = await fetch(telegramUrl, {
            method: "POST",
            body: formData
        });

        if (!telegramResponse.ok) {
            const errorData = await telegramResponse.json();
            throw new Error(`Telegram API error: ${errorData.description || telegramResponse.statusText}`);
        }

        return NextResponse.json({ success: true, message: "Automated Telegram sent" });
    } catch (error: any) {
        console.error("Telegram Auto-Send Error:", error);
        return NextResponse.json({ error: error.message || "Failed to auto-send to Telegram" }, { status: 500 });
    }
}
