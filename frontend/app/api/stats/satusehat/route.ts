import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SatuSehatService } from "@/lib/services/satusehat";
import { startOfDay, endOfDay, parseISO } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const startDateStr = searchParams.get("startDate");
        const endDateStr = searchParams.get("endDate");
        const environment = searchParams.get("environment") || "staging";
        const backfill = searchParams.get("backfill") === "true";

        // Handle backfill request
        if (backfill) {
            const count = await SatuSehatService.backfillLogsFromIntegrations();
            return NextResponse.json({ success: true, backfilledCount: count });
        }

        let dateFilter = {};
        if (startDateStr && endDateStr) {
            dateFilter = {
                createdAt: {
                    gte: startOfDay(parseISO(startDateStr)),
                    lte: endOfDay(parseISO(endDateStr)),
                }
            };
        }

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        // 1. Get Summary Counts grouped by resourceType
        // (We keep this separate to show total counts for filters)
        const summaryLogs = await db.satuSehatResourceLog.findMany({
            where: {
                environment,
                ...dateFilter
            }
        });

        const summary: Record<string, number> = {
            Encounter: 0,
            Condition: 0,
            Observation: 0,
            Procedure: 0,
            Composition: 0,
            MedicationRequest: 0,
            Medication: 0,
            MedicationDispense: 0,
            AllergyIntolerance: 0,
            ImagingStudy: 0,
            ServiceRequest: 0,
            ClinicalImpression: 0,
            Immunization: 0,
            QuestionnaireResponse: 0,
            MedicationStatement: 0,
            CarePlan: 0,
            Specimen: 0,
            DiagnosticReport: 0,
            EpisodeOfCare: 0,
        };

        summaryLogs.forEach(log => {
            if (log.status === "SUCCESS") {
                summary[log.resourceType] = (summary[log.resourceType] || 0) + 1;
            }
        });

        // 2. Get Paginated Transactions
        const totalLogs = await db.satuSehatResourceLog.count({
            where: {
                environment,
                ...dateFilter
            }
        });

        const recentLogs = await db.satuSehatResourceLog.findMany({
            where: {
                environment,
                ...dateFilter
            },
            orderBy: {
                createdAt: "desc"
            },
            skip,
            take: limit
        });

        // 3. Get total count for organization (from settings)
        const settings = await db.satuSehatSetting.findFirst({ where: { id: 1 } });
        const orgId = environment === "production" ? settings?.prdOrganizationId : settings?.stgOrganizationId;

        return NextResponse.json({
            summary,
            logs: recentLogs,
            pagination: {
                total: totalLogs,
                page,
                limit,
                totalPages: Math.ceil(totalLogs / limit)
            },
            orgId: orgId || "Unknown",
            environment
        });

    } catch (error: any) {
        console.error("SatuSehat Stats API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch stats" }, { status: 500 });
    }
}
