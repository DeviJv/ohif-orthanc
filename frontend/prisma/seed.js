const { PrismaClient } = require('../app/generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding administrative user...');
  const adminEmail = 'admin@pacs.com';
  // Standard default password
  const hashedPassword = bcrypt.hashSync('adminpassword', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword }, // FORCED: Update password on every seed run to ensure sync
    create: {
      email: adminEmail,
      name: 'Administrator',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user ready:', admin.email);

  console.log('🌱 Seeding SatuSehat settings with full granular defaults...');

  const STG_BASE = 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1';
  const PRD_BASE = 'https://api-satusehat.kemkes.go.id/fhir-r4/v1';

  // We use an empty update to avoid overwriting user changes on every restart
  const setting = await prisma.satuSehatSetting.upsert({
    where: { id: 1 },
    update: {}, 
    create: {
      id: 1,
      environment: 'staging',
      
      // Default Staging Config
      stgOrganizationId: process.env.SATUSEHAT_ORG_ID || 'bf3d3d7d-620a-406a-b790-80d501a1f821',
      stgClientId: process.env.SATUSEHAT_CLIENT_ID || '',
      stgClientSecret: process.env.SATUSEHAT_CLIENT_SECRET || '',
      stgAuthUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      stgBaseUrl: STG_BASE,

      // Default Production Config
      prdOrganizationId: '',
      prdClientId: '',
      prdClientSecret: '',
      prdAuthUrl: 'https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      prdBaseUrl: PRD_BASE,

      // Initial Active Config (Legacy fields)
      organizationId: process.env.SATUSEHAT_ORG_ID || 'bf3d3d7d-620a-406a-b790-80d501a1f821',
      clientId: process.env.SATUSEHAT_CLIENT_ID || '',
      clientSecret: process.env.SATUSEHAT_CLIENT_SECRET || '',
      authUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      baseUrl: STG_BASE,
      
      // Full granular defaults
      encounterUrl: `${STG_BASE}/Encounter`,
      conditionUrl: `${STG_BASE}/Condition`,
      serviceRequestUrl: `${STG_BASE}/ServiceRequest`,
      imagingStudyUrl: `${STG_BASE}/ImagingStudy`,
      observationUrl: `${STG_BASE}/Observation`,
      diagnosticReportUrl: `${STG_BASE}/DiagnosticReport`,
      compositionUrl: `${STG_BASE}/Composition`,
      patientUrl: `${STG_BASE}/Patient`,
      locationUrl: `${STG_BASE}/Location`,
      practitionerUrl: `${STG_BASE}/Practitioner`,
      
      defaultPatientId: 'P02478375538',
      defaultPractitionerId: '10009880728',
      patientIdSource: 'PatientID',
      isActive: true,
    },
  });

  console.log('✅ SatuSehat settings seeded with granular URLs:', setting);

  const appConfigs = [
    { key: 'SATUSEHAT_ENABLED', value: 'true' },
  ];

  for (const config of appConfigs) {
    await prisma.appConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }

  console.log('✅ AppConfig seeded.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
