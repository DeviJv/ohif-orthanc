import { db } from "@/lib/db";

export interface SatuSehatConfig {
    organizationId: string;
    clientId: string;
    clientSecret: string;
    environment: "staging" | "production";
}

export class SatuSehatService {
    private static async getConfig(): Promise<SatuSehatConfig | null> {
        const configs = await db.appConfig.findMany({
            where: {
                key: {
                    in: ["SATUSEHAT_ORG_ID", "SATUSEHAT_CLIENT_ID", "SATUSEHAT_CLIENT_SECRET", "SATUSEHAT_ENV"]
                }
            }
        });

        const configMap = configs.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        const organizationId = configMap["SATUSEHAT_ORG_ID"] || process.env.SATUSEHAT_ORG_ID || "";
        const clientId = configMap["SATUSEHAT_CLIENT_ID"] || process.env.SATUSEHAT_CLIENT_ID || "";
        const clientSecret = configMap["SATUSEHAT_CLIENT_SECRET"] || process.env.SATUSEHAT_CLIENT_SECRET || "";
        const environment = (configMap["SATUSEHAT_ENV"] || process.env.SATUSEHAT_ENV || "staging") as "staging" | "production";

        if (!organizationId || !clientId || !clientSecret) {
            return null;
        }

        return {
            organizationId,
            clientId,
            clientSecret,
            environment
        };
    }

    private static cachedToken: string | null = null;
    private static tokenExpiry: number = 0; // Epoch in ms

