import z from 'zod';

const OtpSchema = z.object({

    otp__1: z.string().length(1, "Invalid").regex(/\d/, "Can only be a number"),
    otp__2: z.string().length(1, "Invalid").regex(/\d/, "Can only be a number"),
    otp__3: z.string().length(1, "Invalid").regex(/\d/, "Can only be a number"),
    otp__4: z.string().length(1, "Invalid").regex(/\d/, "Can only be a number"),
    otp__5: z.string().length(1, "Invalid").regex(/\d/, "Can only be a number"),
    otp__6: z.string().length(1, "Invalid").regex(/\d/, "Can only be a number"),

});


export default OtpSchema;
export type OtpFormData = z.infer<typeof OtpSchema>;
