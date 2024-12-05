import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc";
export default function Google() {
    return (
        <form action="" className="w-80 sm:w-96 ">
            <Button className="w-full flex items-center gap-5" > <FcGoogle className="!w-5 !h-5" /> Continue with Google</Button>
        </form >
    )
}
