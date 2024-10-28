import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { userId, bombNo, betAmt } = await req.json();
  try {
    const coordinates: { x: number; y: number }[] = [];
    const range = [1, 2, 3, 4, 5];
    const bombs: { x: number; y: number }[] = [];
    // Create all possible unique coordinates (including pairs where x === y)
    for (const x of range) {
      for (const y of range) {
        coordinates.push({ x, y });
      }
    }
    for (let i = 0; i < bombNo; i++) {
      if (coordinates.length === 0) {
        throw new Error("Not enough unique coordinates available for bombs.");
      }
      const randomIndex = Math.floor(Math.random() * coordinates.length);
      // Push the randomly selected coordinate into the bombs array
      bombs.push(coordinates[randomIndex]);
      // Remove the selected coordinate from the available options
      coordinates.splice(randomIndex, 1);
    }
    const upd = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: { decrement: betAmt },
      },
    });
    if (!upd) {
      return NextResponse.json({ error: "cant update" });
    }
    const resDB = await prisma.mines.create({
      data: {
        bombs: bombs,
        userId: userId,
        betAmount: betAmt,
        newBetAmount: betAmt,
      },
    });
    console.log(resDB);

    return NextResponse.json({ status: 200, res: resDB });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: 500, error: error });
  }
}
