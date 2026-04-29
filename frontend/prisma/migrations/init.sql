-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AppConfig" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "AiResult" (
    "studyInstanceUid" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "findings" JSONB NOT NULL,
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "heatmapPath" TEXT,
    "heatmapBase64" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiResult_pkey" PRIMARY KEY ("studyInstanceUid")
);

-- CreateTable
CREATE TABLE "SatuSehatIntegration" (
    "accessionNumber" TEXT NOT NULL,
    "studyInstanceUid" TEXT,
    "satusehatId" TEXT,
    "patientNik" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "bundleResponse" JSONB,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SatuSehatIntegration_pkey" PRIMARY KEY ("accessionNumber")
);

-- CreateTable
CREATE TABLE "SatuSehatWebhookLog" (
    "id" TEXT NOT NULL,
    "studyInstanceUid" TEXT,
    "patientName" TEXT,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "errorDetail" JSONB,
    "rawPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SatuSehatWebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SatuSehatSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "environment" TEXT NOT NULL DEFAULT 'staging',
    "stgOrganizationId" TEXT NOT NULL DEFAULT '',
    "stgClientId" TEXT NOT NULL DEFAULT '',
    "stgClientSecret" TEXT NOT NULL DEFAULT '',
    "stgAuthUrl" TEXT NOT NULL DEFAULT '',
    "stgBaseUrl" TEXT NOT NULL DEFAULT '',
    "prdOrganizationId" TEXT NOT NULL DEFAULT '',
    "prdClientId" TEXT NOT NULL DEFAULT '',
    "prdClientSecret" TEXT NOT NULL DEFAULT '',
    "prdAuthUrl" TEXT NOT NULL DEFAULT '',
    "prdBaseUrl" TEXT NOT NULL DEFAULT '',
    "organizationId" TEXT NOT NULL DEFAULT '',
    "clientId" TEXT NOT NULL DEFAULT '',
    "clientSecret" TEXT NOT NULL DEFAULT '',
    "authUrl" TEXT NOT NULL DEFAULT '',
    "baseUrl" TEXT NOT NULL DEFAULT '',
    "encounterUrl" TEXT,
    "conditionUrl" TEXT,
    "serviceRequestUrl" TEXT,
    "imagingStudyUrl" TEXT,
    "observationUrl" TEXT,
    "diagnosticReportUrl" TEXT,
    "compositionUrl" TEXT,
    "patientUrl" TEXT,
    "locationUrl" TEXT,
    "practitionerUrl" TEXT,
    "defaultPatientId" TEXT DEFAULT '',
    "defaultPractitionerId" TEXT DEFAULT '',
    "patientIdSource" TEXT DEFAULT 'PatientID',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "autoSyncEnabled" BOOLEAN NOT NULL DEFAULT false,
    "autoSyncFrequency" TEXT NOT NULL DEFAULT 'DAILY',
    "autoSyncTime" TEXT NOT NULL DEFAULT '23:00',
    "lastAutoSyncAt" TIMESTAMP(3),
    "sendImageStudyFromWeb" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SatuSehatSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SatuSehatResourceLog" (
    "id" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "accessionNumber" TEXT,
    "studyInstanceUid" TEXT,
    "method" TEXT NOT NULL DEFAULT 'POST',
    "status" TEXT NOT NULL,
    "responseCode" INTEGER,
    "responseBody" JSONB,
    "environment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SatuSehatResourceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalityConnection" (
    "id" TEXT NOT NULL,
    "aeTitle" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModalityConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RadiologyReport" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "studyInstanceUid" TEXT NOT NULL,
    "studyDate" TEXT,
    "accessionNumber" TEXT,
    "patientName" TEXT,
    "patientSex" TEXT,
    "age" TEXT,
    "address" TEXT,
    "sender" TEXT,
    "diagnosis" TEXT,
    "soap" TEXT,
    "photoNum" TEXT,
    "examType" TEXT,
    "findings" TEXT,
    "measurementImages" JSONB,
    "selectedSeries" JSONB,
    "reportDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "doctorId" TEXT,
    "doctorName" TEXT,

    CONSTRAINT "RadiologyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SatuSehatBulkSyncTask" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'MANUAL',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalItems" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "currentStudyId" TEXT,
    "errors" JSONB,
    "studyIds" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "SatuSehatBulkSyncTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportExportTask" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalItems" INTEGER NOT NULL DEFAULT 0,
    "processedCount" INTEGER NOT NULL DEFAULT 0,
    "fileUrl" TEXT,
    "filters" JSONB,
    "reportIds" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ReportExportTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "RadiologyReport_patientId_studyDate_idx" ON "RadiologyReport"("patientId", "studyDate");

-- CreateIndex
CREATE INDEX "RadiologyReport_accessionNumber_idx" ON "RadiologyReport"("accessionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RadiologyReport_patientId_studyInstanceUid_key" ON "RadiologyReport"("patientId", "studyInstanceUid");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiologyReport" ADD CONSTRAINT "RadiologyReport_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

