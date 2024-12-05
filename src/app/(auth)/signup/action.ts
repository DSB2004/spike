"use server"
import { SignUpFormData } from "./validation";
import { hashPassword } from "@/utils/handleHashing";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";
import { generateTOTP } from "@/utils/handleOTP";
import prisma from "@/lib/prisma";
import { v4 } from "uuid";
import { cookies } from "next/headers";

const USER_TIMEOUT = 3600;

const SignUpAction = async (data: SignUpFormData) => {
    // User will submit their info
    // Server then generates a otp_token and saves users info in redis for later usage
    // User will get an OTP to continue with account creation

    const { name, email, password } = data;

    // checking for user info
    if (!name || !email || !password)
        return NextResponse.json({ msg: "Field missing " }, { status: 400 });

    try {
        // checking if user exist
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (checkUser) return NextResponse.json({ msg: "Account exist" }, { status: 400 })

    }
    catch (err) {
        return NextResponse.json({ msg: "Server side error" }, { status: 500 })
    }

    try {
        // setting up user info in redis
        const hashedPassword = await hashPassword(password);
        await redis.set(`user-account:${email}`, JSON.stringify({ email, name, hashedPassword }));

        // generating time based otp
        const otp_session = v4();
        const otp = generateTOTP();
        console.log("Generated OTP:", otp);

        await redis.set(
            `otp-session:${otp_session}`,
            JSON.stringify({ email, otp }),
            'EX', USER_TIMEOUT
        );

        (await cookies()).set("otp_session", otp_session);

        // mailing otp to user

        return NextResponse.redirect("/otp", 200)


    }
    catch (err) {
        return NextResponse.json({ msg: "Server side error" }, { status: 500 })
    }

}


