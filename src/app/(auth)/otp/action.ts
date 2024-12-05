"use server"


const OtpAction = async (data: string) => {
    console.log("OTP submission started");
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("OTP submitted", data);
}

export default OtpAction;
