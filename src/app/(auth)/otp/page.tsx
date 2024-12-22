
import React from 'react'
import Form from './form'

export default function page() {
    return (
        <section className="flex-1 flex items-center gap-5 flex-col justify-center">
            <h1 className="opacity-40 font-black text-xl text-white">Welcome to Spike</h1>
            <h4 className="font-black opacity-40 text-sm">Email Verification</h4>
            <p className="font-black opacity-40 text-xs">An OTP has been send to your registered email</p>
            <Form></Form>
        </section >
    )
}
