"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Public from './public'
export default function Navbar() {
    const pathname = usePathname()
    const isDashboard = pathname?.includes('/dashboard');
    return (


        isDashboard ?
            <>Dashboard</>
            : <Public />


    )
}
