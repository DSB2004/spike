"use server"

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { verifyOTP } from "@/utils/handleOTP";
import redis from "@/lib/redis";
import { v4 } from "uuid";
import { otp__type } from "@/types/constants";
const OtpAction = async (data: string) => {
    const otp_session = (await cookies()).get('otp_session');

    if (!otp_session) {
        return { msg: "OTP session has expired" };
    }
    const { email, otp, type } = JSON.parse(await redis.get(`otp-session:${otp_session}`) || "{}");
    try {
        if (!email || !otp || !type) {
            return { msg: "Session expired" };
        }
        const result = verifyOTP(data) && otp === data;
        if (!result) return { msg: "OTP didn't matched or has expired" };

        const auth__session = v4();

        await redis.set(
            `auth-session:${auth__session
            }`,
            JSON.stringify({
                email, type: otp__type.account
            }),
            'EX', 120
        );
        (await cookies()).set('auth_session', auth__session);
    }
    catch (err) {
        redirect("/maintenance", RedirectType.push);
    }


    if (type === otp__type.account) redirect('/signup/account', RedirectType.replace)


}

export default OtpAction;
