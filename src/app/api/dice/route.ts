import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, betAmt, diceVal } = await req.json();
  const prisma = new PrismaClient();
  try {
    const multiplier = parseFloat(
      (98 / (100 - parseFloat(diceVal) / 100)).toFixed(2)
    );
    const diceValFloat = parseFloat((diceVal / 100).toFixed(2));
    const random = parseFloat((Math.random() * 100).toFixed(2));
    if (diceValFloat < random) {
      const newBetAmount = betAmt * multiplier;
      const upd = await prisma.user.update({
        where: {
          id: userId,
        },
        data: { balance: { increment: newBetAmount - betAmt } },
      });
      return NextResponse.json({
        balance: upd.balance,
        success: true,
        multiplier: multiplier,
        random: random,
        newBetAmount: newBetAmount,
      });
    } else {
      const upd = await prisma.user.update({
        where: {
          id: userId,
        },
        data: { balance: { decrement: betAmt } },
      });
      return NextResponse.json({
        // upd: upd,
        balance: upd.balance,
        success: false,
        multiplier: 0,
        random: random,
        newBetAmount: 0,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
