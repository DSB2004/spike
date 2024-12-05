"use client";
import React from "react";
import Link from "next/link";
import Form from "./form";
import Google from "./google";
function Signup() {
  return <>
    <section className="flex-1 flex items-center gap-5 flex-col justify-center">
      <h1 className="opacity-40 font-black text-xl text-white">Welcome to Spike</h1>
      <h4 className="font-black opacity-40 text-sm">Login with Spike</h4>

      <Form></Form>
      <p className="m-0 text-xs font-black opacity-30 text-white">OR</p>
      <Google></Google>

      <p className="text-xs opacity-55 mt-6">
        Create new account! <Link href="/signup" className="underline">SignUp</Link>
      </p>
      <p className="text-xs opacity-55">
        Forget Password! <Link href="/signup" className="underline">Reset here</Link>
      </p>

    </section >

  </>

}

export default Signup;