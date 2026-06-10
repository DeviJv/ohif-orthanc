import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const searchParams = new URL(req.url).searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const userId = searchParams.get("userId") || "";

        const where: any = {};
        if (search) {
            where.nama = { contains: search, mode: "insensitive" };
        }
        if (userId) {
            where.userId = userId;
        }

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            prisma.templateExercise.findMany({
                where,
                include: { user: { select: { name: true } } },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.templateExercise.count({ where }),
        ]);

        return NextResponse.json({
            items,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { userId, nama, template } = body;

        const newItem = await prisma.templateExercise.create({
            data: { userId, nama, template },
            include: { user: { select: { name: true } } }
        });

        return NextResponse.json(newItem);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
