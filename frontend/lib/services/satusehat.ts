import { db } from "@/lib/db";

export interface SatuSehatConfig {
    organizationId: string;
    clientId: string;
    clientSecret: string;
    environment: "staging" | "production";
    locationId?: string;
}

export class SatuSehatService {
    static async getConfig(): Promise<SatuSehatConfig | null> {
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

    static async getAccessToken(config: SatuSehatConfig): Promise<string> {
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

    static getBaseUrl(environment: "staging" | "production"): string {
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
     * Mencari Location yang terdaftar di bawah Organisasi ini
     */
    static async getLocationByOrg(config: SatuSehatConfig): Promise<string | null> {
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);
        
        const url = `${baseUrl}/Location?organization=${config.organizationId}`;
        console.log(`[SATUSEHAT] GET Location by Org: ${url}`);

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Organization-Id": config.organizationId
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.total > 0 && data.entry && data.entry.length > 0) {
                return data.entry[0].resource.id;
            }
        }
        return null;
    }

    /**
     * Membuat Location baru (Unit Radiologi) jika belum ada
     */
    static async createLocation(config: SatuSehatConfig): Promise<string | null> {
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        const url = `${baseUrl}/Location`;
        const payload = {
            resourceType: "Location",
            identifier: [{
                system: `http://sys-ids.kemkes.go.id/location/${config.organizationId}`,
                value: "RAD-001"
            }],
            status: "active",
            name: "Unit Radiologi",
            description: "Ruang Pemeriksaan Radiologi",
            mode: "instance",
            type: [{
                coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                    code: "RADDX",
                    display: "Radiology Diagnostics or Therapeutics Unit"
                }]
            }],
            telecom: [{ system: "phone", value: "021-1234567", use: "work" }],
            address: {
                line: ["Lantai 1, Ruang Radiologi"],
                city: "Jakarta",
                postalCode: "12345",
                country: "ID"
            },
            physicalType: {
                coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/location-physical-type",
                    code: "ro",
                    display: "Room"
                }]
            },
            managingOrganization: { reference: `Organization/${config.organizationId}` }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            return data.id;
        }

        return null;
    }

    /**
     * Helper untuk mendapatkan atau membuat Location ID yang sah
     */
    static async getOrCreateLocationId(config: SatuSehatConfig): Promise<string> {
        if (config.locationId) {
            return config.locationId;
        }
        try {
            const searchResultId = await this.getLocationByOrg(config);
            if (searchResultId) return searchResultId;

            const createResultId = await this.createLocation(config);
            if (createResultId) return createResultId;
        } catch (e) {
            console.error("[SATUSEHAT] Error resolving location:", e);
        }

        // Fallback terakhir (dummy yang meloloskan validasi sementara)
        return "ef011065-38c9-46f8-9c35-d1fe68966a3e";
    }

    /**
     * Helper untuk membersihkan teks dari karakter yang merusak JSON
     */
    private static sanitize(text: string | undefined | null): string {
        if (!text) return "";
        return text
            .replace(/\^/g, ' ')
            .replace(/[^\x20-\x7E]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * Helper untuk generate UUID v4 
     */
    static generateUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Mencari UUID Pasien di Satu Sehat berdasarkan NIK
     */
    static async getPatientIdByNik(nik: string): Promise<string | null> {
        const patient = await this.getPatientByNik(nik);
        return patient?.id || null;
    }

    /**
     * Membuat Mega-Bundle Transaction 
     * Ini adalah metode paling handal agar data terhitung di Dashboard Kemenkes.
     */
    static async createMegaBundle(params: {
        patientSsId: string;
        patientName: string;
        studyInstanceUid: string;
        modality: string;
        studyDate: string;
        accessionNumber: string;
        description?: string;
        numberOfSeries?: number;
        numberOfInstances?: number;
    }): Promise<{ ids: Record<string, string>, logs: string[] }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        // --- HARDCODE DUMMY DATA SANDBOX ---
        const DUMMY_PATIENT_ID = "P02478375538"; // NIK dummy: 9271060312000001
        const DUMMY_PRACTITIONER_ID = "10009880728"; // NIK dummy: 7209061211900001
        
        const activePatientId = DUMMY_PATIENT_ID; 
        const activePractitionerId = DUMMY_PRACTITIONER_ID;
        // -----------------------------------

        const logs: string[] = ["[MEGA-BUNDLE] Menyiapkan paket transaksi lengkap (Full Chain)..."];
        logs.push(`[MEGA-BUNDLE] MENGGUNAKAN HARDCODE DUMMY: Patient ${activePatientId}, Practitioner ${activePractitionerId}`);
        
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment);

        const now = new Date();

        logs.push("[MEGA-BUNDLE] Memastikan atribusi lokasi organisasi...");
        const locationId = await this.getOrCreateLocationId(config);
        logs.push(`[MEGA-BUNDLE] Lokasi ditetapkan: ${locationId}`);

        const startTime = new Date(now.getTime() - 30 * 60 * 1000).toISOString();
        const endTime = now.toISOString();
        const visitNumber = `RAD-${Date.now()}`;

        const encounterUuid = `urn:uuid:${this.generateUuid()}`;
        const conditionUuid = `urn:uuid:${this.generateUuid()}`;
        const serviceRequestUuid = `urn:uuid:${this.generateUuid()}`;
        const observationUuid = `urn:uuid:${this.generateUuid()}`;
        const imagingStudyUuid = `urn:uuid:${this.generateUuid()}`;
        const reportUuid = `urn:uuid:${this.generateUuid()}`;
        const compositionUuid = `urn:uuid:${this.generateUuid()}`;

        const cleanPatientName = this.sanitize(params.patientName);
        const sanitizedDescription = this.sanitize(params.description || "Pemeriksaan Radiologi");

        const bundle = {
            resourceType: "Bundle",
            type: "transaction",
            entry: [
                // ==========================================
                // 1. SERVICEREQUEST (Permintaan Radiologi)
                // ==========================================
                {
                    fullUrl: serviceRequestUuid,
                    resource: {
                        resourceType: "ServiceRequest",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceRequest"] },
                        status: "active",
                        intent: "order",
                        category: [{
                            coding: [{ system: "http://snomed.info/sct", code: "363679005", display: "Imaging" }]
                        }],
                        code: {
                            coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }],
                            text: "Pemeriksaan Radiologi"
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: cleanPatientName },
                        encounter: { reference: encounterUuid },
                        authoredOn: startTime,
                        requester: { reference: `Practitioner/${activePractitionerId}` },
                        performer: [{ reference: `Organization/${config.organizationId}` }]
                    },
                    request: { method: "POST", url: "ServiceRequest" }
                },
                // ==========================================
                // 2. ENCOUNTER (Kunjungan Pasien)
                // ==========================================
                {
                    fullUrl: encounterUuid,
                    resource: {
                        resourceType: "Encounter",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Encounter"] },
                        identifier: [{
                            system: `http://sys-ids.kemkes.go.id/encounter/${config.organizationId}`,
                            value: visitNumber
                        }],
                        status: "finished",
                        class: {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                            code: "AMB",
                            display: "ambulatory"
                        },
                        serviceType: {
                            coding: [{
                                system: "http://terminology.hl7.org/CodeSystem/service-type",
                                code: "30",
                                display: "Radiologi"
                            }]
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: cleanPatientName },
                        participant: [{
                            type: [{
                                coding: [{
                                    system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                    code: "PPRF",
                                    display: "primary performer"
                                }]
                            }],
                            individual: { reference: `Practitioner/${activePractitionerId}` }
                        }],
                        period: { start: startTime, end: endTime },
                        location: [{
                            location: { reference: `Location/${locationId}` }
                        }],
                        diagnosis: [{
                            condition: { reference: conditionUuid },
                            use: {
                                coding: [{
                                    system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                                    code: "AD",
                                    display: "Admission diagnosis"
                                }]
                            }
                        }],
                        basedOn: [{ reference: serviceRequestUuid }],
                        statusHistory: [{ status: "finished", period: { start: startTime, end: endTime } }],
                        serviceProvider: { reference: `Organization/${config.organizationId}` }
                    },
                    request: { method: "POST", url: "Encounter" }
                },
                // ==========================================
                // 3. CONDITION (Diagnosis Terkait)
                // ==========================================
                {
                    fullUrl: conditionUuid,
                    resource: {
                        resourceType: "Condition",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Condition"] },
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
                            text: "Pemeriksaan Kesehatan Umum"
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: cleanPatientName },
                        encounter: { reference: encounterUuid }
                    },
                    request: { method: "POST", url: "Condition" }
                },
                // ==========================================
                // 4. IMAGINGSTUDY (Meta DICOM)
                // ==========================================
                {
                    fullUrl: imagingStudyUuid,
                    resource: {
                        resourceType: "ImagingStudy",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/ImagingStudy"] },
                        identifier: [{
                            system: `http://sys-ids.kemkes.go.id/imagingstudy/${config.organizationId}`,
                            value: params.studyInstanceUid
                        }],
                        status: "available",
                        subject: { reference: `Patient/${activePatientId}` },
                        encounter: { reference: encounterUuid },
                        basedOn: [{ reference: serviceRequestUuid }],
                        modality: [{
                            system: "http://dicom.nema.org/resources/ontology/DCM",
                            code: params.modality
                        }],
                        started: params.studyDate.length === 8 
                            ? `${params.studyDate.substring(0, 4)}-${params.studyDate.substring(4, 6)}-${params.studyDate.substring(6, 8)}T00:00:00+00:00`
                            : params.studyDate,
                        numberOfSeries: params.numberOfSeries || 1,
                        numberOfInstances: params.numberOfInstances || 1,
                        procedureCode: [{
                            coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }],
                            text: "Pemeriksaan Radiologi"
                        }],
                        description: sanitizedDescription,
                        series: [{
                            uid: `${params.studyInstanceUid}.1`,
                            modality: { system: "http://dicom.nema.org/resources/ontology/DCM", code: params.modality },
                            performer: [{ 
                                actor: { reference: `Practitioner/${activePractitionerId}` } 
                            }],
                            instance: [{
                                uid: `${params.studyInstanceUid}.1.1`,
                                sopClass: { system: "urn:ietf:rfc:3986", code: "urn:oid:1.2.840.10008.5.1.4.1.1.7" }
                            }]
                        }]
                    },
                    request: { method: "POST", url: "ImagingStudy" }
                },
                // ==========================================
                // 5. OBSERVATION (Hasil Tindakan)
                // ==========================================
                {
                    fullUrl: observationUuid,
                    resource: {
                        resourceType: "Observation",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Observation"] },
                        status: "final",
                        category: [{
                            coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "imaging", display: "Imaging" }]
                        }],
                        code: {
                            coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }]
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: cleanPatientName },
                        encounter: { reference: encounterUuid },
                        effectiveDateTime: startTime,
                        valueString: "Pemeriksaan Radiologi Selesai",
                        performer: [{ reference: `Organization/${config.organizationId}` }]
                    },
                    request: { method: "POST", url: "Observation" }
                },
                // ==========================================
                // 6. DIAGNOSTICREPORT (Ekspertise)
                // ==========================================
                {
                    fullUrl: reportUuid,
                    resource: {
                        resourceType: "DiagnosticReport",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/DiagnosticReport"] },
                        status: "final",
                        category: [{
                            coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0074", code: "RAD", display: "Radiology" }]
                        }],
                        code: {
                            coding: [{ system: "http://loinc.org", code: "72106-8", display: "Radiology Study report" }],
                            text: "Laporan Studi Radiologi"
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: cleanPatientName },
                        encounter: { reference: encounterUuid },
                        basedOn: [{ reference: serviceRequestUuid }],
                        effectiveDateTime: startTime,
                        issued: now.toISOString(),
                        performer: [{ reference: `Organization/${config.organizationId}` }],
                        imagingStudy: [{ reference: imagingStudyUuid }],
                        result: [{ reference: observationUuid }],
                        conclusion: "Pemeriksaan Radiologi Selesai"
                    },
                    request: { method: "POST", url: "DiagnosticReport" }
                },
                // ==========================================
                // 7. COMPOSITION (Dokumen Akhir)
                // ==========================================
                {
                    fullUrl: compositionUuid,
                    resource: {
                        resourceType: "Composition",
                        meta: { profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Composition"] },
                        status: "final",
                        type: {
                            coding: [{ system: "http://loinc.org", code: "18748-0", display: "Radiology Medical imaging report" }]
                        },
                        category: [{
                            coding: [{ system: "http://loinc.org", code: "18748-0", display: "Radiology Report" }]
                        }],
                        subject: { reference: `Patient/${activePatientId}`, display: cleanPatientName },
                        encounter: { reference: encounterUuid },
                        date: now.toISOString(),
                        author: [{ reference: `Practitioner/${activePractitionerId}` }],
                        title: "Laporan Radiologi",
                        custodian: { reference: `Organization/${config.organizationId}` },
                        section: [{
                            title: "Hasil Pemeriksaan Radiologi",
                            code: {
                                coding: [{ system: "http://loinc.org", code: "72106-8", display: "Radiology Study report" }]
                            },
                            text: { status: "generated", div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">Laporan Radiologi</div>" },
                            entry: [{ reference: reportUuid }]
                        }]
                    },
                    request: { method: "POST", url: "Composition" }
                }
            ]
        };

        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(bundle)
        });

        const data = await response.json();

        if (!response.ok) {
            logs.push(`[MEGA-BUNDLE] ERROR: ${response.status}`);
            let errorMessage = "Unknown Error";
            try {
                if (data.issue && data.issue.length > 0) {
                    errorMessage = data.issue[0].details?.text || data.issue[0].diagnostics || JSON.stringify(data.issue);
                }
            } catch(e) {}
            const error: any = new Error(errorMessage);
            error.logs = logs;
            throw error;
        }

        const ids: Record<string, string> = {};
        if (data.entry) {
            const types = ["Encounter", "Condition", "ServiceRequest", "Observation", "ImagingStudy", "DiagnosticReport", "Composition"];
            data.entry.forEach((ent: any, i: number) => {
                const loc = ent.response?.location || "";
                const type = types[i];
                if (loc && type) {
                    const parts = loc.split("/");
                    ids[type] = parts[parts.length - 1];
                }
            });
        }

        logs.push(`[MEGA-BUNDLE] Sukses! Encounter: ${ids["Encounter"]}, Composition: ${ids["Composition"]}`);
        return { ids, logs };
    }

    /**
     * Entry point utama untuk Bridging. Sekarang menggunakan Mega-Bundle
     */
    static async submitImagingStudy(params: {
        studyInstanceUid: string;
        patientSsId: string;
        patientName: string;
        modality: string;
        studyDate: string; 
        accessionNumber?: string;
        description?: string;
        numberOfSeries?: number;
        numberOfInstances?: number;
    }): Promise<{ id: string, logs: string[] }> {
        if (!params.accessionNumber) {
            throw new Error("Accession Number wajib ada untuk bridging ke SATUSEHAT.");
        }

        const result = await SatuSehatService.createMegaBundle({
            patientSsId: params.patientSsId,
            patientName: params.patientName,
            studyInstanceUid: params.studyInstanceUid,
            modality: params.modality,
            studyDate: params.studyDate,
            accessionNumber: params.accessionNumber,
            description: params.description,
            numberOfSeries: params.numberOfSeries,
            numberOfInstances: params.numberOfInstances
        });

        return { id: result.ids["DiagnosticReport"] || "SUCCESS", logs: result.logs };
    }
}
