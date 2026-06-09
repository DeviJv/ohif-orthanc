import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    matcher: ["/((?!login|download|api|ohif|dicom-web|logo.png|_next/static|_next/image|favicon.ico).*)"],
};
