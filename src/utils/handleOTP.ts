import { totp, } from "speakeasy"


const JWT_SECRET = process.env.JWT_SECRET as string;

const OTP_TIMEOUT = 300


export const generateTOTP = () => {
    const token = totp({
        secret: JWT_SECRET,
        encoding: "base32",
    });

    return token;
};


export const verifyOTP = (token: string) => {
    const result = totp.verify({
        secret: JWT_SECRET,
        encoding: "base32",
        token: token,
        step: OTP_TIMEOUT
    })
}