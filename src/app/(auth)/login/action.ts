"use server"

import { LogInFormData } from "./validation";
import prisma from "@/lib/prisma";
import { createToken } from "@/utils/handleJwt";
import { comparePassword } from "@/utils/handleHashing";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

const LogInAction = async (data: LogInFormData, setError: Function) => {
    const { email, password } = data;

    if (!email || !password) {
        setError("email", { type: "server", message: "Invalid email" });
        setError("password", { type: "server", message: "Invalid password" });
        return;
    }

    try {
        const userInfo = await prisma.user.findUnique({ where: { email } });
        if (!userInfo || userInfo === null) {
            setError("email", { type: "server", message: "Account not found" });
            return;
        }

        const dbPassword = userInfo.password;
        const passwordAuth = await comparePassword(password, dbPassword);
        if (!passwordAuth) {
            setError("password", { type: "server", message: "Password didn't matched" });
            return;
        }
        const access__token = createToken({ name: userInfo.name, email }, '7d');
        if (access__token === null) {
            setError("root", { type: "server", message: "Server side error" });
            return;
        }

        (await cookies()).set('access-token', access__token);

        redirect("/games", RedirectType.push);
    }
    catch (err) {
        console.log(err)
        setError("root", { type: "server", message: "Server side error" });
        return;
    }

}



export default LogInAction;