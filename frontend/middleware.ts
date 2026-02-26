import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // PROTECT ALL ROUTES EXCEPT login, api, and static files
    matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
