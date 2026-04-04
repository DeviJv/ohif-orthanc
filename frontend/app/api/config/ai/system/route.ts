import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import os from "os";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Gather System Metrics
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const cpus = os.cpus();
    const cpuCount = cpus.length;
    const cpuModel = cpuCount > 0 ? cpus[0].model : "Unknown CPU";

    // Format memory to GB
    const totalMemGb = (totalMem / (1024 ** 3)).toFixed(1);
    const freeMemGb = (freeMem / (1024 ** 3)).toFixed(1);
    const usedMemGb = ((totalMem - freeMem) / (1024 ** 3)).toFixed(1);

    const systemInfo = {
        totalMemGb,
        freeMemGb,
        usedMemGb,
        cpuCount,
        cpuModel,
        platform: os.platform(),
        arch: os.arch(),
    };

    // 2. Gather AI Backend Metrics
    let aiStatus = "Disconnected";
    let aiDevice = "Unknown";
    let aiMode = "LITE";
    
    // We check via fast timeout
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const aiUrl = process.env.AI_BACKEND_URL || "http://ai-engine:8000";
        const aiRes = await fetch(aiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (aiRes.ok) {
            const aiData = await aiRes.json();
            aiStatus = "Connected";
            aiDevice = aiData.device || "Unknown";
            aiMode = aiData.mode || "LITE";
        }
    } catch (e: any) {
        console.error("AI Engine not reachable from system API:", e.message);
    }

    return NextResponse.json({
        system: systemInfo,
        ai: {
            status: aiStatus,
            device: aiDevice,
            backendMode: aiMode
        }
    });
}
