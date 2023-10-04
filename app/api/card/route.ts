import connectMongoDB from "@/libs/mongodb";
import Card from "@/modals/card";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log("🚀 ~ file: route.ts:7 ~ POST ~ data:", data)
    await connectMongoDB();
    // const dbRes = await Card.create(data)
    return NextResponse.json("success")
}