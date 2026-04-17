const { PrismaClient } = require("./app/generated/prisma");
const prisma = new PrismaClient();

async function backfill() {
  const integrations = await prisma.satuSehatIntegration.findMany({
    where: { 
      bundleResponse: { not: null },
      status: "SUCCESS"
    }
  });

  console.log(`Found ${integrations.length} successful integrations to backfill.`);

  let totalResourceCount = 0;
  for (const integration of integrations) {
    const response = integration.bundleResponse;
    if (!response || !response.entry) continue;

    for (const entry of response.entry) {
      const loc = entry.response?.location || "";
      if (!loc) continue;

      const parts = loc.split("/");
      const resourceType = parts[0];
      const resourceId = parts[1];

      // Use a more reliable way to detect resource type if parts[0] is not clear
      // Usually location is: [ResourceType]/[id]/_history/[version]
      
      await prisma.satuSehatResourceLog.create({
        data: {
          resourceType,
          resourceId,
          accessionNumber: integration.accessionNumber,
          studyInstanceUid: integration.studyInstanceUid,
          method: "POST",
          status: "SUCCESS",
          responseCode: 201,
          environment: "staging", // Default to staging for backfill as most past data is likely staging
          createdAt: integration.syncedAt || integration.createdAt
        }
      });
      totalResourceCount++;
    }
  }

  console.log(`Backfill complete. Logged ${totalResourceCount} individual resources.`);
}

backfill()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
