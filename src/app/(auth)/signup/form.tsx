import React from 'react'
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiLoader4Line } from "react-icons/ri";
import useHook from './hook';
export default function SignUpForm() {

    const { register,
        handleSubmit,
        errors,
        isLoading,
        isSubmitting, onSubmit } = useHook()
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-5 items-center  w-80 sm:w-96 ">
            <Input defaultValue="Damanjeet Singh" {...register("name")} error={errors.name?.message} disabled={isLoading || isSubmitting} className="" placeholder="Enter name..." type="text" />
            <Input {...register("email")} defaultValue="damanjeetsingh434@gmail.com" error={errors.email?.message} disabled={isLoading || isSubmitting} className="" placeholder="Enter email..." type="email" />
            <Input defaultValue="12345678@" {...register("password")} error={errors.password?.message} disabled={isLoading || isSubmitting} className="" placeholder="Enter password..." type="password" />
            <Button disabled={isSubmitting || isLoading} className={isSubmitting || isLoading ? "opacity-65" : ""}>
                {isSubmitting || isLoading ? <RiLoader4Line className='animate-spin !h-8 !w-8' /> : <>Verify OTP</>}
            </Button>
        </form >
    )
}
