const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SatuSehat settings with full granular defaults...');

  const STG_BASE = 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1';

  const payload = {
    organizationId: process.env.SATUSEHAT_ORG_ID || 'bf3d3d7d-620a-406a-b790-80d501a1f821',
    clientId: process.env.SATUSEHAT_CLIENT_ID || '',
    clientSecret: process.env.SATUSEHAT_CLIENT_SECRET || '',
    environment: 'staging',
    authUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
    baseUrl: STG_BASE,
    
    // Full granular defaults from the start
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
    isActive: true,
  };

  const setting = await prisma.satuSehatSetting.upsert({
    where: { id: 1 },
    update: payload,
    create: {
      id: 1,
      ...payload,
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
