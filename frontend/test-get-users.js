const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Success:", users.length, "users found.");
  } catch (err) {
    console.error("Error:", err);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
