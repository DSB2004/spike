import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        balance: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "Email not found",
        },
        { status: 301 }
      );
    }
    const pass = await bcrypt.compare(password, user.password);
    if (pass) {
      const token = jwt.sign(
        {
          id: user.id,
          email: email,
          // password: user.password,
          name: user.name,
          balance: user.balance,
        },
        process.env.JWT_SECRET!
      );
      const respo = NextResponse.json(
        {
          user: user,
        },
        { status: 200 }
      );
      respo.cookies.set("token", token, {
        httpOnly: false,
        sameSite: "none",
        path: "/",
        secure: true,
      });
      return respo;
    } else {
      return NextResponse.json(
        {
          error: "Wrong password",
        },
        { status: 302 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 400 }
    );
  }
}
