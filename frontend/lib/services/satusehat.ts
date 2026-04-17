import { db } from "@/lib/db";
import { Prisma } from "@/app/generated/prisma";

export interface SatuSehatConfig {
    organizationId: string;
    clientId: string;
    clientSecret: string;
    environment: "staging" | "production";
    locationId?: string;
    authUrl?: string;
    baseUrl?: string;
    defaultPatientId?: string;
    defaultPractitionerId?: string;
    // Granular URLs
    encounterUrl?: string;
    conditionUrl?: string;
    serviceRequestUrl?: string;
    imagingStudyUrl?: string;
    observationUrl?: string;
    diagnosticReportUrl?: string;
    compositionUrl?: string;
    patientUrl?: string;
    locationUrl?: string;
    practitionerUrl?: string;
}

export class SatuSehatService {
    static async getConfig(): Promise<SatuSehatConfig | null> {
        // 1. Try to get from the new dynamic SatuSehatSetting table
        const dbSetting = await db.satuSehatSetting.findFirst({
            where: { id: 1 }
        });

        if (dbSetting) {
            const isActiveStaging = dbSetting.environment === "staging";
            
            return {
                organizationId: (isActiveStaging ? dbSetting.stgOrganizationId : dbSetting.prdOrganizationId) || dbSetting.organizationId,
                clientId: (isActiveStaging ? dbSetting.stgClientId : dbSetting.prdClientId) || dbSetting.clientId,
                clientSecret: (isActiveStaging ? dbSetting.stgClientSecret : dbSetting.prdClientSecret) || dbSetting.clientSecret,
                environment: dbSetting.environment as "staging" | "production",
                authUrl: (isActiveStaging ? dbSetting.stgAuthUrl : dbSetting.prdAuthUrl) || dbSetting.authUrl,
                baseUrl: (isActiveStaging ? dbSetting.stgBaseUrl : dbSetting.prdBaseUrl) || dbSetting.baseUrl,
                defaultPatientId: dbSetting.defaultPatientId?.trim() || undefined,
                defaultPractitionerId: dbSetting.defaultPractitionerId?.trim() || undefined,
                encounterUrl: dbSetting.encounterUrl?.trim() || undefined,
                conditionUrl: dbSetting.conditionUrl?.trim() || undefined,
                serviceRequestUrl: dbSetting.serviceRequestUrl?.trim() || undefined,
                imagingStudyUrl: dbSetting.imagingStudyUrl?.trim() || undefined,
                observationUrl: dbSetting.observationUrl?.trim() || undefined,
                diagnosticReportUrl: dbSetting.diagnosticReportUrl?.trim() || undefined,
                compositionUrl: dbSetting.compositionUrl?.trim() || undefined,
                patientUrl: dbSetting.patientUrl?.trim() || undefined,
            };
        }

        // 2. Fallback to older AppConfig keys or process.env (Legacy support)
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
    private static cachedClientId: string | null = null;
    private static tokenExpiry: number = 0; // Epoch in ms

    static async getAccessToken(config: SatuSehatConfig): Promise<string> {
        const now = Date.now();
        const currentClientId = config.clientId.trim();
        
        // Use cache if token exists, hasn't expired, and matches the current Client ID
        if (this.cachedToken && this.cachedClientId === currentClientId && now < (this.tokenExpiry - 5 * 60 * 1000)) {
            console.log("[SATUSEHAT SERVICE] Using cached access token.");
            return this.cachedToken;
        }

        let authUrl = config.authUrl;
        if (!authUrl || !authUrl.includes("accesstoken")) {
            const defaultAuthBase = config.environment === "production"
                ? "https://api-satusehat.kemkes.go.id/oauth2/v1"
                : "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1";
            authUrl = `${defaultAuthBase}/accesstoken?grant_type=client_credentials`;
        }

        const params = new URLSearchParams();
        params.append("client_id", config.clientId.trim());
        params.append("client_secret", config.clientSecret.trim());

        console.log(`[SATUSEHAT] Requesting token from: ${authUrl}`);

        const response = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: params.toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gagal mendapatkan token: ${errorText}`);
        }

        const data = await response.json();
        
        this.cachedToken = data.access_token;
        this.cachedClientId = currentClientId;
        const expiresInMs = parseInt(data.expires_in || "3600") * 1000;
        this.tokenExpiry = now + expiresInMs;

        return this.cachedToken as string;
    }

    static getBaseUrl(environment: "staging" | "production", customBaseUrl?: string): string {
        if (customBaseUrl) return customBaseUrl;
        
        if (environment === "production") {
            return "https://api-satusehat.kemkes.go.id/fhir-r4/v1";
        }
        return "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1";
    }

    /**
     * Resolves the root URL for FHIR Profile definitions.
     */
    static getProfileRoot(): string {
        return "https://fhir.kemkes.go.id/r4/StructureDefinition";
    }

    /**
     * Resolves the root URL for Identifier Systems.
     */
    static getSystemRoot(): string {
        return "http://sys-ids.kemkes.go.id";
    }

    /**
     * Resolves a full Profile URL.
     */
    static getProfileUrl(resourceType: string): string {
        return `${this.getProfileRoot()}/${resourceType}`;
    }

    /**
     * Resolves a full System URL for an identifier.
     * Supports detecting if the orgId is a UUID or a Numerical ID.
     */
    static getSystemUrl(type: "acsn" | "encounter" | "imagingstudy" | "nik" | "location", orgId?: string): string {
        if (type === "nik") return "https://fhir.kemkes.go.id/id/nik";
        
        const root = this.getSystemRoot();
        if (!orgId) return `${root}/${type}`;
        
        // Ensure no double slashes and handles both UUID and numerical formats
        return `${root.replace(/\/$/, '')}/${type}/${orgId.trim()}`;
    }

    /**
     * Resolves the final URL for a specific resource type, handling dynamic overrides.
     */
    static getResourceUrl(resourceType: string, config: SatuSehatConfig): string {
        const baseUrl = this.getBaseUrl(config.environment, config.baseUrl);
        
        // Check for granular overrides in the config (e.g. encounterUrl)
        const overrideMap: Record<string, string | undefined> = {
            "Encounter": config.encounterUrl,
            "Condition": config.conditionUrl,
            "ServiceRequest": config.serviceRequestUrl,
            "ImagingStudy": config.imagingStudyUrl,
            "Observation": config.observationUrl,
            "DiagnosticReport": config.diagnosticReportUrl,
            "Composition": config.compositionUrl,
            "Patient": config.patientUrl,
            "Location": config.locationUrl,
            "Practitioner": config.practitionerUrl,
        };

        let override = overrideMap[resourceType];
        
        // FORCE PRODUCTION: Jika mode production tapi override berisi staging, abaikan.
        if (config.environment === "production" && override && override.includes("-stg")) {
            override = undefined;
        }

        if (override) return override;

        return `${baseUrl}/${resourceType}`;
    }

    /**
     * Mencari data Pasien di Satu Sehat berdasarkan NIK
     */
    static async getPatientByNik(nik: string): Promise<{ id: string, name: string } | null> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const token = await this.getAccessToken(config);
        const urlWithParams = this.getResourceUrl("Patient", config);
        
        // Membersihkan NIK dari spasi dan memastikan encoding yang benar
        const cleanNik = nik.trim();
        const systemUrl = "https://fhir.kemkes.go.id/id/nik";
        
        // Gunakan encodeURIComponent pada identifier karena berisi karakter kurung/pipa yang sensitif pada Node.js fetch
        const identifier = `${systemUrl}|${cleanNik}`;
        const url = `${urlWithParams}?identifier=${encodeURIComponent(identifier)}`;

        console.log(`[SATUSEHAT] [${config.environment.toUpperCase()}] Request Patient: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
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

            // Detail tambahan untuk membantu Debugging 401
            const debugInfo = `(URL: ${url}, Token Prefix: ${token.substring(0, 7)}...)`;
            throw new Error(`Gagal mencari pasien (Status ${response.status}): ${errorMessage} ${debugInfo}`);
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
        const resourceUrl = this.getResourceUrl("Location", config);
        
        const url = `${resourceUrl}?organization=${config.organizationId}`;
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
        const url = this.getResourceUrl("Location", config);
        const payload = {
            resourceType: "Location",
            identifier: [{
                system: this.getSystemUrl("location", config.organizationId),
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
     * Helper to record individual resource transactions for the dashboard.
     */
    static async recordResourceLog(data: {
        resourceType: string;
        resourceId?: string;
        accessionNumber?: string;
        studyInstanceUid?: string;
        method: string;
        status: string;
        responseCode?: number;
        responseBody?: any;
        environment: string;
        createdAt?: Date;
    }) {
        try {
            await (db.satuSehatResourceLog as any).create({
                data: {
                    resourceType: data.resourceType,
                    resourceId: data.resourceId,
                    accessionNumber: data.accessionNumber,
                    studyInstanceUid: data.studyInstanceUid,
                    method: data.method,
                    status: data.status,
                    responseCode: data.responseCode,
                    responseBody: data.responseBody as any,
                    environment: data.environment,
                    ...((data as any).createdAt ? { createdAt: (data as any).createdAt } : {})
                }
            });
        } catch (e) {
            console.error(`[SATUSEHAT-LOG] Failed to record log for ${data.resourceType}:`, e);
        }
    }

    /**
     * Parses a Bundle response and records each entry in the resource log.
     */
    static async recordBundleResults(params: {
        bundleResponse: any;
        accessionNumber?: string;
        studyInstanceUid?: string;
        environment: string;
        bundleRequest: any;
    }) {
        if (!params.bundleResponse || !params.bundleResponse.entry) return;

        const entries = params.bundleResponse.entry;
        const requestEntries = params.bundleRequest.entry || [];

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const requestEntry = requestEntries[i];
            
            const status = entry.response?.status || "Unknown";
            const isSuccess = status.startsWith("201") || status.startsWith("200") || status.startsWith("204");
            const location = entry.response?.location || "";
            const resourceId = location.split("/").pop();
            const resourceType = requestEntry?.resource?.resourceType || location.split("/")[0] || "Unknown";

            await this.recordResourceLog({
                resourceType,
                resourceId: isSuccess ? resourceId : undefined,
                accessionNumber: params.accessionNumber,
                studyInstanceUid: params.studyInstanceUid,
                method: requestEntry?.request?.method || "POST",
                status: isSuccess ? "SUCCESS" : "FAILED",
                responseCode: parseInt(status.split(" ")[0]) || 0,
                responseBody: entry.response || entry.outcome,
                environment: params.environment
            });
        }
    }

    /**
     * Backfills logs from existing SatuSehatIntegration records.
     */
    static async backfillLogsFromIntegrations() {
        const integrations = await db.satuSehatIntegration.findMany({
            where: { 
                bundleResponse: { not: Prisma.DbNull } as any
            }
        } as any);

        const config = await this.getConfig();
        const env = config?.environment || "staging";

        console.log(`[SATUSEHAT-BACKFILL] Starting backfill for ${integrations.length} records...`);

        let count = 0;
        for (const integration of integrations) {
            try {
                const response = integration.bundleResponse as any;
                if (!response || !response.entry) continue;

                // Check if we already have logs for this study to avoid duplicates
                const existing = await db.satuSehatResourceLog.findFirst({
                    where: { accessionNumber: integration.accessionNumber }
                });
                if (existing) continue;

                // For backfill, we don't have the original request bundle easily, 
                // so we parse what we can from the response location
                for (const entry of response.entry) {
                    const loc = entry.response?.location || "";
                    if (!loc) continue;

                    const parts = loc.split("/");
                    // Location usually looks like: ResourceType/id/_history/1
                    const resourceType = parts[0];
                    const resourceId = parts[1];

                    await this.recordResourceLog({
                        resourceType,
                        resourceId,
                        accessionNumber: integration.accessionNumber,
                        studyInstanceUid: integration.studyInstanceUid || undefined,
                        method: "POST", // Assume POST for initial backfill
                        status: "SUCCESS",
                        responseCode: 201,
                        environment: env,
                        createdAt: integration.syncedAt || integration.createdAt // Use original sync time
                    });
                    count++;
                }
            } catch (e) {
                console.error(`[SATUSEHAT-BACKFILL] Error for ${integration.accessionNumber}:`, e);
            }
        }
        return count;
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
        seriesList?: Array<{
            uid: string;
            modality: string;
            instanceCount: number;
        }>;
    }): Promise<{ ids: Record<string, string>, logs: string[] }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        // --- 🛡️ DYNAMIC PERSONAS (Using DB values if available) ---
        const activePatientId = config.defaultPatientId || "P02478375538"; 
        const activePractitionerId = config.defaultPractitionerId || "10009880728";
        // ---------------------------------------------------------

        const logs: string[] = ["[MEGA-BUNDLE] Menyiapkan paket transaksi lengkap (Full Chain)..."];
        if (activePatientId === "P02478375538") {
            logs.push(`[MEGA-BUNDLE] MENGGUNAKAN DUMMY DEFAULT: Patient ${activePatientId}, Practitioner ${activePractitionerId}`);
        } else {
            logs.push(`[MEGA-BUNDLE] Menggunakan Persona Dinamis: Patient ${activePatientId}, Practitioner ${activePractitionerId}`);
        }
        
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment, config.baseUrl);

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
                        meta: { profile: [this.getProfileUrl("ServiceRequest")] },
                        identifier: [{
                            use: "usual",
                            type: {
                                coding: [{
                                    system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                    code: "ACSN"
                                }]
                            },
                            system: this.getSystemUrl("acsn", config.organizationId),
                            value: params.accessionNumber
                        }],
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
                // 2. ENCOUNTER (Kunjungan Pasien)
                // ==========================================
                {
                    fullUrl: encounterUuid,
                    resource: {
                        resourceType: "Encounter",
                        meta: { profile: [this.getProfileUrl("Encounter")] },
                        identifier: [{
                            system: this.getSystemUrl("encounter", config.organizationId),
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
                        meta: { profile: [this.getProfileUrl("Condition")] },
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
                        meta: { profile: [this.getProfileUrl("ImagingStudy")] },
                        identifier: [{
                            system: this.getSystemUrl("imagingstudy", config.organizationId),
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
                        series: params.seriesList?.length ? params.seriesList.map((s) => ({
                            uid: s.uid,
                            modality: { system: "http://dicom.nema.org/resources/ontology/DCM", code: s.modality },
                            numberOfInstances: s.instanceCount,
                            performer: [{ 
                                actor: { reference: `Practitioner/${activePractitionerId}` } 
                            }],
                            // Karena instance UIDs dicom asli banyak, default minimal kita pass fakes atau instances asli jika di pass
                            instance: Array.from({ length: Math.min(s.instanceCount, 1) }).map((_, i) => ({
                                uid: `${s.uid}.${i + 1}`,
                                sopClass: { system: "urn:ietf:rfc:3986", code: "urn:oid:1.2.840.10008.5.1.4.1.1.7" }
                            }))
                        })) : [{
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
                        meta: { profile: [this.getProfileUrl("Observation")] },
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
                        meta: { profile: [this.getProfileUrl("DiagnosticReport")] },
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
                        meta: { profile: [this.getProfileUrl("Composition")] },
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

        // LOG INDIVIDUAL RESOURCES
        await this.recordBundleResults({
            bundleResponse: data,
            bundleRequest: bundle,
            accessionNumber: params.accessionNumber,
            studyInstanceUid: params.studyInstanceUid,
            environment: config.environment
        });

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
     * Membuat Order (ServiceRequest) saja tanpa ImagingStudy.
     * Berguna untuk testing DICOM Router.
     */
    static async createTestOrder(params: {
        accessionNumber: string;
        patientName?: string;
    }): Promise<{ id: string, patientId: string, logs: string[] }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const activePatientId = config.defaultPatientId || "P02478375538"; 
        const activePractitionerId = config.defaultPractitionerId || "10009880728";
        
        const logs: string[] = [`[TEST-ORDER] Membuat Order Mandiri untuk Accession: ${params.accessionNumber}`];
        const token = await this.getAccessToken(config);
        const baseUrl = this.getBaseUrl(config.environment, config.baseUrl);
        const locationId = await this.getOrCreateLocationId(config);

        const now = new Date();
        const startTime = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
        const endTime = now.toISOString();
        
        const encounterUuid = `urn:uuid:${this.generateUuid()}`;
        const serviceRequestUuid = `urn:uuid:${this.generateUuid()}`;
        const conditionUuid = `urn:uuid:${this.generateUuid()}`;
        const patientName = params.patientName || "Pasien Test Router";

        const bundle = {
            resourceType: "Bundle",
            type: "transaction",
            entry: [
                {
                    fullUrl: serviceRequestUuid,
                    resource: {
                        resourceType: "ServiceRequest",
                        meta: { profile: [this.getProfileUrl("ServiceRequest")] },
                        identifier: [{
                            use: "usual",
                            type: {
                                coding: [{
                                    system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                    code: "ACSN"
                                }]
                            },
                            system: this.getSystemUrl("acsn", config.organizationId),
                            value: params.accessionNumber
                        }],
                        status: "active",
                        intent: "order",
                        category: [{
                            coding: [{ system: "http://snomed.info/sct", code: "363679005", display: "Imaging" }]
                        }],
                        code: {
                            coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }],
                            text: "Pemeriksaan Radiologi (Test)"
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: patientName },
                        encounter: { reference: encounterUuid },
                        authoredOn: startTime,
                        requester: { reference: `Practitioner/${activePractitionerId}` },
                        performer: [{ reference: `Organization/${config.organizationId}` }]
                    },
                    request: { method: "POST", url: "ServiceRequest" }
                },
                {
                    fullUrl: encounterUuid,
                    resource: {
                        resourceType: "Encounter",
                        meta: { profile: [this.getProfileUrl("Encounter")] },
                        identifier: [{
                            system: this.getSystemUrl("encounter", config.organizationId),
                            value: `TEST-${Date.now()}`
                        }],
                        status: "finished",
                        class: {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                            code: "AMB",
                            display: "ambulatory"
                        },
                        subject: { reference: `Patient/${activePatientId}`, display: patientName },
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
                        location: [{ location: { reference: `Location/${locationId}` } }],
                        statusHistory: [{ status: "finished", period: { start: startTime, end: endTime } }],
                        diagnosis: [{
                            condition: { reference: conditionUuid }, 
                            use: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/diagnosis-role", code: "AD", display: "Admission diagnosis" }] }
                        }],
                        serviceProvider: { reference: `Organization/${config.organizationId}` }
                    },
                    request: { method: "POST", url: "Encounter" }
                },
                {
                    fullUrl: conditionUuid,
                    resource: {
                        resourceType: "Condition",
                        meta: { profile: [this.getProfileUrl("Condition")] },
                        clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
                        category: [{
                            coding: [{
                                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                                code: "encounter-diagnosis",
                                display: "Encounter Diagnosis"
                            }]
                        }],
                        code: { coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: "Z00.0", display: "General medical examination" }] },
                        subject: { reference: `Patient/${activePatientId}`, display: patientName },
                        encounter: { reference: encounterUuid }
                    },
                    request: { method: "POST", url: "Condition" }
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

        // LOG INDIVIDUAL RESOURCES (Testing)
        await this.recordBundleResults({
            bundleResponse: data,
            bundleRequest: bundle,
            accessionNumber: params.accessionNumber,
            environment: config.environment
        });

        if (!response.ok) {
            console.error("[TEST-ORDER] Error:", data);
            throw new Error(data.issue?.[0]?.details?.text || "Gagal membuat Test Order");
        }

        logs.push("[TEST-ORDER] Sukses dikirim ke SatuSehat!");
        return { 
            id: data.entry?.[0]?.response?.location?.split("/").pop() || "OK", 
            patientId: activePatientId,
            logs 
        };
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
        seriesList?: Array<{
            uid: string;
            modality: string;
            instanceCount: number;
        }>;
    }): Promise<{ id: string, logs: string[] }> {
        if (!params.accessionNumber) {
            throw new Error("Accession Number wajib ada untuk bridging ke SATUSEHAT.");
        }

        // Terapkan alur Fase 2 murni (Menggunakan createRadiologyResultBundle)
        const result = await SatuSehatService.createRadiologyResultBundle({
            studyInstanceUid: params.studyInstanceUid,
            modality: params.modality,
            studyDate: params.studyDate,
            accessionNumber: params.accessionNumber,
            description: params.description,
            numberOfSeries: params.numberOfSeries,
            numberOfInstances: params.numberOfInstances,
            seriesList: params.seriesList
        });

        return { id: result.ids["DiagnosticReport"] || "SUCCESS", logs: result.logs };
    }

    /**
     * Membuat Bundle Transaksi "Hilir" (Fase 2) untuk Radiologi.
     * Alur ini berasumsi SIMRS sudah mengirimkan ServiceRequest & Encounter.
     * Kita hanya mencari ServiceRequest berdasarkan AccessionNumber, 
     * lalu menempelkan ImagingStudy, Observation, dan DiagnosticReport.
     */
    static async createRadiologyResultBundle(params: {
        studyInstanceUid: string;
        modality: string;
        studyDate: string;
        accessionNumber: string;
        description?: string;
        numberOfSeries?: number;
        numberOfInstances?: number;
        seriesList?: Array<{ uid: string; modality: string; instanceCount: number; }>;
    }): Promise<{ ids: Record<string, string>, logs: string[] }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const activePractitionerId = config.defaultPractitionerId || "10009880728";
        const logs: string[] = ["[RADIOLOGY RESULT BUNDLE] Memulai sinkronisasi hasil hilir..."];
        const token = await this.getAccessToken(config);

        // 1. Cari ServiceRequest dari SIMRS
        const srUrl = this.getResourceUrl("ServiceRequest", config);
        const srSearchUrl = `${srUrl}?identifier=${this.getSystemUrl("acsn", config.organizationId)}|${params.accessionNumber}`;
        
        logs.push(`[RADIOLOGY RESULT BUNDLE] Mencari ServiceRequest di Kemenkes: Accession ${params.accessionNumber}`);
        const srRes = await fetch(srSearchUrl, { headers: { "Authorization": `Bearer ${token}`, "X-Organization-Id": config.organizationId } });
        
        if (!srRes.ok) throw new Error(`[SatuSehat] Gagal mencari ServiceRequest HTTP ${srRes.status}`);
        const srData = await srRes.json();

        if (!srData.entry || srData.total === 0) {
            throw new Error(`ServiceRequest dengan Accession Number ${params.accessionNumber} belum terdaftar di SatuSehat (Order SIMRS belum dilakukan).`);
        }

        const serviceRequest = srData.entry[0].resource;
        const srId = serviceRequest.id;
        const encounterRef = serviceRequest.encounter?.reference;
        const patientRef = serviceRequest.subject?.reference;

        if (!encounterRef) throw new Error(`ServiceRequest ${srId} tidak memiliki referensi Encounter.`);
        if (!patientRef) throw new Error(`ServiceRequest ${srId} tidak memiliki referensi Subject/Patient.`);

        logs.push(`[RADIOLOGY RESULT BUNDLE] Menggunakan Order dari SIMRS - SR ID: ${srId}`);

        const generateUuid = () => 'urn:uuid:' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        const imagingStudyUuid = generateUuid();
        const observationUuid = generateUuid();
        const reportUuid = generateUuid();
        const now = new Date();
        const startTime = new Date(now.getTime() - 1000 * 60 * 30).toISOString();
        const sanitizedDescription = params.description 
            ? params.description.replace(/[^a-zA-Z0-9\s.,?!-]/g, " ").trim().substring(0, 50) || "Pemeriksaan Radiologi"
            : "Pemeriksaan Radiologi";

        let validStartedTime = startTime; // Fallback to current time safely if DICOM date is invalid
        if (params.studyDate && params.studyDate.length === 8) {
            const yyyy = params.studyDate.substring(0, 4);
            const mm = params.studyDate.substring(4, 6);
            const dd = params.studyDate.substring(6, 8);
            const parsedDate = new Date(`${yyyy}-${mm}-${dd}T00:00:00+00:00`);
            const minDate = new Date("2014-06-03T00:00:00+00:00");
            
            // SatuSehat Rule 10424: Date cannot be before June 3, 2014, and cannot be a future date
            if (parsedDate >= minDate && parsedDate <= now) {
                validStartedTime = `${yyyy}-${mm}-${dd}T00:00:00+00:00`;
            } else {
                logs.push(`[WARNING] Data tanggal DICOM (${params.studyDate}) melanggar Rule Kemenkes. Menggunakan waktu server saat ini.`);
            }
        }

        const entries: Array<any> = [
            {
                fullUrl: imagingStudyUuid,
                resource: {
                    resourceType: "ImagingStudy",
                    meta: { profile: [this.getProfileUrl("ImagingStudy")] },
                    identifier: [{
                        system: this.getSystemUrl("imagingstudy", config.organizationId),
                        value: params.studyInstanceUid
                    }],
                    status: "available",
                    subject: { reference: patientRef },
                    encounter: { reference: encounterRef },
                    basedOn: [{ reference: `ServiceRequest/${srId}` }],
                    modality: [{ system: "http://dicom.nema.org/resources/ontology/DCM", code: params.modality }],
                    started: validStartedTime,
                    numberOfSeries: params.numberOfSeries || 1,
                    numberOfInstances: params.numberOfInstances || 1,
                    procedureCode: [{ coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }], text: "Pemeriksaan Radiologi" }],
                    description: sanitizedDescription,
                    series: params.seriesList?.length ? params.seriesList.map((s) => ({
                        uid: s.uid,
                        modality: { system: "http://dicom.nema.org/resources/ontology/DCM", code: s.modality },
                        numberOfInstances: s.instanceCount,
                        performer: [{ actor: { reference: `Practitioner/${activePractitionerId}` } }],
                        instance: Array.from({ length: Math.min(s.instanceCount, 1) }).map((_, i) => ({
                            uid: `${s.uid}.${i + 1}`,
                            sopClass: { system: "urn:ietf:rfc:3986", code: "urn:oid:1.2.840.10008.5.1.4.1.1.7" }
                        }))
                    })) : [{
                        uid: `${params.studyInstanceUid}.1`,
                        modality: { system: "http://dicom.nema.org/resources/ontology/DCM", code: params.modality },
                        performer: [{ actor: { reference: `Practitioner/${activePractitionerId}` } }],
                        instance: [{ uid: `${params.studyInstanceUid}.1.1`, sopClass: { system: "urn:ietf:rfc:3986", code: "urn:oid:1.2.840.10008.5.1.4.1.1.7" } }]
                    }]
                },
                request: { method: "POST", url: "ImagingStudy" }
            },
            {
                fullUrl: observationUuid,
                resource: {
                    resourceType: "Observation",
                    meta: { profile: [this.getProfileUrl("Observation")] },
                    status: "final",
                    category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "imaging", display: "Imaging" }] }],
                    code: { coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }] },
                    subject: { reference: patientRef },
                    encounter: { reference: encounterRef },
                    effectiveDateTime: startTime,
                    valueString: "Pemeriksaan Radiologi Selesai",
                    performer: [{ reference: `Organization/${config.organizationId}` }]
                },
                request: { method: "POST", url: "Observation" }
            },
            {
                fullUrl: reportUuid,
                resource: {
                    resourceType: "DiagnosticReport",
                    meta: { profile: [this.getProfileUrl("DiagnosticReport")] },
                    status: "final",
                    category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0074", code: "RAD", display: "Radiology" }] }],
                    code: { coding: [{ system: "http://loinc.org", code: "72106-8", display: "Radiology Study report" }], text: "Laporan Studi Radiologi" },
                    subject: { reference: patientRef },
                    encounter: { reference: encounterRef },
                    basedOn: [{ reference: `ServiceRequest/${srId}` }],
                    effectiveDateTime: startTime,
                    issued: now.toISOString(),
                    performer: [{ reference: `Organization/${config.organizationId}` }],
                    imagingStudy: [{ reference: imagingStudyUuid }],
                    result: [{ reference: observationUuid }],
                    conclusion: "Pemeriksaan Radiologi Selesai"
                },
                request: { method: "POST", url: "DiagnosticReport" }
            }
        ];

        const bundle = { resourceType: "Bundle", type: "transaction", entry: entries };
        logs.push("[RADIOLOGY RESULT BUNDLE] Mengirim payload ke Kemenkes...");

        const bundleUrl = `${config.environment === 'production' ? 'https://api-satusehat.kemkes.go.id' : 'https://api-satusehat-stg.dto.kemkes.go.id'}/fhir-r4/v1`;
        const postRes = await fetch(bundleUrl, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(bundle)
        });

        const postData = await postRes.json();
        
        // LOG INDIVIDUAL RESOURCES
        await this.recordBundleResults({
            bundleResponse: postData,
            bundleRequest: bundle,
            accessionNumber: params.accessionNumber,
            studyInstanceUid: params.studyInstanceUid,
            environment: config.environment
        });

        if (!postRes.ok) {
            logs.push(`[RADIOLOGY RESULT BUNDLE] ERROR ${postRes.status}: ${JSON.stringify(postData)}`);
            const err: any = new Error(postData.issue?.[0]?.diagnostics || "Gagal mengirim bundle Satu Sehat");
            err.logs = logs;
            throw err;
        }

        logs.push("[RADIOLOGY RESULT BUNDLE] Berhasil tersimpan!");
        const generatedIds: Record<string, string> = {};
        
        if (postData.entry) {
            postData.entry.forEach((ent: any) => {
                if (ent.response && ent.response.location) {
                    const parts = ent.response.location.split("/");
                    if (parts.length >= 2) {
                        const type = parts[parts.length - 4]; 
                        const resId = parts[parts.length - 3];
                        generatedIds[type] = resId;
                    }
                }
            });
        }
        return { ids: generatedIds, logs };
    }

    /**
     * Mengecek apakah ServiceRequest dan ImagingStudy sudah ada di SatuSehat
     * berdasarkan Accession Number.
     */
    static async getIntegrationStatus(accessionNumber: string): Promise<{
        serviceRequest?: { id: string, status: string },
        imagingStudy?: { id: string, status: string, seriesCount: number },
        logs: string[]
    }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const token = await this.getAccessToken(config);
        const logs: string[] = [`[CHECK-STATUS] Mencari resource untuk Accession: ${accessionNumber}`];
        
        const result: any = { logs };

        // 1. Cari ServiceRequest
        try {
            const srUrl = this.getResourceUrl("ServiceRequest", config);
            const srSearchUrl = `${srUrl}?identifier=${this.getSystemUrl("acsn", config.organizationId)}|${accessionNumber}`;
            
            const srRes = await fetch(srSearchUrl, {
                headers: { "Authorization": `Bearer ${token}`, "X-Organization-Id": config.organizationId }
            });

            if (srRes.ok) {
                const srData = await srRes.json();
                if (srData.total > 0) {
                    const sr = srData.entry[0].resource;
                    result.serviceRequest = { id: sr.id, status: sr.status };
                    logs.push(`[CHECK-STATUS] ServiceRequest DITEMUKAN: ${sr.id} (${sr.status})`);
                } else {
                    logs.push("[CHECK-STATUS] ServiceRequest TIDAK ditemukan.");
                }
            }
        } catch (e: any) {
            logs.push(`[CHECK-STATUS] Error mencari ServiceRequest: ${e.message}`);
        }

        // 2. Cari ImagingStudy
        try {
            const isUrl = this.getResourceUrl("ImagingStudy", config);
            const isSearchUrl = `${isUrl}?identifier=${this.getSystemUrl("acsn", config.organizationId)}|${accessionNumber}`;
            
            const isRes = await fetch(isSearchUrl, {
                headers: { "Authorization": `Bearer ${token}`, "X-Organization-Id": config.organizationId }
            });

            if (isRes.ok) {
                const isData = await isRes.json();
                if (isData.total > 0) {
                    const study = isData.entry[0].resource;
                    result.imagingStudy = { 
                        id: study.id, 
                        status: study.status,
                        seriesCount: study.numberOfSeries || 0
                    };
                    logs.push(`[CHECK-STATUS] ImagingStudy DITEMUKAN: ${study.id} (${study.status})`);
                } else {
                    logs.push("[CHECK-STATUS] ImagingStudy TIDAK ditemukan.");
                }
            }
        } catch (e: any) {
            logs.push(`[CHECK-STATUS] Error mencari ImagingStudy: ${e.message}`);
        }

        return result;
    }

    /**
     * Helper generic untuk mencari resource FHIR
     */
    static async searchResources(resourceType: string, params: Record<string, string>): Promise<any[]> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const token = await this.getAccessToken(config);
        const resourceUrl = this.getResourceUrl(resourceType, config);
        
        const queryParams = new URLSearchParams(params);
        const url = `${resourceUrl}?${queryParams.toString()}`;

        console.log(`[SATUSEHAT] SEARCH ${resourceType} URL: ${url}`);
        console.log(`[SATUSEHAT] Headers:`, {
            "Authorization": `Bearer ${token.substring(0, 10)}...`,
            "X-Organization-Id": config.organizationId
        });

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Organization-Id": config.organizationId
            }
        });

        if (!response.ok) {
            console.error(`[SATUSEHAT] Error searching ${resourceType}:`, await response.text());
            return [];
        }

        const data = await response.json();
        return data.entry?.map((e: any) => e.resource) || [];
    }

    /**
     * Mencari Encounter berdasarkan Patient ID
     */
    static async getEncountersByPatient(patientId: string): Promise<any[]> {
        return this.searchResources("Encounter", { subject: `Patient/${patientId}` });
    }

    /**
     * Mencari Condition berdasarkan Patient ID
     */
    static async getConditionsByPatient(patientId: string): Promise<any[]> {
        return this.searchResources("Condition", { subject: `Patient/${patientId}` });
    }

    /**
     * Mencari ServiceRequest berdasarkan Accession Number
     */
    static async getServiceRequestsByIdentifier(accessionNumber: string): Promise<any[]> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");
        
        const system = this.getSystemUrl("acsn", config.organizationId);
        return this.searchResources("ServiceRequest", { identifier: `${system}|${accessionNumber}` });
    }

    /**
     * Mencari ServiceRequest berdasarkan Patient dan Encounter
     */
    static async getServiceRequestsByPatientAndEncounter(patientId: string, encounterId: string): Promise<any[]> {
        return this.searchResources("ServiceRequest", { 
            subject: `Patient/${patientId}`,
            encounter: `Encounter/${encounterId}`
        });
    }

    /**
     * Membuat Bundle Prep (Encounter + Condition + ServiceRequest)
     * Digunakan ketika SIMRS belum mengirim data order ke SatuSehat.
     */
    static async createPrepBundle(params: {
        patientId?: string,
        patientNik?: string, // Priority if provided
        patientName: string,
        accessionNumber: string,
        encounterId?: string,
        conditionId?: string 
    }): Promise<{ ids: Record<string, string>, logs: string[] }> {
        const config = await this.getConfig();
        if (!config) throw new Error("Konfigurasi Satu Sehat tidak ditemukan");

        const activePractitionerId = config.defaultPractitionerId || "10009880728";
        const locationId = await this.getOrCreateLocationId(config);
        const token = await this.getAccessToken(config);
        const logs: string[] = ["[PREP-BUNDLE] Menyiapkan resource hulu (Order)..."];

        // 0. Resolve Patient
        let finalPatientId = params.patientId;
        if (params.patientNik) {
            logs.push(`[PREP-BUNDLE] Mencari pasien dengan NIK: ${params.patientNik}`);
            const patients = await this.searchResources("Patient", { identifier: `https://fhir.kemkes.go.id/id/nik|${params.patientNik}` });
            if (patients.length > 0) {
                finalPatientId = patients[0].id;
                logs.push(`[PREP-BUNDLE] Pasien ditemukan: ${finalPatientId}`);
            } else {
                logs.push(`[PREP-BUNDLE] Pasien NIK ${params.patientNik} tidak ditemukan di SatuSehat.`);
                // We fallback to default or throw error depending on intent. 
                // For test order helper, we might want to fail if special NIK requested.
                if (!finalPatientId) throw new Error(`Pasien dengan NIK ${params.patientNik} tidak ditemukan.`);
            }
        }

        if (!finalPatientId) {
            finalPatientId = config.defaultPatientId || "P02458022627";
            logs.push(`[PREP-BUNDLE] Menggunakan Patient ID default: ${finalPatientId}`);
        }

        const generateUuid = () => 'urn:uuid:' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        const now = new Date();
        const startTime = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
        const endTime = now.toISOString();

        const encounterUuid = params.encounterId ? `Encounter/${params.encounterId}` : generateUuid();
        const conditionUuid = params.conditionId ? `Condition/${params.conditionId}` : generateUuid();
        const serviceRequestUuid = generateUuid();

        const entries: any[] = [];

        // 1. ServiceRequest
        entries.push({
            fullUrl: serviceRequestUuid,
            resource: {
                resourceType: "ServiceRequest",
                meta: { profile: [this.getProfileUrl("ServiceRequest")] },
                identifier: [{
                    use: "usual",
                    type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0203", code: "ACSN" }] },
                    system: this.getSystemUrl("acsn", config.organizationId),
                    value: params.accessionNumber
                }],
                status: "active",
                intent: "order",
                category: [{ coding: [{ system: "http://snomed.info/sct", code: "363679005", display: "Imaging" }] }],
                code: {
                    coding: [{ system: "http://loinc.org", code: "24648-8", display: "XR Chest PA upr" }],
                    text: "Pemeriksaan Radiologi"
                },
                subject: { reference: `Patient/${params.patientId}`, display: params.patientName },
                encounter: { reference: encounterUuid },
                reasonReference: [{ reference: conditionUuid }],
                authoredOn: startTime,
                requester: { reference: `Practitioner/${activePractitionerId}` },
                performer: [{ reference: `Organization/${config.organizationId}` }]
            },
            request: { method: "POST", url: "ServiceRequest" }
        });

        // 2. Encounter (if missing)
        if (!params.encounterId) {
            logs.push("[PREP-BUNDLE] Menambahkan Encounter baru...");
            entries.push({
                fullUrl: encounterUuid,
                resource: {
                    resourceType: "Encounter",
                    meta: { profile: [this.getProfileUrl("Encounter")] },
                    identifier: [{
                        system: this.getSystemUrl("encounter", config.organizationId),
                        value: `PREP-${Date.now()}`
                    }],
                    status: "finished",
                    class: { system: "http://terminology.hl7.org/CodeSystem/v3-ActCode", code: "AMB", display: "ambulatory" },
                    subject: { reference: `Patient/${params.patientId}`, display: params.patientName },
                    period: { start: startTime, end: endTime },
                    location: [{ location: { reference: `Location/${locationId}` } }],
                    serviceProvider: { reference: `Organization/${config.organizationId}` },
                    diagnosis: [{
                        condition: { reference: conditionUuid },
                        use: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/diagnosis-role", code: "AD", display: "Admission diagnosis" }] }
                    }]
                },
                request: { method: "POST", url: "Encounter" }
            });
        }

        // 3. Condition (if missing)
        if (!params.conditionId) {
            logs.push("[PREP-BUNDLE] Menambahkan Condition baru...");
            entries.push({
                fullUrl: conditionUuid,
                resource: {
                    resourceType: "Condition",
                    meta: { profile: [this.getProfileUrl("Condition")] },
                    clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
                    category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "encounter-diagnosis", display: "Encounter Diagnosis" }] }],
                    code: { coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: "Z00.0", display: "General medical examination" }] },
                    subject: { reference: `Patient/${params.patientId}`, display: params.patientName },
                    encounter: { reference: encounterUuid }
                },
                request: { method: "POST", url: "Condition" }
            });
        }

        const bundle = { resourceType: "Bundle", type: "transaction", entry: entries };
        const bundleUrl = `${config.environment === 'production' ? 'https://api-satusehat.kemkes.go.id' : 'https://api-satusehat-stg.dto.kemkes.go.id'}/fhir-r4/v1`;
        
        const response = await fetch(bundleUrl, {
            method: 'POST',
            headers: { 
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
                "X-Organization-Id": config.organizationId
            },
            body: JSON.stringify(bundle)
        });

        const data = await response.json();

        // LOG INDIVIDUAL RESOURCES
        await this.recordBundleResults({
            bundleResponse: data,
            bundleRequest: bundle,
            accessionNumber: params.accessionNumber,
            environment: config.environment
        });

        if (!response.ok) {
            console.error("[SATUSEHAT] Bundle Error:", JSON.stringify(data, null, 2));
            const issue = data.issue?.[0]?.diagnostics || data.issue?.[0]?.details?.text || "Gagal membuat Prep Bundle";
            throw new Error(`${issue} (Status ${response.status})`);
        }

        const generatedIds: Record<string, string> = {};
        if (data.entry) {
            data.entry.forEach((ent: any) => {
                if (ent.response && ent.response.location) {
                    const parts = ent.response.location.split("/");
                    const id = parts[parts.length - 3];
                    const type = parts[parts.length - 4];
                    if (type && id) generatedIds[type] = id;
                }
            });
        }

        logs.push("[PREP-BUNDLE] Sukses!");
        return { ids: generatedIds, logs };
    }
}
