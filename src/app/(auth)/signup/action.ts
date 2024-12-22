"use server"
import { SignUpFormData } from "./validation";
import { hashPassword } from "@/utils/handleHashing";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";
import { generateTOTP } from "@/utils/handleOTP";
import prisma from "@/lib/prisma";
import { v4 } from "uuid";
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation";
import { FormError } from "@/types";
import { otp__type } from "@/types/constants";
const USER_TIMEOUT = 300;


const SignUpAction = async (data: SignUpFormData) => {
    // User will submit their info
    // Server then generates a otp_token and saves users info in redis for later usage
    // User will get an OTP to continue with account creation

    const { name, email, password } = data;

    const errors: FormError<SignUpFormData> = {};


    if (!name) {
        errors.email = { type: "required", message: "Invalid name" };
    }
    if (!email) {
        errors.email = { type: "required", message: "Invalid email" };
    }
    if (!password) {
        errors.password = { type: "required", message: "Invalid password" };
    }
    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        // checking if user exist
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (checkUser) return { email: { type: "pattern", message: "Account already exist" } };

    }
    catch (err) {
        console.log(err)
        redirect("/maintenance", RedirectType.push);
    }

    try {
        // setting up user info in redis
        const hashedPassword = await hashPassword(password);
        await redis.set(`user-account:${email}`, JSON.stringify({ email, name, hashedPassword }), "EX", USER_TIMEOUT);

        // generating time based otp
        const otp_session = v4();
        const otp = generateTOTP();
        console.log("Generated OTP:", otp);

        await redis.set(
            `otp-session:${otp_session}`,
            JSON.stringify({
                email, otp, type: otp__type.account
            }),
            'EX', USER_TIMEOUT
        );

        (await cookies()).set("otp_session", otp_session);

        // mailing otp to user

    }
    catch (err) {
        console.log(err)
        redirect("/maintenance", RedirectType.push);
    }

    if ((await cookies()).get("otp_session") !== null) {
        redirect("/otp", RedirectType.push);
    }

}




export default SignUpAction