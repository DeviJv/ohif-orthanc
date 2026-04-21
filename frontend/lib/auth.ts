import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

// Use a singleton pattern to prevent multiple instances of Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["error"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma as any),
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                console.log(`[AUTH DEBUG] Attempting login for: "${credentials.email}"`);

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    include: {
                        role: {
                            include: {
                                permissions: true
                            }
                        }
                    }
                });

                if (!user) {
                    console.log(`[AUTH DEBUG] User not found: "${credentials.email}"`);
                    return null;
                }

                if (!user.password) {
                    console.log(`[AUTH DEBUG] User has no password set: "${credentials.email}"`);
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                console.log(`[AUTH DEBUG] Password check for "${credentials.email}": ${isPasswordValid ? 'SUCCESS' : 'FAILED'}`);

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role ? {
                        name: user.role.name,
                        permissions: user.role.permissions.map(p => ({ name: p.name }))
                    } : null,
                };
            },
        }),
    ],
});
