import { PrismaClient } from "./frontend/app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("--- WEBHOOK LOG DEBUG ---");
    const logs = await prisma.satuSehatWebhookLog.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(JSON.stringify(logs, null, 2));
    console.log("------------------------");
  } catch (error) {
    console.error("DEBUG ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
