import { PrismaClient } from "./frontend/app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.aiResult.count();
    const latest = await prisma.aiResult.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' }
    });
    
    console.log("--- DATABASE DEBUG REPORT ---");
    console.log(`Total AI Results: ${count}`);
    console.log("Latest 5 Results:", JSON.stringify(latest, null, 2));
    console.log("----------------------------");
  } catch (error) {
    console.error("DEBUG ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
