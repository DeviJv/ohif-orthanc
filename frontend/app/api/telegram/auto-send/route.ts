import { NextRequest, NextResponse } from "next/server";
import { emitStudyEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const INTERNAL_PACS_KEY = process.env.INTERNAL_PACS_KEY;

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const querySecret = searchParams.get("secret");
    const authHeader = req.headers.get("Authorization");
    const skipTelegram = searchParams.get("skipTelegram") === "1";
    
    console.log("Internal Auth Check:", { 
        hasAuthHeader: !!authHeader, 
        querySecret: querySecret, 
        expectedKey: INTERNAL_PACS_KEY,
        skipTelegram
    });

    let isValid = (authHeader === `Bearer ${INTERNAL_PACS_KEY}`) || (querySecret === INTERNAL_PACS_KEY);

    if (!isValid) {
        console.error("Unauthorized Internal Request - Match failed - querySecret:", querySecret);
        // Fallback check in case env is not loaded correctly yet
        if (querySecret === "pacs_secret_token_2026") {
            isValid = true;
        } else {
            return NextResponse.json({ error: "Unauthorized Internal Request" }, { status: 401 });
        }
    }

    // Capture studyId early
    const { studyId } = await req.json();
    if (!studyId) {
        return NextResponse.json({ error: "Study ID is required" }, { status: 400 });
    }

    // Emit for real-time frontend notification (This triggers the SOUND and UI refresh)
    emitStudyEvent({ studyId });

    if (skipTelegram) {
        return NextResponse.json({ success: true, message: "SSE Event emitted, Telegram skipped" });
    }

    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "your_bot_token_here") {
        return NextResponse.json({ error: "Telegram Bot Token is not configured" }, { status: 500 });
    }

    try {
        // 2. Get Study details to find the first instance
        const studyResponse = await fetch(`${ORTHANC_URL}/studies/${studyId}`, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!studyResponse.ok) {
            throw new Error(`Failed to fetch study details: ${studyResponse.status}`);
        }

        const studyData = await studyResponse.json();
        const seriesIds = studyData.Series;

        if (!seriesIds || seriesIds.length === 0) {
            throw new Error("No series found in this study");
        }

        // 3. Find a previewable instance — skip non-image series (e.g. AI DICOM SR)
        let imageBuffer: ArrayBuffer | null = null;
        for (const seriesId of seriesIds) {
            const seriesRes = await fetch(`${ORTHANC_URL}/series/${seriesId}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (!seriesRes.ok) continue;
            const seriesInfo = await seriesRes.json();
            const instanceIds = seriesInfo.Instances;
            if (!instanceIds || instanceIds.length === 0) continue;

            const midIndex = Math.floor(instanceIds.length / 2);
            const previewUrl = `${ORTHANC_URL}/instances/${instanceIds[midIndex]}/preview`;
            const previewResponse = await fetch(previewUrl, {
                headers: { 
                    "Authorization": `Basic ${ORTHANC_AUTH}`,
                    "Accept": "image/jpeg"
                }
            });

            if (previewResponse.ok) {
                imageBuffer = await previewResponse.arrayBuffer();
                break;
            }
        }

        if (!imageBuffer) {
            throw new Error("No previewable image series found in this study");
        }


        // 5. Send to Telegram
        const studyUID = studyData.MainDicomTags?.StudyInstanceUID;
        const publicUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get("host") || "localhost:3001"}`;
        const viewerUrl = `${publicUrl}/orthanc/ohif/viewer?StudyInstanceUIDs=${studyUID}`;



        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CHAT_ID || "");
        
        // Create a Blob from the ArrayBuffer
        const blob = new Blob([imageBuffer], { type: "image/jpeg" });
        formData.append("photo", blob, "preview.jpg");
        
        let caption = `🔔 NEW STUDY AUTOMATED\nPatient: ${studyData.PatientMainDicomTags?.PatientName || "Unknown"}\nID: ${studyData.PatientMainDicomTags?.PatientID || "Unknown"}\nStudy: ${studyData.MainDicomTags?.StudyDescription || "No Description"}`;
        
        if (studyUID) {
            caption += `\n\n🔗 View in OHIF:\n${viewerUrl}`;
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
