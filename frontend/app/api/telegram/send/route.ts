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

function calculateAgeString(birthDateStr: string | undefined) {
    if (!birthDateStr || birthDateStr.length !== 8) return "Unknown";
    
    const year = parseInt(birthDateStr.substring(0, 4), 10);
    const month = parseInt(birthDateStr.substring(4, 6), 10) - 1;
    const day = parseInt(birthDateStr.substring(6, 8), 10);
    
    const birthDate = new Date(year, month, day);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return `${years} thn, ${months} bln, ${days} hr`;
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

        // 1. Get Study details
        const studyResponse = await fetch(`${ORTHANC_URL}/studies/${studyId}`, {
            headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
        });

        if (!studyResponse.ok) {
            throw new Error(`Failed to fetch study details: ${studyResponse.status}`);
        }

        const studyData = await studyResponse.json();
        const seriesIds = studyData.Series || [];

        if (seriesIds.length === 0) {
            throw new Error("No series found in this study");
        }

        // 2. Collect one valid IMAGE instance from each series (up to 10 for Telegram Album)
        const imageInstances: { instanceId: string; modality: string }[] = [];

        for (const sId of seriesIds) {
            if (imageInstances.length >= 10) break; // Telegram limit

            const sRes = await fetch(`${ORTHANC_URL}/series/${sId}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (sRes.ok) {
                const sData = await sRes.json();
                const mod = sData.MainDicomTags?.Modality?.trim().toUpperCase();
                
                // Skip non-image modalities
                if (!mod || ["SR", "SC", "PR"].includes(mod)) {
                    continue;
                }

                if (sData.Instances && sData.Instances.length > 0) {
                    imageInstances.push({
                        instanceId: sData.Instances[0],
                        modality: mod
                    });
                }
            }
        }

        // Fallback if no image modality found: take first instance of first series
        if (imageInstances.length === 0) {
            const sRes = await fetch(`${ORTHANC_URL}/series/${seriesIds[0]}`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });
            if (sRes.ok) {
                const sData = await sRes.json();
                if (sData.Instances && sData.Instances.length > 0) {
                    imageInstances.push({
                        instanceId: sData.Instances[0],
                        modality: sData.MainDicomTags?.Modality || "Unknown"
                    });
                }
            }
        }

        if (imageInstances.length === 0) {
            throw new Error("No instances found in this study");
        }

        // 3. Prepare Caption
        const studyUID = studyData.MainDicomTags?.StudyInstanceUID;
        const publicUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost";
        const viewerUrl = `${publicUrl}/worklist?viewer=${studyUID}`;
        const exportUrl = `${publicUrl}/worklist?export=${studyUID}`;

        const birthDate = studyData.PatientMainDicomTags?.PatientBirthDate;
        const ageStr = calculateAgeString(birthDate);

        let caption = `PACS Preview\nPatient: ${studyData.PatientMainDicomTags?.PatientName || "Unknown"}\nID: ${studyData.PatientMainDicomTags?.PatientID || "Unknown"}\nUmur: ${ageStr}\nStudy: ${studyData.MainDicomTags?.StudyDescription || "No Description"}`;
        
        if (studyUID) {
            caption += `\n\n🔗 View in OHIF:\n${viewerUrl}`;
            caption += `\n\n📄 Print Kesimpulan:\n${exportUrl}`;
        }

        // 4. Send to Telegram
        if (imageInstances.length > 1) {
            // Send Media Group (Album)
            const formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID || "");
            
            const media = [];
            for (let i = 0; i < imageInstances.length; i++) {
                const previewRes = await fetch(`${ORTHANC_URL}/instances/${imageInstances[i].instanceId}/preview`, {
                    headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
                });
                if (!previewRes.ok) continue;

                const buffer = await previewRes.arrayBuffer();
                const blob = new Blob([buffer], { type: "image/jpeg" });
                const partName = `photo${i}`;
                formData.append(partName, blob, `${partName}.jpg`);
                
                media.push({
                    type: "photo",
                    media: `attach://${partName}`,
                    caption: i === 0 ? caption : undefined // Caption only on the first photo
                });
            }

            formData.append("media", JSON.stringify(media));

            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`;
            const telegramResponse = await fetch(telegramUrl, {
                method: "POST",
                body: formData
            });

            if (!telegramResponse.ok) {
                const errorData = await telegramResponse.json();
                throw new Error(`Telegram MediaGroup error: ${errorData.description || telegramResponse.statusText}`);
            }
        } else {
            // Send Single Photo
            const selectedInstanceId = imageInstances[0].instanceId;
            const previewResponse = await fetch(`${ORTHANC_URL}/instances/${selectedInstanceId}/preview`, {
                headers: { "Authorization": `Basic ${ORTHANC_AUTH}` }
            });

            if (!previewResponse.ok) {
                throw new Error(`Failed to fetch instance preview: ${previewResponse.status}`);
            }

            const imageBuffer = await previewResponse.arrayBuffer();
            const formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID || "");
            const blob = new Blob([imageBuffer], { type: "image/jpeg" });
            formData.append("photo", blob, "preview.jpg");
            formData.append("caption", caption);

            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
            const telegramResponse = await fetch(telegramUrl, {
                method: "POST",
                body: formData
            });

            if (!telegramResponse.ok) {
                const errorData = await telegramResponse.json();
                throw new Error(`Telegram Photo error: ${errorData.description || telegramResponse.statusText}`);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Telegram Send Error:", error);
        return NextResponse.json({ error: error.message || "Failed to send to Telegram" }, { status: 500 });
    }
}
