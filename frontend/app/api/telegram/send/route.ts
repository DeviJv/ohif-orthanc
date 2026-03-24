import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ORTHANC_URL = process.env.ORTHANC_URL || "http://pacs:8042";
const ORTHANC_AUTH = Buffer.from(
    `${process.env.ORTHANC_USERNAME || "quantum"}:${process.env.ORTHANC_PASSWORD || "quantum123"}`
).toString("base64");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

        // 2. Get first series details
        const seriesResponse = await fetch(`${ORTHANC_URL}/series/${seriesIds[0]}`, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!seriesResponse.ok) {
            throw new Error(`Failed to fetch series details: ${seriesResponse.status}`);
        }

        const seriesData = await seriesResponse.json();
        const instanceIds = seriesData.Instances;

        if (!instanceIds || instanceIds.length === 0) {
            throw new Error("No instances found in this series");
        }

        // 3. Get preview image of the first instance
        const previewUrl = `${ORTHANC_URL}/instances/${instanceIds[0]}/preview`;
        const previewResponse = await fetch(previewUrl, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!previewResponse.ok) {
            throw new Error(`Failed to fetch instance preview: ${previewResponse.status}`);
        }

        const imageBuffer = await previewResponse.arrayBuffer();

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
