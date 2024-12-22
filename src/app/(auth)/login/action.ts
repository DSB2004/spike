"use server";

import { LogInFormData } from "./validation";
import prisma from "@/lib/prisma";
import { createToken } from "@/utils/handleJwt";
import { comparePassword } from "@/utils/handleHashing";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { FormError } from "@/types";

const LogInAction = async (data: LogInFormData): Promise<FormError<LogInFormData> | null> => {
    const { email, password } = data;

    const errors: FormError<LogInFormData> = {};

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
        const userInfo = await prisma.user.findUnique({ where: { email } });
        if (!userInfo) {
            return { email: { type: "required", message: "Account not found" } };
        }

        const dbPassword = userInfo.password;
        const passwordAuth = await comparePassword(password, dbPassword);
        if (!passwordAuth) {
            return { password: { type: "pattern", message: "Password didn't match" } };
        }

        const access__token = createToken({ name: userInfo.name, email }, "7d");
        if (!access__token) {
            redirect("/maintenance", RedirectType.push);
        }

        (await cookies()).set("access-token", access__token);

        redirect("/games", RedirectType.push);
    } catch (err) {
        console.error(err);
        redirect("/maintenance", RedirectType.push);
    }
};

export default LogInAction;
