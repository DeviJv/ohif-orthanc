const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.satuSehatSetting.findMany();
  console.log('--- SATUSEHAT SETTINGS ---');
  console.dir(settings, { depth: null });

  const appConfigs = await prisma.appConfig.findMany();
  console.log('--- APP CONFIGS ---');
  console.dir(appConfigs, { depth: null });
}

main().finally(() => prisma.$disconnect());
