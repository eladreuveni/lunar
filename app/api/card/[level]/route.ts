import connectMongoDB from "@/libs/mongodb";
import Card from "@/modals/card";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { level: string } }) {
    await connectMongoDB();
    const level = parseInt(params.level)
    const data = await Card.findOne({ level });
    return NextResponse.json({ data });
}