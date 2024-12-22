import React from 'react'

export default function Page() {
    return (
        <section className="flex flex-col justify-center min-w-80 w-3/5 m-auto">
            <h1 className="opacity-40 font-black text-2xl text-center text-white">Welcome to Spike</h1>
            <h4 className="font-black opacity-40 text-sm text-center">Continue SignUp</h4>
            <ul>

                <p className='my-5 opacity-40  text-sm'>
                    By using Spike, you agree to the following terms. Please read them carefully.
                </p>
                <li className='text-sm opacity-40  list-disc'>
                    We collect personal information, including your name, email, and profile data, to provide our services. Your content (posts, comments, etc.) will be visible to other users on our platform.
                </li>

                <li className='text-sm opacity-40  list-disc'>
                    Content you share on Spike will be accessible to others. Your profile and posts may be displayed publicly on the platform.
                </li>

                <li className='text-sm opacity-40  list-disc'>
                    You are responsible for the content you post. Do not share sensitive personal information you wish to keep private.
                </li>
                <li className='text-sm opacity-40  list-disc'>
                    We may update these terms. Continued use of the platform means you accept the changes.
                </li>
            </ul>
        </section>
    )
}
