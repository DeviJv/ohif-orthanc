import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";

// Proteksi container vital agar tidak bisa dimatikan via UI
const PROTECTED_CONTAINERS = ["quantum-web", "pacs-gateway", "backend", "viewer", "nginx"];

/**
 * Mencari path executable docker secara dinamis
 */
async function getDockerPath() {
    try {
        const { stdout } = await execAsync("which docker");
        return stdout.trim() || "docker";
    } catch {
        // Fallback ke path umum di Mac jika 'which' gagal di environment tertentu
        return "/usr/local/bin/docker";
    }
}

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const containerId = searchParams.get("id");

    const dockerPath = await getDockerPath();

    try {
        // 1. Ambil Logs
        if (action === "logs" && containerId) {
            const { stdout, stderr } = await execAsync(`${dockerPath} logs --tail 100 ${containerId}`);
            return NextResponse.json({ logs: stdout || stderr });
        }

        // 2. Ambil List Container
        // Menggunakan format JSON agar mudah di-parse oleh frontend
        const format = '{"ID":"{{.ID}}", "Names":"{{.Names}}", "State":"{{.State}}", "Status":"{{.Status}}", "Image":"{{.Image}}"}';
        const { stdout } = await execAsync(`${dockerPath} ps -a --format '${format}'`);
        
        const containers = stdout.trim().split("\n")
            .filter(line => line.trim() !== "")
            .map(line => {
                try {
                    const data = JSON.parse(line);
                    return {
                        ...data,
                        isProtected: PROTECTED_CONTAINERS.some(p => data.Names.includes(p))
                    };
                } catch (e) {
                    return null;
                }
            })
            .filter(Boolean);

        return NextResponse.json({ containers });
    } catch (error: any) {
        console.error("[DOCKER API ERROR]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const body = await req.json();
    const { action, containerId, containerName } = body;

    if (!containerId || !action) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Proteksi Self-Destruct
    const isProtected = PROTECTED_CONTAINERS.some(p => containerName?.includes(p));
    if (isProtected && (action === "stop" || action === "restart")) {
        return NextResponse.json({ error: "Cannot stop or restart system core containers via UI." }, { status: 403 });
    }

    const dockerPath = await getDockerPath();

    try {
        let command = "";
        switch (action) {
            case "start": command = `${dockerPath} start ${containerId}`; break;
            case "stop": command = `${dockerPath} stop ${containerId}`; break;
            case "restart": command = `${dockerPath} restart ${containerId}`; break;
            default: throw new Error("Invalid action");
        }

        await execAsync(command);
        return NextResponse.json({ success: true, message: `Container ${action}ed successfully` });
    } catch (error: any) {
        console.error("[DOCKER POST ERROR]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
