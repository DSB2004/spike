import React from 'react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod";
import LogInSchema, { LogInFormData } from './validation';
import { useForm } from "react-hook-form";
import LogInAction from './action';
import { RiLoader4Line } from "react-icons/ri";
export default function Form() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<LogInFormData>({
        resolver: zodResolver(LogInSchema),
    });
    return (
        <form onSubmit={handleSubmit((data) => LogInAction(data, setError))} action="" className="flex flex-col gap-3 mt-5 items-center w-80 sm:w-96 ">
            <Input disabled={isLoading || isSubmitting} placeholder="Enter email..." type="email"  {...register("email")} error={errors.email?.message} />
            <Input disabled={isLoading || isSubmitting} placeholder="Enter password..." type="password" {...register("password")} error={errors.password?.message} />
            <Button className="w-full">{isSubmitting || isLoading ? <>< RiLoader4Line className='animate-spin' /></> : <>Login</>}</Button>
        </form >
    )
}
