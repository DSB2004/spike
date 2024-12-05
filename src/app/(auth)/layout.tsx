import React, { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import dashbord__bg__src from "@/assets/spike__bg.webp";
export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <main className='min-h-screen relative  flex flex-col overflow-auto'>
                <Navbar />
                <Image
                    src={dashbord__bg__src}
                    alt=""
                    className='h-full w-full fixed top-0 left-0 opacity-25 -z-50 animate-'
                    loading="lazy"
                    layout="fill"
                    objectFit="cover"
                />
                {children}
            </main>
        </>
    )
}
