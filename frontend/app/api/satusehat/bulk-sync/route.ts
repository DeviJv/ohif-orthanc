import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { studyIds, type = "MANUAL" } = body;

        if (!Array.isArray(studyIds) || studyIds.length === 0) {
            return NextResponse.json({ error: "studyIds must be a non-empty array" }, { status: 400 });
        }

        // Create the task
        const task = await db.satuSehatBulkSyncTask.create({
            data: {
                type,
                status: "PENDING",
                totalItems: studyIds.length,
                studyIds: studyIds,
            }
        });

        // Start background worker
        const appUrl = process.env.FRONTEND_INTERNAL_URL || "http://127.0.0.1:3001";
        
        (async () => {
            try {
                // Initial short delay
                await new Promise(r => setTimeout(r, 1000));
                
                await db.satuSehatBulkSyncTask.update({
                    where: { id: task.id },
                    data: { status: "PROCESSING" }
                });

                let successCount = 0;
                let failCount = 0;
                let errors: any[] = [];

                for (let i = 0; i < studyIds.length; i++) {
                    const studyId = studyIds[i];
                    
                    // Update current processing ID
                    await db.satuSehatBulkSyncTask.update({
                        where: { id: task.id },
                        data: { currentStudyId: studyId }
                    });

                    try {
                        const bridgeRes = await fetch(`${appUrl}/api/satusehat/bridge`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ studyInstanceUid: studyId })
                        });

                        if (bridgeRes.ok) {
                            successCount++;
                        } else {
                            const errData = await bridgeRes.json().catch(() => ({}));
                            failCount++;
                            errors.push({ studyId, error: errData.error || "Gagal sinkronisasi" });
                        }
                    } catch (error: any) {
                        failCount++;
                        errors.push({ studyId, error: error.message });
                    }

                    // Update progress incrementally (every 5 items or at the end to save DB calls)
                    if ((i + 1) % 5 === 0 || i === studyIds.length - 1) {
                        await db.satuSehatBulkSyncTask.update({
                            where: { id: task.id },
                            data: { successCount, failCount, errors }
                        });
                    }

                    // Delay to respect rate limits
                    await new Promise(r => setTimeout(r, 500));
                }

                // Mark completed
                await db.satuSehatBulkSyncTask.update({
                    where: { id: task.id },
                    data: { 
                        status: "COMPLETED", 
                        completedAt: new Date(),
                        successCount,
                        failCount,
                        errors,
                        currentStudyId: null
                    }
                });
                
            } catch (fatalError: any) {
                console.error("[BULK-SYNC-WORKER] Fatal error:", fatalError);
                await db.satuSehatBulkSyncTask.update({
                    where: { id: task.id },
                    data: { 
                        status: "FAILED", 
                        completedAt: new Date(),
                        errors: [{ error: "Fatal background worker error: " + fatalError.message }]
                    }
                });
            }
        })();

        return NextResponse.json({ success: true, taskId: task.id });

    } catch (error: any) {
        console.error("[BULK-SYNC] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Get active or recently completed tasks
export async function GET(req: NextRequest) {
    try {
        // Fetch tasks that are PENDING, PROCESSING, or COMPLETED within the last 2 hours
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        
        const tasks = await db.satuSehatBulkSyncTask.findMany({
            where: {
                OR: [
                    { status: { in: ["PENDING", "PROCESSING"] } },
                    { completedAt: { gte: twoHoursAgo } }
                ]
            },
            orderBy: { createdAt: "desc" },
            take: 10
        });

        return NextResponse.json(tasks);
    } catch (error: any) {
        console.error("[BULK-SYNC] Status Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
