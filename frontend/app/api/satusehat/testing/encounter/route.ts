import { NextResponse } from "next/server";
import { SatuSehatService } from "@/lib/services/satusehat";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { patientId, practitionerId, patientName, diagnosisCode, diagnosisDisplay, startTime } = body;

        if (!patientId || !practitionerId) {
            return NextResponse.json({ success: false, error: "Patient ID & Practitioner ID diwajibkan" }, { status: 400 });
        }

        const config = await SatuSehatService.getConfig();
        if (!config) {
            return NextResponse.json({ success: false, error: "Konfigurasi Satu Sehat tidak ditemukan" }, { status: 500 });
        }

        const token = await SatuSehatService.getAccessToken(config);
        const baseUrl = SatuSehatService.getBaseUrl(config.environment);
        const locationId = await SatuSehatService.getOrCreateLocationId(config);
        
        // Kemkes strict UTC formatter: Strips milliseconds and ensures +00:00 exactly
        const formatKemkesTime = (d: Date | string) => {
            const date = new Date(d);
            return date.toISOString().split(".")[0] + "+00:00";
        };

        const encounterUuid = `urn:uuid:${SatuSehatService.generateUuid()}`;
        const conditionUuid = `urn:uuid:${SatuSehatService.generateUuid()}`;

        const startTimeFormatted = startTime ? formatKemkesTime(startTime) : formatKemkesTime(new Date(Date.now() - 3600000)); // 1 hour ago
        const endTimeFormatted = formatKemkesTime(new Date());

        // Basic Encounter + Condition Builder for testing RuleNumber 10457
        const bundlePayload = {
            resourceType: "Bundle",
            type: "transaction",
            entry: [
                {
                    fullUrl: encounterUuid,
                    resource: {
                        resourceType: "Encounter",
                        identifier: [
                            {
                                system: "http://sys-ids.kemkes.go.id/encounter/" + config.organizationId,
                                value: "TEST-" + Date.now()
                            }
                        ],
                        status: "finished",
                        class: {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                            code: "AMB",
                            display: "ambulatory"
                        },
                        subject: {
                            reference: `Patient/${patientId}`,
                            display: patientName || "Testing Patient"
                        },
                        participant: [
                            {
                                type: [
                                    {
                                        coding: [
                                            {
                                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                                code: "ATND",
                                                display: "attender"
                                            }
                                        ]
                                    }
                                ],
                                individual: {
                                    reference: `Practitioner/${practitionerId}`
                                }
                            }
                        ],
                        period: {
                            start: startTimeFormatted,
                            end: endTimeFormatted
                        },
                        location: [
                            {
                                location: {
                                    reference: `Location/${locationId}`,
                                    display: "Unit Radiologi"
                                }
                            }
                        ],
                        diagnosis: [
                            {
                                condition: { reference: conditionUuid },
                                use: {
                                    coding: [{
                                        system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                                        code: "AD",
                                        display: "Admission diagnosis"
                                    }]
                                }
                            }
                        ],
                        statusHistory: [
                            {
                                status: "finished",
                                period: {
                                    start: startTimeFormatted,
                                    end: endTimeFormatted
                                }
                            }
                        ],
                        serviceProvider: {
                            reference: `Organization/${config.organizationId}`
                        }
                    },
                    request: { method: "POST", url: "Encounter" }
                },
                {
                    fullUrl: conditionUuid,
                    resource: {
                        resourceType: "Condition",
                        clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
                        category: [{
                            coding: [{
                                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                                code: "encounter-diagnosis",
                                display: "Encounter Diagnosis"
                            }]
                        }],
                        code: {
                            coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: "Z00.0", display: "General medical examination" }],
                            text: "Testing Diagnosis"
                        },
                        subject: { reference: `Patient/${patientId}`, display: patientName || "Testing Patient" },
                        encounter: { reference: encounterUuid }
                    },
                    request: { method: "POST", url: "Condition" }
                }
            ]
        };

        const response = await fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            body: JSON.stringify(bundlePayload)
        });

        const data = await response.json();

        return NextResponse.json({
            success: response.ok,
            status: response.status,
            payloadSent: bundlePayload,
            kemkesResponse: data
        });

    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message || "Unknown error occurred"
        }, { status: 500 });
    }
}
