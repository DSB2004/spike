"use client"
import React, { useEffect } from 'react'
import OtpInput from '@/components/ui/otp_input'
import { Button } from '@/components/ui/button'
import useHook from './hook'
import { RiLoader4Line } from "react-icons/ri";

export default function Form() {
    const { handlePaste, onSubmit, register, handleSubmit, errors, isLoading, isSubmitting } = useHook();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-10 flex-col h-64 mt-12' onPaste={handlePaste}>
            <div className='flex gap-1 sm:gap-3 items-center'>
                <OtpInput
                    {...register("otp__1")}
                    disabled={isLoading || isSubmitting}
                    className={errors.root ? "!border-red-500" : ""}

                />
                <OtpInput
                    {...register("otp__2")}
                    disabled={isLoading || isSubmitting}
                    className={errors.root ? "!border-red-500" : ""}
                />
                <OtpInput
                    {...register("otp__3")}
                    disabled={isLoading || isSubmitting}
                    className={errors.root ? "!border-red-500" : ""}
                />
                <OtpInput
                    {...register("otp__4")}
                    disabled={isLoading || isSubmitting}
                    className={errors.root ? "!border-red-500" : ""}
                />
                <OtpInput
                    {...register("otp__5")}
                    disabled={isLoading || isSubmitting}
                    className={errors.root ? "!border-red-500" : ""}
                />
                <OtpInput
                    {...register("otp__6")}
                    disabled={isLoading || isSubmitting}
                    className={errors.root ? "!border-red-500" : ""}
                />
            </div>

            <Button disabled={isSubmitting || isLoading} className={isSubmitting || isLoading ? "opacity-65" : ""}>
                {isSubmitting || isLoading ? <RiLoader4Line className='animate-spin !h-8 !w-8' /> : <>Verify OTP</>}
            </Button>
        </form>
    )
}