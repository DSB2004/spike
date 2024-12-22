import React from 'react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import useHook from './hook';
import { RiLoader4Line } from "react-icons/ri";
export default function Form() {
    const { register,
        handleSubmit,
        errors,
        isLoading,
        isSubmitting, onSubmit } = useHook()

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-5 items-center w-80 sm:w-96 " >
            <Input disabled={isLoading || isSubmitting} placeholder="Enter email..." type="email"  {...register("email")} error={errors.email?.message} />
            <Input disabled={isLoading || isSubmitting} placeholder="Enter password..." type="password" {...register("password")} error={errors.password?.message} />
            <Button disabled={isSubmitting || isLoading} className={isSubmitting || isLoading ? "opacity-65" : ""}>
                {isSubmitting || isLoading ? <RiLoader4Line className='animate-spin !h-8 !w-8' /> : <>Verify OTP</>}
            </Button>
        </form >
    )
}
