const { PrismaClient } = require("./app/generated/prisma");
const prisma = new PrismaClient();

async function checkConfig() {
  const setting = await prisma.satuSehatSetting.findFirst({
    where: { isActive: true }
  });
  
  if (setting) {
    console.log("Current SatuSehat Setting:");
    console.log(`Environment: ${setting.environment}`);
    console.log(`Organization ID: ${setting.organizationId}`);
    console.log(`Client ID: ${setting.clientId.substring(0, 5)}...`);
    console.log(`Auth URL (Override): ${setting.authUrl || "None"}`);
    console.log(`Base URL (Override): ${setting.baseUrl || "None"}`);
  } else {
    console.log("No active SatuSehat setting found in DB.");
  }
}

checkConfig()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
