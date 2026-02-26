const { PrismaClient } = require("./app/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const email = "admin@pacs.com";
    const password = "adminpassword";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            email,
            name: "Admin User",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Seed successful!");
    console.log("Email: " + email);
    console.log("Password: " + password);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
