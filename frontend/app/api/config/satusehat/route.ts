import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/config/satusehat
 * Returns current Satu Sehat config.
 * Priority: DB → env var → empty string
 */
export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [orgIdRow, clientIdRow, secretRow, envRow] = await Promise.all([
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_ORG_ID" } }),
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_CLIENT_ID" } }),
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_CLIENT_SECRET" } }),
        db.appConfig.findUnique({ where: { key: "SATUSEHAT_ENV" } }),
    ]);

    const orgId = orgIdRow?.value || process.env.SATUSEHAT_ORG_ID || "";
    const clientId = clientIdRow?.value || process.env.SATUSEHAT_CLIENT_ID || "";
    const clientSecret = secretRow?.value || process.env.SATUSEHAT_CLIENT_SECRET || "";
    const env = envRow?.value || process.env.SATUSEHAT_ENV || "staging";

    return NextResponse.json({
        orgId,
        clientId,
        clientSecret: clientSecret,
        env,
        hasDbSecret: !!secretRow?.value,
        source: secretRow?.value ? "database" : "environment",
    });
}

/** POST /api/config/satusehat
 * Saves Satu Sehat settings to DB.
 */
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orgId, clientId, clientSecret, env } = await req.json();

    const ops: Promise<any>[] = [];

    const updateConfig = (key: string, value: any) => {
        if (typeof value === "string") {
            if (value.trim() === "") {
                ops.push(db.appConfig.deleteMany({ where: { key } }));
            } else {
                ops.push(
                    db.appConfig.upsert({
                        where: { key },
                        update: { value: value.trim() },
                        create: { key, value: value.trim() },
                    })
                );
            }
        }
    };

    updateConfig("SATUSEHAT_ORG_ID", orgId);
    updateConfig("SATUSEHAT_CLIENT_ID", clientId);
    updateConfig("SATUSEHAT_CLIENT_SECRET", clientSecret);
    updateConfig("SATUSEHAT_ENV", env);

    await Promise.all(ops);

    return NextResponse.json({ success: true });
}
