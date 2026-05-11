const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany();
  console.log('Total users:', users.length);
  console.log(users);
}
main().catch(console.error).finally(() => prisma.$disconnect());
