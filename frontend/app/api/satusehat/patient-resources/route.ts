import { NextRequest, NextResponse } from "next/server";
import { SatuSehatService } from "@/lib/services/satusehat";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const patientId = searchParams.get("patientId");
    const accessionNumber = searchParams.get("accessionNumber");
    const encounterId = searchParams.get("encounterId");

    try {
        if (type === "config") {
            const config = await SatuSehatService.getConfig();
            return NextResponse.json({ 
                environment: config?.environment || "unknown",
                organizationId: config?.organizationId || "none"
            });
        }

        if (type === "patient") {
            const nik = searchParams.get("nik");
            if (!nik) return NextResponse.json({ error: "NIK is required" }, { status: 400 });
            const patient = await SatuSehatService.getPatientByNik(nik);
            return NextResponse.json(patient);
        }

        if (!patientId && type !== "servicerequest") {
             return NextResponse.json({ error: "patientId is required" }, { status: 400 });
        }

        let results: any[] = [];
        if (type === "encounter") {
            results = await SatuSehatService.getEncountersByPatient(patientId!);
        } else if (type === "condition") {
            results = await SatuSehatService.getConditionsByPatient(patientId!);
        } else if (type === "servicerequest") {
            if (accessionNumber) {
                results = await SatuSehatService.getServiceRequestsByIdentifier(accessionNumber);
            } else if (patientId && encounterId) {
                results = await SatuSehatService.getServiceRequestsByPatientAndEncounter(patientId, encounterId);
            } else if (patientId) {
                results = await SatuSehatService.searchResources("ServiceRequest", { subject: `Patient/${patientId}` });
            }
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
