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

        // 3. Find a previewable instance — skip non-image series (e.g. AI DICOM SR)
        let imageBuffer: ArrayBuffer | null = null;
        for (const seriesId of seriesIds) {
            const seriesRes = await fetch(`${ORTHANC_URL}/series/${seriesId}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (!seriesRes.ok) continue;
            const seriesData = await seriesRes.json();
            const instanceIds = seriesData.Instances;
            if (!instanceIds || instanceIds.length === 0) continue;

            // Try to get a preview from the middle instance for best representation
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
                break; // Found a valid image, stop searching
            }
            // If 415 or other error, just move to next series
        }

        if (!imageBuffer) {
            throw new Error("No previewable image series found in this study");
        }


        // 4. Send to Telegram
        const studyUID = studyData.MainDicomTags?.StudyInstanceUID;
        const publicUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.get("host") || "localhost:3001"}`;
        const viewerUrl = `${publicUrl}/orthanc/ohif/viewer?StudyInstanceUIDs=${studyUID}`;

        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CHAT_ID || "");
        
        // Create a Blob from the ArrayBuffer
        const blob = new Blob([imageBuffer], { type: "image/jpeg" });
        formData.append("photo", blob, "preview.jpg");
        
        let caption = `PACS Preview\nPatient: ${studyData.PatientMainDicomTags?.PatientName || "Unknown"}\nID: ${studyData.PatientMainDicomTags?.PatientID || "Unknown"}\nStudy: ${studyData.MainDicomTags?.StudyDescription || "No Description"}`;
        
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

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Telegram Send Error:", error);
        return NextResponse.json({ error: error.message || "Failed to send to Telegram" }, { status: 500 });
    }
}
