import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

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
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { botToken: TELEGRAM_BOT_TOKEN, chatId: TELEGRAM_CHAT_ID } = await getTelegramCredentials();

    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "your_bot_token_here") {
        return NextResponse.json({ error: "Telegram Bot Token is not configured" }, { status: 500 });
    }

    try {
        const { studyId } = await req.json();

        if (!studyId) {
            return NextResponse.json({ error: "Study ID is required" }, { status: 400 });
        }

        // 1. Get Study details to find the first instance
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

        // 1. Find the first valid IMAGE instance (Skip SR, SC, PR)
        let selectedInstanceId: string | null = null;
        let selectedModality: string | null = null;

        for (const sId of seriesIds) {
            const sRes = await fetch(`${ORTHANC_URL}/series/${sId}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (sRes.ok) {
                const sData = await sRes.json();
                const mod = sData.MainDicomTags?.Modality?.trim().toUpperCase();
                
                console.log(`[LOG-MANUAL-V2] Checking series ${sId} modality: ${mod}`);

                // Skip non-image modalities
                if (!mod || ["SR", "SC", "PR"].includes(mod)) {
                    console.log(`[LOG-MANUAL-V2] Skipping non-image series ${sId} (${mod})`);
                    continue;
                }

                if (sData.Instances && sData.Instances.length > 0) {
                    selectedInstanceId = sData.Instances[0];
                    selectedModality = mod;
                    console.log(`[LOG-MANUAL-V2] SUCCESS: Selected ${selectedInstanceId} (Modality ${mod})`);
                    break;
                }
            }
        }

        // Fallback if no images found
        if (!selectedInstanceId) {
            console.log("[LOG-MANUAL-V2] No image modality found. Picking first instance as fallback.");
            selectedInstanceId = (await (await fetch(`${ORTHANC_URL}/series/${seriesIds[0]}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            })).json())?.Instances?.[0];
        }

        if (!selectedInstanceId) {
            throw new Error("No instances found in this study");
        }

        // 3. Get preview image of the selected instance
        const previewUrl = `${ORTHANC_URL}/instances/${selectedInstanceId}/preview`;
        const previewResponse = await fetch(previewUrl, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!previewResponse.ok) {
            throw new Error(`Failed to fetch instance preview: ${previewResponse.status} for ${selectedInstanceId}`);
        }

        const imageBuffer = await previewResponse.arrayBuffer();

        // 4. Send to Telegram
        const studyUID = studyData.MainDicomTags?.StudyInstanceUID;
        const publicUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const viewerHost = new URL(publicUrl).hostname;
        const viewerUrl = `http://${viewerHost}:3000/viewer/dicomweb?StudyInstanceUIDs=${studyUID}`;
        const exportUrl = `${publicUrl}/worklist?export=${studyUID}`;

        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CHAT_ID || "");
        
        // Create a Blob from the ArrayBuffer
        const blob = new Blob([imageBuffer], { type: "image/jpeg" });
        formData.append("photo", blob, "preview.jpg");
        
        let caption = `PACS Preview\nPatient: ${studyData.PatientMainDicomTags?.PatientName || "Unknown"}\nID: ${studyData.PatientMainDicomTags?.PatientID || "Unknown"}\nStudy: ${studyData.MainDicomTags?.StudyDescription || "No Description"}\nSOAP Dokter: -`;
        
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

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Telegram Send Error:", error);
        return NextResponse.json({ error: error.message || "Failed to send to Telegram" }, { status: 500 });
    }
}