    private static async getAccessToken(config: SatuSehatConfig): Promise<string> {
        const now = Date.now();
        
        // Use cache if token exists and hasn't expired (with 5 min safety buffer)
        if (this.cachedToken && now < (this.tokenExpiry - 5 * 60 * 1000)) {
            console.log("[SATUSEHAT SERVICE] Using cached access token.");
            return this.cachedToken;
        }

        const baseUrl = config.environment === "production"
            ? "https://api-satusehat.kemkes.go.id/oauth2/v1"
            : "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1";
            
        const authUrl = `${baseUrl}/accesstoken?grant_type=client_credentials`;

        const params = new URLSearchParams();
        params.append("client_id", config.clientId.trim());
        params.append("client_secret", config.clientSecret.trim());

        const response = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gagal mendapatkan token: ${errorText}`);
        }

        const data = await response.json();
        
        // Update cache: data.expires_in is usually in seconds (e.g. 3600)
        this.cachedToken = data.access_token;
        const expiresInMs = parseInt(data.expires_in || "3600") * 1000;
        this.tokenExpiry = now + expiresInMs;

        console.log(`[SATUSEHAT SERVICE] New token acquired. Expires in ${data.expires_in}s`);
        return this.cachedToken as string;
    }

    private static getBaseUrl(environment: "staging" | "production"): string {
        return environment === "production"
            ? "https://api-satusehat.kemkes.go.id/fhir-r4/v1"
            : "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1";
    }

    /**
     * Mencari data Pasien di Satu Sehat berdasarkan NIK
     */
    static async getPatientByNik(nik: string): Promise<{ id: string, name: string } | null> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);
        
        // Membersihkan NIK dari spasi dan memastikan encoding yang benar
        const cleanNik = nik.trim();
        const params = new URLSearchParams({
            identifier: `https://fhir.kemkes.go.id/id/nik|${cleanNik}`
        });
        
        const url = `${baseUrl}/Patient?${params.toString()}`;

        console.log(`[SATUSEHAT] GET Patient: ${url}`);
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Organization-Id": config.organizationId
            }
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error(`[SATUSEHAT] Error Response (${response.status}):`, responseText);
            let errorMessage = responseText;
            try {
                const outcome = JSON.parse(responseText);
                if (outcome.issue && outcome.issue.length > 0) {
                    errorMessage = outcome.issue[0].details?.text || outcome.issue[0].diagnostics || JSON.stringify(outcome.issue);
                }
            } catch (e) {}
            throw new Error(`Gagal mencari pasien (Status ${response.status}): ${errorMessage}`);
        }

        const data = await response.json();
        if (data.total === 0 || !data.entry || data.entry.length === 0) {
            return null;
        }

        const resource = data.entry[0].resource;
        const name = resource.name?.[0]?.text || resource.name?.[0]?.family || "Pasien Tanpa Nama";
        
        return {
            id: resource.id,
            name: name
        };
    }

    /**
     * Membuat Bundle Transaction (Encounter + Condition) untuk menembus deadlock Kemenkes
     */
    static async createBundle(params: {
        patientSsId: string;
        patientName: string;
    }): Promise<{ encounterId: string, conditionId: string, logs: string[] }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        // Sanitasi Nama secara global
        const cleanPatientName = this.sanitize(params.patientName);

        const logs: string[] = ["[BUNDLE] Menyiapkan Bundle Transaction (Encounter + Condition)..."];
        const refs = await this.getLocationAndPractitioner();
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        const now = new Date();
        const startTime = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
        const endTime = now.toISOString();
        const visitNumber = `ENC-${Date.now()}`;

        // UUID Internal harus format UUID v4 asli (Rule 20019)
        const encounterUuid = `urn:uuid:${this.generateUuid()}`;
        const conditionUuid = `urn:uuid:${this.generateUuid()}`;

        const bundle = {
            resourceType: "Bundle",
            type: "transaction",
            entry: [
                {
                    fullUrl: encounterUuid,
                    resource: {
                        resourceType: "Encounter",
                        identifier: [
                            {
                                system: `http://sys-ids.kemkes.go.id/encounter/${config.organizationId}`,
                                value: visitNumber
                            }
                        ],
                        status: "finished",
                        class: {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                            code: "AMB",
                            display: "ambulatory"
                        },
                        type: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/service-type",
                                        code: "124",
                                        display: "Radiologi"
                                    }
                                ]
                            }
                        ],
                        subject: {
                            reference: `Patient/${params.patientSsId}`,
                            display: cleanPatientName
                        },
                        participant: [
                            {
                                type: [
                                    {
                                        coding: [
                                            {
                                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                                code: "PPRF",
                                                display: "primary performer"
                                            }
                                        ]
                                    }
                                ],
                                individual: {
                                    reference: `Practitioner/${refs?.practitionerId || "N10000001"}`
                                }
                            }
                        ],
                        period: { start: startTime, end: endTime },
                        location: [
                            {
                                location: {
                                    reference: `Location/${refs?.locationId || "ef011065-38c9-46f8-9c35-d1fe68966a3e"}`
                                }
                            }
                        ],
                        diagnosis: [
                            {
                                condition: {
                                    reference: conditionUuid,
                                    display: "Pemeriksaan Kesehatan Umum"
                                },
                                use: {
                                    coding: [
                                        {
                                            system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                                            code: "AD",
                                            display: "Admission diagnosis"
                                        }
                                    ]
                                },
                                rank: 1
                            }
                        ],
                        statusHistory: [
                            {
                                status: "finished",
                                period: { start: startTime, end: endTime }
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
                        clinicalStatus: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                                    code: "active",
                                    display: "Active"
                                }
                            ]
                        },
                        verificationStatus: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                                    code: "confirmed",
                                    display: "Confirmed"
                                }
                            ]
                        },
                        category: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/condition-category",
                                        code: "encounter-diagnosis",
                                        display: "Encounter Diagnosis"
                                    }
                                ]
                            }
                        ],
                        code: {
                            coding: [
                                {
                                    system: "http://hl7.org/fhir/sid/icd-10",
                                    code: "Z00.0",
                                    display: "General medical examination"
                                }
                            ],
                            text: "Pemeriksaan Kesehatan Umum"
                        },
                        subject: {
                            reference: `Patient/${params.patientSsId}`,
                            display: cleanPatientName
                        },
                        encounter: { reference: encounterUuid },
                        recordedDate: new Date().toISOString()
                    },
                    request: { method: "POST", url: "Condition" }
                }
            ]
        };

        logs.push(`[BUNDLE] Mengirim Transaction Bundle ke ${baseUrl}...`);
        
        // Log payload untuk debugging (Lihat di Docker Console)
        console.log("[SATUSEHAT] Sending Bundle Payload:", JSON.stringify(bundle, null, 2));

        const response = await fetch(baseUrl, { 
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(bundle)
        });

        if (!response.ok) {
            const text = await response.text();
            logs.push(`[BUNDLE] ERROR: ${response.status} - ${text}`);
            throw new Error(`Gagal mengirim Bundle Paket Kunjungan (${response.status}): ${text}`);
        }

        const data = await response.json();
        
        // Parse respons Bundle untuk mengambil ID asli dari server
        let encounterId = "";
        let conditionId = "";

        if (data.entry && data.entry.length >= 2) {
            // Urutan respons sesuai dengan urutan entry di rekues
            const encRes = data.entry[0].response;
            const condRes = data.entry[1].response;
            
            // Logika ekstraksi ID yang lebih robust (mendukung URL absolut maupun relatif)
            const getUuid = (loc: string, type: string) => {
                if (!loc) return "";
                const parts = loc.split("/");
                const typeIndex = parts.indexOf(type);
                return (typeIndex !== -1 && parts[typeIndex + 1]) ? parts[typeIndex + 1] : parts[parts.length - 1];
            };

            encounterId = getUuid(encRes.location, "Encounter");
            conditionId = getUuid(condRes.location, "Condition");
        }

        logs.push(`[BUNDLE] Sukses! Encounter: ${encounterId}, Condition: ${conditionId}`);
        return { encounterId, conditionId, logs };
    }

    /**
     * Helper untuk membersihkan teks dari karakter yang merusak JSON (DICOM separators, control chars)
     */
    private static sanitize(text: string | undefined | null): string {
        if (!text) return "";
        return text
            .replace(/\^/g, ' ') // Ganti caret DICOM dengan spasi
            .replace(/[^\x20-\x7E]/g, '') // Hapus karakter non-ASCII/kontrol
            .replace(/\s+/g, ' ') // Normalkan spasi ganda
            .trim();
    }

    /**
     * Helper untuk generate UUID v4 sederhana
     */
    static generateUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Mencari Lokasi dan Praktisi (Dokter) yang terdaftar di Organisasi (untuk Sandbox)
     */
    static async getLocationAndPractitioner(): Promise<{ locationId: string, practitionerId: string } | null> {
        const config = await this.getConfig();
        if (!config) return null;

        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        // 1. Cari Lokasi
        const locUrl = `${baseUrl}/Location?organization=${config.organizationId}&_count=1`;
        const locRes = await fetch(locUrl, {
            headers: { "Authorization": `Bearer ${token}`, "X-Organization-Id": config.organizationId }
        });
        
        // 2. Cari Praktisi (Dokter) melalui PractitionerRole agar pasti nyambung ke Org
        const practUrl = `${baseUrl}/PractitionerRole?organization=${config.organizationId}&_count=1`;
        const practRes = await fetch(practUrl, {
            headers: { "Authorization": `Bearer ${token}`, "X-Organization-Id": config.organizationId }
        });

        let locationId = "";
        let practitionerId = "";

        if (locRes.ok) {
            const data = await locRes.json();
            if (data.entry?.[0]?.resource?.id) locationId = data.entry[0].resource.id;
        }

        if (practRes.ok) {
            const data = await practRes.json();
            if (data.entry?.[0]?.resource?.practitioner?.reference) {
                practitionerId = data.entry[0].resource.practitioner.reference.split("/")[1];
            }
        }

        // Fallback untuk Sandbox jika tidak ditemukan (ID Dummy Umum)
        if (!locationId) locationId = "ef011065-38c9-46f8-9c35-d1fe68966a3e"; // Contoh ID lokas umum
        if (!practitionerId) practitionerId = "N10000001"; // Contoh Praktisi (Dokter Bronsig)

        return { locationId, practitionerId };
    }

    /**
     * Membuat Condition (Diagnosis) baru otomatis
     */
    static async createCondition(params: {
        patientSsId: string;
        patientName: string;
        encounterId?: string;
    }): Promise<string> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        const body = {
            resourceType: "Condition",
            clinicalStatus: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                        code: "active",
                        display: "Active"
                    }
                ]
            },
            category: [
                {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/condition-category",
                            code: "encounter-diagnosis",
                            display: "Encounter Diagnosis"
                        }
                    ]
                }
            ],
            code: {
                coding: [
                    {
                        system: "http://hl7.org/fhir/sid/icd-10",
                        code: "Z00.0",
                        display: "General medical examination"
                    }
                ],
                text: "Pemeriksaan Kesehatan Umum"
            },
            subject: {
                reference: `Patient/${params.patientSsId}`,
                display: this.sanitize(params.patientName)
            },
            // Encounter link soptional here, but we will have it soon
            encounter: params.encounterId ? {
                reference: `Encounter/${params.encounterId}`
            } : undefined,
            recordedDate: new Date().toISOString()
        };

        const url = `${baseUrl}/Condition`;
        
        console.log("[SATUSEHAT] Sending Condition Payload:", JSON.stringify(body, null, 2));

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Gagal membuat Diagnosis otomatis (${response.status}): ${text}`);
        }

        const data = await response.json();
        return data.id;
    }

    /**
     * Membuat Encounter (Kunjungan) baru otomatis
     */
    static async createEncounter(patientSsId: string, patientName: string): Promise<string> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        // 1. Buat Condition (Diagnosis) dulu sebagai syarat Encounter
        console.log(`[SATUSEHAT] Auto-creating Diagnosis for patient: ${patientName}`);
        const conditionId = await this.createCondition({ patientSsId, patientName });
        console.log(`[SATUSEHAT] Created Condition ID: ${conditionId}`);

        const refs = await this.getLocationAndPractitioner();
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        const now = new Date();
        const startTime = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
        const endTime = now.toISOString();

        // Generate visit ID
        const visitNumber = `ENC-${Date.now()}`;

        const body = {
            resourceType: "Encounter",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/encounter/${config.organizationId}`,
                    value: visitNumber
                }
            ],
            status: "finished",
            class: {
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: "AMB",
                display: "ambulatory"
            },
            subject: {
                reference: `Patient/${patientSsId}`,
                display: patientName
            },
            participant: [
                {
                    type: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                    code: "PPRF",
                                    display: "primary performer"
                                }
                            ]
                        }
                    ],
                    individual: {
                        reference: `Practitioner/${refs?.practitionerId || "N10000001"}`
                    }
                }
            ],
            period: {
                start: startTime,
                end: endTime
            },
            location: [
                {
                    location: {
                        reference: `Location/${refs?.locationId || "ef011065-38c9-46f8-9c35-d1fe68966a3e"}`
                    }
                }
            ],
            diagnosis: [
                {
                    condition: {
                        reference: `Condition/${conditionId}`,
                        display: "Pemeriksaan Kesehatan Umum"
                    },
                    use: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                                code: "AD",
                                display: "Admission diagnosis"
                            }
                        ]
                    },
                    rank: 1
                }
            ],
            statusHistory: [
                {
                    status: "finished",
                    period: {
                        start: startTime,
                        end: endTime
                    }
                }
            ],
            serviceProvider: {
                reference: `Organization/${config.organizationId}`
            }
        };

        const url = `${baseUrl}/Encounter`;
        console.log(`[SATUSEHAT] POST Encounter (Auto-Create): ${url}`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/fhir+json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Gagal membuat Kunjungan otomatis (${response.status}): ${text}`);
        }

        const data = await response.json();
        return data.id;
    }

    /**
     * Mencari Encounter (Kunjungan) terbaru untuk pasien
     */
    static async findLatestEncounterId(patientSsId: string): Promise<string | null> {
        const config = await this.getConfig();
        if (!config) return null;

        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        // Cari encounter yang sudah selesai atau sedang berlangsung
        const params = new URLSearchParams({
            subject: `Patient/${patientSsId}`,
            "_sort": "-date",
            "_count": "1"
        });

        const url = `${baseUrl}/Encounter?${params.toString()}`;
        console.log(`[SATUSEHAT] Searching for latest Encounter: ${url}`);

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Organization-Id": config.organizationId
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        if (data.total === 0 || !data.entry || data.entry.length === 0) {
            return null;
        }

        return data.entry[0].resource.id;
    }

    /**
     * Membuat ServiceRequest baru di SATUSEHAT (digunakan otomatis jika di Sandbox)
     */
    static async createServiceRequest(params: {
        patientSsId: string;
        patientName?: string;
        accessionNumber: string;
        studyDate: string;
        encounterId?: string; // Menerima Encounter ID dari Bundle jika ada
    }): Promise<string> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        // 1. Ambil atau Buat Encounter ID
        let encounterId = params.encounterId;

        if (!encounterId) {
            console.log(`[SATUSEHAT] Mencari Encounter untuk pasien: ${params.patientSsId}`);
            encounterId = (await this.findLatestEncounterId(params.patientSsId)) || undefined;
            
            if (!encounterId) {
                if (config.environment === "staging") {
                    // Logic ini akan ditangani oleh submitImagingStudy yang baru
                } else {
                    throw new Error("Gagal membuat Order otomatis: Pasien belum memiliki data Kunjungan (Encounter) di SATUSEHAT.");
                }
            }
        }

        console.log(`[SATUSEHAT] Menggunakan Encounter ID: ${encounterId}`);

        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        const body = {
            resourceType: "ServiceRequest",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/servicerequest/${config.organizationId}`,
                    value: params.accessionNumber
                }
            ],
            status: "active",
            intent: "order",
            category: [
                {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: "363679005",
                            display: "Imaging"
                        }
                    ]
                }
            ],
            code: {
                coding: [
                    {
                        system: "http://loinc.org",
                        code: "24648-8",
                        display: "XR Chest PA upr"
                    }
                ],
                text: "Pemeriksaan Radiologi"
            },
            subject: {
                reference: `Patient/${params.patientSsId}`,
                display: this.sanitize(params.patientName)
            },
            encounter: {
                reference: `Encounter/${encounterId}`
            },
            requester: {
                reference: `Organization/${config.organizationId}`
            },
            performer: [
                {
                    reference: `Organization/${config.organizationId}`
                }
            ],
            authoredOn: new Date().toISOString(),
            occurrenceDateTime: params.studyDate.length === 8 
                ? `${params.studyDate.substring(0, 4)}-${params.studyDate.substring(4, 6)}-${params.studyDate.substring(6, 8)}T00:00:00+00:00`
                : params.studyDate
        };

        const url = `${baseUrl}/ServiceRequest`;
        
        console.log("[SATUSEHAT] Sending ServiceRequest Payload:", JSON.stringify(body, null, 2));

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error(`[SATUSEHAT] Error creating ServiceRequest (${response.status}):`, responseText);
            throw new Error(`Gagal membuat Order otomatis (${response.status}): ${responseText}`);
        }

        const data = await response.json();
        return data.id;
    }

    /**
     * Mencari ID ServiceRequest di Satu Sehat berdasarkan Accession Number
     */
    static async findServiceRequestIdByAccession(accession: string): Promise<string | null> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);
        
        // Menggunakan sistem penomoran akses radiologi SATUSEHAT
        const params = new URLSearchParams({
            identifier: `http://sys-ids.kemkes.go.id/servicerequest/${config.organizationId}|${accession}`
        });
        
        const url = `${baseUrl}/ServiceRequest?${params.toString()}`;
        console.log(`[SATUSEHAT] GET ServiceRequest by Accession: ${url}`);

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Organization-Id": config.organizationId
            }
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error(`[SATUSEHAT] Error searching ServiceRequest (${response.status}):`, responseText);
            return null;
        }

        const data = await response.json();
        if (data.total === 0 || !data.entry || data.entry.length === 0) {
            console.warn(`[SATUSEHAT] No ServiceRequest found for Accession: ${accession}`);
            return null;
        }

        return data.entry[0].resource.id;
    }

    /**
     * Mencari UUID Pasien di Satu Sehat berdasarkan NIK
     */
    static async getPatientIdByNik(nik: string): Promise<string | null> {
        const patient = await this.getPatientByNik(nik);
        return patient?.id || null;
    }

    /**
     * Mengirim data ImagingStudy ke Satu Sehat
     */
    static async submitImagingStudy(params: {
        studyInstanceUid: string;
        patientSsId: string;
        patientName: string;
        modality: string;
        studyDate: string; // ISO format or YYYYMMDD
        accessionNumber?: string;
        description?: string;
        numberOfSeries?: number;
        numberOfInstances?: number;
    }): Promise<{ id: string, logs: string[] }> {
        const config = await this.getConfig();
        const logs: string[] = [];
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const baseUrl = this.getBaseUrl(config.environment);

        // 1. Cari atau Buat Bundle (Encounter + Condition)
        let serviceRequestId = null;
        let encounterId = null;

        if (params.accessionNumber) {
            logs.push(`[STEP 1] Mencari Order (ServiceRequest) untuk Accession: ${params.accessionNumber}`);
            serviceRequestId = await this.findServiceRequestIdByAccession(params.accessionNumber);
            
            if (!serviceRequestId) {
                if (config.environment === "staging") {
                    logs.push(`[STEP 1] Order tidak ditemukan. Menyiapkan Kunjungan & Diagnosis (Bundle)...`);
                    const bundleRes = await this.createBundle({
                        patientSsId: params.patientSsId,
                        patientName: params.patientName
                    });
                    logs.push(...bundleRes.logs);
                    encounterId = bundleRes.encounterId;

                    logs.push(`[STEP 1] Membuat Order otomatis (ServiceRequest)...`);
                    serviceRequestId = await this.createServiceRequest({
                        patientSsId: params.patientSsId,
                        patientName: params.patientName,
                        accessionNumber: params.accessionNumber,
                        studyDate: params.studyDate,
                        encounterId: encounterId // Oper ID kunjungan baru
                    });
                    logs.push(`[STEP 1] Order berhasil dibuat ID: ${serviceRequestId}`);
                } else {
                    throw new Error(`Order (ServiceRequest) tidak ditemukan di SATUSEHAT Production untuk Accession: ${params.accessionNumber}.`);
                }
            } else {
                logs.push(`[STEP 1] Order ditemukan ID: ${serviceRequestId}`);
                // Jika order sudah ada, kita coba cari encounternya juga untuk link ImagingStudy
                encounterId = await this.findLatestEncounterId(params.patientSsId);
            }
        } else {
            throw new Error("Accession Number wajib ada untuk bridging ke SATUSEHAT.");
        }

        const basedOn = [{
            reference: `ServiceRequest/${serviceRequestId}`
        }];

        // Hubungkan juga ke Encounter jika ditemukan (Objek tunggal, bukan array)
        const encounterReference = encounterId ? { reference: `Encounter/${encounterId}` } : undefined;

        const token = await this.getAccessToken(config);

        // Map DICOM Date (YYYYMMDD) to ISO format if needed
        let started = params.studyDate;
        if (params.studyDate.length === 8) {
            started = `${params.studyDate.substring(0, 4)}-${params.studyDate.substring(4, 6)}-${params.studyDate.substring(6, 8)}T00:00:00+00:00`;
        }

        const body: any = {
            resourceType: "ImagingStudy",
            status: "available",
            subject: {
                reference: `Patient/${params.patientSsId}`,
                display: this.sanitize(params.patientName)
            },
            started: started,
            basedOn: basedOn,
            encounter: encounterReference,
            description: this.sanitize(params.description || "Radiological Study"),
            identifier: [
                {
                    use: "official",
                    system: "urn:dicom:uid",
                    value: `urn:oid:${params.studyInstanceUid}`
                }
            ],
            modality: [
                {
                    system: "http://dicom.nema.org/resources/ontology/DCM",
                    code: params.modality
                }
            ],
            numberOfSeries: params.numberOfSeries || 1,
            numberOfInstances: params.numberOfInstances || 1,
        };

        if (params.accessionNumber) {
            body.identifier.push({
                use: "usual",
                system: `http://sys-ids.kemkes.go.id/accession/${config.organizationId}`,
                value: params.accessionNumber
            });
        }

        logs.push(`[STEP 2] Mengirim ImagingStudy ke SATUSEHAT...`);
        const urlCombined = `${baseUrl}/ImagingStudy`;
        
        console.log("[SATUSEHAT] Sending ImagingStudy Payload:", JSON.stringify(body, null, 2));

        const response = await fetch(urlCombined, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(body)
        });

        const responseText = await response.text();
        
        if (!response.ok) {
            logs.push(`[STEP 2] ERROR: ${response.status} - ${responseText}`);
            let errorMessage = responseText;
            try {
                const outcome = JSON.parse(responseText);
                if (outcome.issue && outcome.issue.length > 0) {
                    errorMessage = outcome.issue[0].details?.text || outcome.issue[0].diagnostics || JSON.stringify(outcome.issue);
                }
            } catch (e) {}
            throw new Error(`Gagal mengirim ImagingStudy (Status ${response.status}): ${errorMessage}`);
        }

        try {
            const data = JSON.parse(responseText);
            logs.push(`[STEP 2] Sukses! ImagingStudy terdaftar ID: ${data.id || "N/A"}`);
            return { id: data.id, logs };
        } catch (e) {
            logs.push(`[STEP 2] Sukses! (Format respons tidak standar)`);
            return { id: "SUCCESS-RAW", logs };
        }
    }
}
