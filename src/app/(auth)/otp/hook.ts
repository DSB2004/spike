import { useCallback, useEffect } from 'react';
import OtpSchema, { OtpFormData } from './validator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OtpAction from './action';
import { useToast } from '@/hooks/use-toast';

export default function useHook() {

    const { register, handleSubmit, setError, setValue, reset, formState: { errors, isLoading, isSubmitting, isValid } } = useForm<OtpFormData>({
        resolver: zodResolver(OtpSchema),
        mode: "onChange"
    });

    const { toast } = useToast()
    const handlePaste = useCallback((event: React.ClipboardEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = event.clipboardData.getData("text");
        if (!value || value.length !== 6 || !/^\d+$/.test(value)) {
            console.log("invalid format")
            setError("root", { type: "manual", message: "Invalid OTP format" });
            return;

        }
        for (let index = 1; index <= 6; index++) {
            // @ts-ignore
            setValue("otp__" + index, value[index - 1]);
        }
        handleSubmit(onSubmit)();
    }, []);




    const onSubmit = async (data: OtpFormData) => {
        const otp = Object.values(data).join("");
        const err = await OtpAction(otp);
        if (err) {
            setError("root", {
                message: err.msg,
                type: "manual"
            });
            toast({
                title: "Error occurred",
                description: err.msg,
                variant: "destructive",
            });

            return;
        }
        reset();
    };

    useEffect(() => {
        if (isValid && !isSubmitting) {
            handleSubmit(onSubmit)();
        }
    }, [isValid])

    return { handlePaste, onSubmit, register, handleSubmit, errors, isLoading, isSubmitting, isValid };
}
