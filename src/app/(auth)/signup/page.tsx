"use client";
import React from "react";
import Link from "next/link";
import SignUpForm from "./form";
function Signup() {
  return <>
    <section className="flex-1 flex items-center gap-5 flex-col justify-center">
      <h1 className="opacity-40 font-black text-xl text-white">Welcome to Spike</h1>
      <h4 className="font-black opacity-40 text-sm">SignUp with Spike</h4>

      <SignUpForm />

      <p className="text-xs opacity-55 mt-6">
        Already have an account! <Link href="/login" className="underline">Login</Link>
      </p>

    </section >

  </>

}

export default Signup;
