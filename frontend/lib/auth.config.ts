import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize() {
                // This will be overridden in the main auth.ts that has access to Prisma
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');
            const isApiRoute = nextUrl.pathname.startsWith('/api');

            if (isApiRoute) return true;

            if (!isLoggedIn && !isOnLoginPage) {
                const loginUrl = nextUrl.clone();
                loginUrl.pathname = '/login';
                loginUrl.search = '';
                // Keep callback relative so it never leaks internal hostnames like localhost.
                loginUrl.searchParams.set('callbackUrl', `${nextUrl.pathname}${nextUrl.search}`);
                return Response.redirect(loginUrl);
            }

            if (isLoggedIn && isOnLoginPage) {
                const callbackUrl = nextUrl.searchParams.get('callbackUrl');
                if (callbackUrl?.startsWith('/')) {
                    return Response.redirect(new URL(callbackUrl, nextUrl));
                }
                return Response.redirect(new URL('/', nextUrl));
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as { role?: string }).role =
                    typeof token.role === "string" ? token.role : undefined;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;
