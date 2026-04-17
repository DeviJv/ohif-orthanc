import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SatuSehat settings...');

  // Upsert the single settings row
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
      stgBaseUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1',

      // Default Production Config (Empty by default, user must fill)
      prdOrganizationId: '',
      prdClientId: '',
      prdClientSecret: '',
      prdAuthUrl: 'https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      prdBaseUrl: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1',

      // Initial Active Config (Legacy fields, will be synced by API)
      organizationId: process.env.SATUSEHAT_ORG_ID || 'bf3d3d7d-620a-406a-b790-80d501a1f821',
      clientId: process.env.SATUSEHAT_CLIENT_ID || '',
      clientSecret: process.env.SATUSEHAT_CLIENT_SECRET || '',
      authUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      baseUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1',
      
      isActive: true,
    },
  });

  console.log('✅ SatuSehat settings seeded:', setting);

  // Also seed some AppConfig if needed
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
