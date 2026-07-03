import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { target, message, file, filename } = body;
        console.log("[WHATSAPP_DEBUG] Received body keys:", Object.keys(body), "variables:", body.variables);

        if (!target || !message) {
            return NextResponse.json({ error: "Target and message are required" }, { status: 400 });
        }

        // Get Kirimi.id Config from DB
        const configRows = await db.appConfig.findMany({
            where: { key: { in: ["KIRIMI_USER_CODE", "KIRIMI_DEVICE_ID", "KIRIMI_SECRET", "KIRIMI_WABA_ID", "KIRIMI_TEMPLATE_NAME"] } }
        });
        const config = Object.fromEntries(configRows.map(r => [r.key, r.value]));

        if (!config["KIRIMI_USER_CODE"] || !config["KIRIMI_SECRET"]) {
            return NextResponse.json({ error: "Kirimi.id API is not configured. Please set it in Settings." }, { status: 500 });
        }

        if (!config["KIRIMI_DEVICE_ID"]) {
            // Use WABA Account
            // Since we need a link for WABA, we'll temporarily send a placeholder link 
            // or we might need further implementation based on user's storage choice.
            // For now, we will format the payload according to WABA Kirimi documentation.
            // Variables for template: 1: Name, 2: Date, 3: RM, 4: Link
            
            // Extract some info from the message to populate variables (or we should pass them from frontend)
            // It's better if frontend passes the variables directly, but for now we can extract or just pass the message.
            // Since frontend currently sends a compiled `message` string, we should change frontend to pass variables or we parse it.
            // Actually, wait, the user's template requires specific variables.
            // It's better to update the API to accept `variables` array and `templateName`.
            
            // But let's build the basic WABA request first.
            const wabaPayload = {
                user_code: config["KIRIMI_USER_CODE"],
                secret: config["KIRIMI_SECRET"],
                waba_id: config["KIRIMI_WABA_ID"] || "",
                to: target,
                template_name: body.templateName || config["KIRIMI_TEMPLATE_NAME"] || "radiologi",
                variables: body.variables || [],
                // We won't use header since the template doesn't have a document header
            };

            const response = await fetch("https://api.kirimi.id/v1/waba/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(wabaPayload)
            });

            const responseText = await response.text();
            console.log(`[WHATSAPP_SEND_WABA] Target: ${target}, Status: ${response.status}, Raw Response:`, responseText);

            let data: any;
            try {
                data = JSON.parse(responseText);
            } catch (jsonErr) {
                console.error(`[WHATSAPP_SEND_WABA] Failed to parse Kirimi response as JSON. Status: ${response.status}. Raw:`, responseText);
                return NextResponse.json({ error: `Kirimi.id WABA returned invalid response (${response.status}): ${responseText}` }, { status: 500 });
            }

            if (data.status === true || data.status === "true" || data.status === 200) {
                return NextResponse.json({ success: true, data });
            } else {
                console.error("[WHATSAPP_SEND_WABA] Kirimi.id Error:", data);
                return NextResponse.json({ error: data.message || "Failed to send message via Kirimi.id WABA" }, { status: 500 });
            }

        } else {
            // Use Standard Account
            const formData = new FormData();
            formData.append("user_code", config["KIRIMI_USER_CODE"]);
            formData.append("secret", config["KIRIMI_SECRET"]);
            formData.append("device_id", config["KIRIMI_DEVICE_ID"]);
            formData.append("receiver", target);
            formData.append("message", message);

            if (file) {
                // Convert base64 to Buffer then to Blob
                const base64Data = file.split(",")[1] || file;
                const buffer = Buffer.from(base64Data, "base64");
                const blob = new Blob([buffer], { type: "application/pdf" });
                
                formData.append("file", blob, filename || "Laporan_Radiologi.pdf");
            }

            const response = await fetch("https://api.kirimi.id/v1/send-message-file", {
                method: "POST",
                body: formData
            });

            const responseText = await response.text();
            console.log(`[WHATSAPP_SEND] Target: ${target}, File attached: ${!!file}, Status: ${response.status}, Raw Response:`, responseText);

            let data: any;
            try {
                data = JSON.parse(responseText);
            } catch (jsonErr) {
                console.error(`[WHATSAPP_SEND] Failed to parse Kirimi response as JSON. Status: ${response.status}. Raw:`, responseText);
                return NextResponse.json({ error: `Kirimi.id standard returned invalid response (${response.status}): ${responseText}` }, { status: 500 });
            }

            if (data.status === true || data.status === "true" || data.status === 200) {
                return NextResponse.json({ success: true, data });
            } else {
                console.error("[WHATSAPP_SEND] Kirimi.id Error:", data);
                return NextResponse.json({ error: data.message || "Failed to send message via Kirimi.id" }, { status: 500 });
            }
        }

    } catch (error: any) {
        console.error("[WHATSAPP_SEND] Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
