"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Page() {
    return (
        <>
            <section
                className='flex-1 h-full
                  flex flex-col  justify-center px-10'
            >
                <h2 className='opacity-30 text-2xl mb-5 font-black'>Timeless Fun Awaits — Relive Your Favorite Classics</h2>
                <h1 className='text-white opacity-50 text-4xl font-black mb-6 min-w-96  w-3/4'>Embark on a nostalgic journey with iconic games, endless challenges, and hours of entertainment for players of all ages!</h1>
                <p className=' opacity-50 min-w-96 text-sm w-3/4'>Rediscover the magic of classic gaming, where simplicity meets endless entertainment. Whether you're aiming for high scores or just looking for a quick escape, our collection of nostalgic games offers fun, challenge, and replayability at your fingertips. Start playing today and experience the thrill of timeless fun!</p>

                <div className='flex w-fit gap-4 my-10 items-center flex-wrap'>

                    <Link href="/login">
                        <Button size="sm" className='bg-slate-700 hover:!bg-slate-600 !text-xs text-white'>
                            Login
                        </Button>
                    </Link>


                    <span className='uppercase opacity-15 font-black'>OR</span>

                    <Link href="/signup">
                        <Button size="sm" className='bg-slate-700 hover:!bg-slate-600 !text-xs text-white'>
                            Create Account
                        </Button>
                    </Link>
                </div>

            </section>
        </>
    );
}
