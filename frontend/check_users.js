const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany({
    include: { role: true }
  });
  console.log(JSON.stringify(users, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
