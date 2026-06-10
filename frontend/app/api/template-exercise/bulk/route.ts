import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { ids } = await req.json();

        await prisma.templateExercise.deleteMany({
            where: { id: { in: ids } },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
