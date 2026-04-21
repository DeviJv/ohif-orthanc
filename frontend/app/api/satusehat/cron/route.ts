import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { differenceInDays } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const config = await db.satuSehatSetting.findFirst({ where: { id: 1 } });
        if (!config || !config.autoSyncEnabled) {
            return NextResponse.json({ status: "skipped", reason: "Auto sync is disabled" });
        }

        // Get current time in local timezone
        const now = new Date();
        // Since docker containers might be in UTC, we should format according to Asia/Jakarta if possible
        // But for simplicity, we'll extract the UTC + 7 manually to ensure consistency
        const options = { timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit' } as const;
        // This yields HH:MM in Jakarta time
        const currentTimeString = now.toLocaleTimeString('en-US', options);
        
        // Parse the configured time (e.g., "23:00")
        const configuredTime = config.autoSyncTime || "23:00";
        
        // Match Hour and Minute
        if (currentTimeString !== configuredTime) {
            return NextResponse.json({ status: "skipped", reason: `Not the scheduled time. Expected: ${configuredTime}, Current: ${currentTimeString}` });
        }

        // Check frequency requirements vs last run
        let shouldRun = false;
        
        if (!config.lastAutoSyncAt) {
            shouldRun = true;
        } else {
            const daysSinceLastRun = differenceInDays(now, config.lastAutoSyncAt);
            
            switch (config.autoSyncFrequency) {
                case "DAILY":
                    shouldRun = daysSinceLastRun >= 1;
                    break;
                case "EVERY_3_DAYS":
                    shouldRun = daysSinceLastRun >= 3;
                    break;
                case "WEEKLY":
                    shouldRun = daysSinceLastRun >= 7;
                    break;
                default:
                    shouldRun = daysSinceLastRun >= 1;
            }
        }

        if (!shouldRun) {
            return NextResponse.json({ status: "skipped", reason: "Frequency threshold not met today." });
        }

        console.log(`[CRON] Starting SatuSehat Bulk Sync Process... (Time: ${currentTimeString})`);

        // Update last run time immediately to prevent multiple triggers in the same minute
        await db.satuSehatSetting.update({
            where: { id: 1 },
            data: { lastAutoSyncAt: new Date() }
        });

        // ================= BACKGROUND LOGIC =================
        // Fetch the worklist to know what to sync
        const appUrl = process.env.FRONTEND_INTERNAL_URL || "http://127.0.0.1:3001";
        
        // Run asynchronously so we don't block the CRON ping response
        (async () => {
             try {
                 const worklistRes = await fetch(`${appUrl}/api/satusehat/worklist`);
                 if (!worklistRes.ok) {
                     console.error("[CRON] Failed to fetch worklist");
                     return;
                 }
                 
                 const studies = await worklistRes.json();
                 
                 // Filter studies that are NOT SUCCESS
                 const pendingStudies = studies.filter((s: any) => s.satuSehat?.status !== "SUCCESS");
                 console.log(`[CRON] Found ${pendingStudies.length} studies to sync.`);
                 
                 let successCount = 0;
                 let failCount = 0;

                 // Process sequentially to be safe with SatuSehat Rate limits
                 for (const study of pendingStudies) {
                     try {
                         const studyInstanceUid = study.MainDicomTags?.StudyInstanceUID || study.ID;
                         const bridgeRes = await fetch(`${appUrl}/api/satusehat/bridge`, {
                             method: "POST",
                             headers: { "Content-Type": "application/json" },
                             body: JSON.stringify({ studyInstanceUid: study.ID })
                         });

                         if (bridgeRes.ok) {
                             successCount++;
                         } else {
                             failCount++;
                         }
                         
                         // Small delay between requests
                         await new Promise(resolve => setTimeout(resolve, 500));
                     } catch (e) {
                         failCount++;
                     }
                 }
                 
                 console.log(`[CRON] Bulk Sync Completed. Success: ${successCount}, Failed: ${failCount}`);

             } catch (error) {
                 console.error("[CRON] Bulk Sync Routine Exception:", error);
             }
        })();

        return NextResponse.json({ status: "accepted", message: "Background bulk sync launched." });

    } catch (error: any) {
        console.error("[CRON] Gateway Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
