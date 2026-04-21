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
            const isAdminRoute = nextUrl.pathname.startsWith('/admin');

            if (isApiRoute) return true;

            if (!isLoggedIn && !isOnLoginPage) {
                const loginUrl = nextUrl.clone();
                loginUrl.pathname = '/login';
                loginUrl.search = '';
                loginUrl.searchParams.set('callbackUrl', `${nextUrl.pathname}${nextUrl.search}`);
                return Response.redirect(loginUrl);
            }

            if (isLoggedIn && isOnLoginPage) {
                return Response.redirect(new URL('/', nextUrl));
            }

            // RBAC Protection for /admin
            if (isLoggedIn && isAdminRoute) {
                const roleName = (auth.user as any)?.role?.name;
                if (roleName !== 'ROOT' && roleName !== 'SUPER-ADMIN') {
                    return Response.redirect(new URL('/', nextUrl));
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = (token.role as any);
            }
            return session;
        },
    },
} satisfies NextAuthConfig;
