import { NextRequest, NextResponse } from "next/server";
import { multiplier } from "../../mineMultipler";
import { PrismaClient } from "@prisma/client";
import { JsonArray } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
  const { mineId } = await req.json();
  const prisma = new PrismaClient();
  const mine = await prisma.mines.findUnique({
    where: {
      id: mineId,
    },
    select: { bombs: true, opened: true, newBetAmount: true, gameEnd: true },
  });
  const bombCount = (mine?.bombs as JsonArray)?.length || 0;
  const openedCount = mine?.opened || 0;

  const multi = multiplier[bombCount][openedCount];
  return NextResponse.json({
    multi: multi,
    betAmt: mine?.newBetAmount,
    gameEnd: mine?.gameEnd,
    opened: openedCount,
  });
}
