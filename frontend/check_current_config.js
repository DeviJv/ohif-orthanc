const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.satuSehatSetting.findFirst({
    where: { isActive: true }
  });
  
  if (setting) {
    console.log("Current SatuSehat Setting (Active):");
    console.log("- Organization ID:", setting.organizationId);
    console.log("- Client ID:", setting.clientId);
    console.log("- Environment:", setting.environment);
    console.log("- Auth URL:", setting.authUrl || "(Default)");
    console.log("- Base URL:", setting.baseUrl || "(Default)");
  } else {
    console.log("No active SatuSehatSetting found.");
    
    // Check AppConfig
    const configs = await prisma.appConfig.findMany({
      where: {
        key: {
          in: ["SATUSEHAT_ORG_ID", "SATUSEHAT_CLIENT_ID", "SATUSEHAT_ENV"]
        }
      }
    });
    console.log("AppConfigs:", configs);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
