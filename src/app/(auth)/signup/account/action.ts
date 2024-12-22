import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SignUpFormData } from "../validation";
import { createToken } from "@/utils/handleJwt";
import { redirect, RedirectType } from "next/navigation";

const CreateAccount = async () => {
    try {
        // First, check for the 'auth-session' cookie
        const auth_session = (await cookies()).get('auth_session');

        if (!auth_session) {
            // No auth session cookie, unauthorized access
            return { msg: "Account session has expired" }
        }

        // fetching the user email using the auth-session key from Redis
        const { email } = JSON.parse(await redis.get(`auth-session:${auth_session}`) || "{}") as { email: string };

        if (!email) {
            return { msg: "Account session has expired" }
        }

        const userInfo = JSON.parse(await redis.get(`user-account:${email}`) || "{}") as SignUpFormData;
        await prisma.user.create({ data: { email: userInfo.email, password: userInfo.password, name: userInfo.name } });
        const access_token = createToken({ name: userInfo.name, email: userInfo.email }, "7d");
        if (!access_token || access_token === null) {
            redirect("/maintenance", RedirectType.push);
        }
        (await cookies()).set('access-token', access_token);
        redirect("/games", RedirectType.replace);


    } catch (err) {
        console.error("Error during account creation:", err);
        redirect("/maintenance", RedirectType.push);
    }
}



export default CreateAccount;