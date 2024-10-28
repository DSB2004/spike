import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, mineId } = await req.json();
  const prisma = new PrismaClient();
  const mine = await prisma.mines.findUnique({
    where: {
      id: mineId,
    },
    select: { newBetAmount: true, gameEnd: true },
  });
  if (mine?.gameEnd) {
    return NextResponse.json({ message: "game ended" });
  }
  const upd = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      balance: {
        increment: mine?.newBetAmount,
      },
    },
  });
  return NextResponse.json({
    oldAmt: mine?.newBetAmount,
    upd: upd,
  });
}
