import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const env = searchParams.get("env") || "staging";
    const source = searchParams.get("source") || "official"; // 'official' or 'local'

    // 1. Fetch settings from DB to get credentials
    const setting = await db.satuSehatSetting.findFirst({
        where: { id: 1 }
    });

    if (!setting) {
        return NextResponse.json({ error: "Configuration not found in database" }, { status: 404 });
    }

    const isProd = env === "production";
    const orgId = isProd ? setting.prdOrganizationId : setting.stgOrganizationId;
    const clientId = isProd ? setting.prdClientId : setting.stgClientId;
    const clientSecret = isProd ? setting.prdClientSecret : setting.stgClientSecret;
    let baseUrl = isProd ? setting.prdBaseUrl : setting.stgBaseUrl;
    
    if (baseUrl && baseUrl.includes("/fhir-r4/v1")) {
        baseUrl = baseUrl.split("/fhir-r4/v1")[0];
    }

    // 2. Handle Local Optimized Download
    if (source === "local") {
        try {
            // Read from our project's own template which is optimized for Quantum integration
            const fs = await import("fs/promises");
            const path = await import("path");
            const templatePath = path.join(process.cwd(), "dicom-router/docker-compose.yml");
            let localYaml = await fs.readFile(templatePath, "utf-8");

            // Populate credentials
            localYaml = localYaml
                .replace(/\$\{ORG_ID\}/g, orgId || "")
                .replace(/\$\{CLIENT_ID\}/g, clientId || "")
                .replace(/\$\{CLIENT_SECRET\}/g, clientSecret || "")
                .replace(/\$\{SATUSEHAT_URL\}/g, baseUrl || "")
                .replace(/\$\{INTERNAL_PACS_KEY\}/g, process.env.INTERNAL_PACS_KEY || "secret_key");

            console.log(`[DOWNLOAD-ROUTER] Served local optimized YAML for ${env}.`);

            return new NextResponse(localYaml, {
                status: 200,
                headers: {
                    "Content-Type": "application/x-yaml",
                    "Content-Disposition": `attachment; filename="docker-compose-quantum.yml"`,
                    "Cache-Control": "no-cache",
                },
            });
        } catch (e: any) {
            console.error("[DOWNLOAD-ROUTER] Failed to serve local template:", e);
            // Fallback to official if local fails
        }
    }

    // 3. Handle Official Download (from Satu Sehat API)
    if (!token) {
        return NextResponse.json({ error: "Token is required for official download" }, { status: 400 });
    }

    const targetUrl = isProd
        ? "https://api-satusehat.kemkes.go.id/dicom-router"
        : "https://api-satusehat-stg.dto.kemkes.go.id/dicom-router";

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "*/*",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ 
                error: `Satu Sehat API error: ${response.statusText}`,
                details: errorText
            }, { status: response.status });
        }

        const buffer = await response.arrayBuffer();
        const uint8 = new Uint8Array(buffer);

        // Check for ZIP magic number (PK\x03\x04)
        const isZip = uint8[0] === 0x50 && uint8[1] === 0x4B && uint8[2] === 0x03 && uint8[3] === 0x04;

        if (isZip) {
            console.log(`[DOWNLOAD-ROUTER] Detected ZIP archive from Satu Sehat. Serving as .zip.`);
            return new NextResponse(buffer, {
                status: 200,
                headers: {
                    "Content-Type": "application/zip",
                    "Content-Disposition": 'attachment; filename="dicom-router-official.zip"',
                    "Cache-Control": "no-cache",
                },
            });
        }

        // If it's text (YAML), try to populate it
        let templateContent = new TextDecoder().decode(buffer);
        
        const injectValue = (content: string, key: string, value: string) => {
            const regex = new RegExp(`(${key}\\s*[:=]\\s*)(.*)`, "g");
            return content.replace(regex, `$1${value || ""}`);
        };

        templateContent = injectValue(templateContent, "ORG_ID", orgId || "");
        templateContent = injectValue(templateContent, "CLIENT", clientId || "");
        templateContent = injectValue(templateContent, "SECRET", clientSecret || "");
        templateContent = injectValue(templateContent, "URL", baseUrl || "");

        return new NextResponse(templateContent, {
            status: 200,
            headers: {
                "Content-Type": "application/x-yaml",
                "Content-Disposition": 'attachment; filename="docker-compose.yml"',
                "Cache-Control": "no-cache",
            },
        });
    } catch (error: any) {
        console.error("[DOWNLOAD-ROUTER] Exception:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
