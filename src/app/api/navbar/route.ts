import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  console.log(userId);

  try {
    const prisma = new PrismaClient();
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        // name: true,
        balance: true,
      },
    });
    console.log(data);

    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error });
  }
}
