import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SatuSehat settings...');

  // Upsert the single settings row
  const setting = await prisma.satuSehatSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      organizationId: process.env.SATUSEHAT_ORG_ID || 'bf3d3d7d-620a-406a-b790-80d501a1f821', // Example Sandbox Org
      clientId: process.env.SATUSEHAT_CLIENT_ID || '',
      clientSecret: process.env.SATUSEHAT_CLIENT_SECRET || '',
      environment: 'staging',
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
