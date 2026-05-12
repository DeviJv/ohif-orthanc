import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const doctors = await db.user.findMany({
            where: {
                role: {
                    name: "DOCTOR"
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                signature: true,
                sip: true
            },
            orderBy: {
                name: "asc"
            }
        });

        return NextResponse.json(doctors, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        console.error("[USERS_GET_DOCTORS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
