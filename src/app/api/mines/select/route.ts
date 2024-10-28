import { PrismaClient } from "@prisma/client";
import { JsonArray } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { multiplier } from "../../mineMultipler";
type Bomb = { x: number; y: number };
interface Data {
  bombs: Bomb[] | null; // Use null to account for cases where bombs might not be set
  opened: number; // Add any other properties if needed
  betAmout: number;
}

// Example response type
interface ApiResponse {
  data: Data; // or | undefined based on your API response
}
export async function POST(req: NextRequest) {
  const { id, x, y } = await req.json();
  const prisma = new PrismaClient();
  const data = await prisma.mines.findUnique({
    where: {
      id: id,
    },
    select: {
      bombs: true,
      opened: true,
      betAmount: true,
      gameEnd: true,
      newBetAmount: true,
    },
  });
  if (data?.gameEnd) {
    return NextResponse.json({ message: "game ended" });
  }
  const coord = { x: x, y: y };
  const exists = (data?.bombs as { x: number; y: number }[])?.some(
    (cord: { x: number; y: number }) => coord.x === cord.x && coord.y === cord.y
  );
  if (exists) {
    const upd = await prisma.mines.update({
      where: { id: id },
      data: { betAmount: 0, newBetAmount: 0, gameEnd: true },
    });
    return NextResponse.json({
      bomb: true,
      data: upd,
      multiplier: 0,
      newAmt: 0,
      upd: upd,
      gameEnd: true,
    });
  }
  const bombCount = (data?.bombs as JsonArray)?.length || 0;
  const openedCount = data?.opened || 0;

  if (bombCount in multiplier) {
    const multi = multiplier[bombCount][openedCount];
    const newAmt = data?.betAmount! * multi;
    const upd = await prisma.mines.update({
      where: { id: id },
      data: { newBetAmount: newAmt, opened: { increment: 1 } },
    });
    return NextResponse.json({
      // data: data,
      bomb: false,
      multiplier: multi,
      newAmt: newAmt,
      upd: upd,
      gameEnd: false,
    });
  } else {
    return NextResponse.json({
      error: "Invalid bomb count",
    });
  }
}
