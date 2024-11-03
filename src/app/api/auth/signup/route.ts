import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPass,
        name: name,
      },
    });
    const token = jwt.sign(
      {
        id: user.id,
        email: email,
        password: hashedPass,
        name: name,
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
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 400 }
    );
  }
}
