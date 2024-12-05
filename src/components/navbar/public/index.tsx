"use client"
import React from 'react'
import { MdOutlineGames } from "react-icons/md";
import Link from 'next/link'
import { MdHome } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { Button } from '@/components/ui/button'
export default function Public() {

    return (
        <header className='sticky p-3 flex justify-between items-center'>

            <div className='flex gap-2 items-center'>

                <MdOutlineGames className='h-8 w-8' />

                <h1 className='font-black text-lg'>Spike</h1>
            </div>

            <nav className='flex gap-4 text-xs' >
                <Link href="/" className='flex opacity-40 hover:opacity-60 transition-all duration-200 gap-1 items-center'>
                    <MdHome className='h-5 w-5' />
                    Home
                </Link>

                <Link href="/games" className='flex gap-1 items-center opacity-40 hover:opacity-60 transition-all duration-200'>
                    <MdOutlineExplore className='h-5 w-5' />
                    Explore
                </Link>

                <Link href="/signup" className='flex opacity-40 hover:opacity-60 transition-all duration-200 gap-1 items-center'>
                    < HiUser className='h-5 w-5' />
                    Account
                </Link>
            </nav>


            <Link href="/login">
                <Button size="sm" className='bg-slate-700 hover:!bg-slate-600 !text-xs text-white'>
                    Login
                </Button>
            </Link>



        </header>
    )
}
