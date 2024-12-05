import React from 'react'
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function SignUpForm() {
    return (
        <form action="" className="flex flex-col gap-3 mt-5 items-center  w-80 sm:w-96 ">
            <Input className="" placeholder="Enter name..." type="text" />
            <Input className="" placeholder="Enter email..." type="email" />
            <Input className="" placeholder="Enter password..." type="password" />
            <Button className="w-full" size="sm">Create Account</Button>
        </form >
    )
}
