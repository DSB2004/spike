"use client";
import { useRouter } from "next/navigation";
import React from "react";
import dashbord__bg__src from "@/assets/spike__bg.webp";
import Image from "next/image";
const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <section className='h-3/4 w-5/6 relative border-2 border-white'>
        <Image
          src={dashbord__bg__src}
          alt=""
          className='h-full w-full absolute top-0 left-0'
          loading="lazy"
          layout="fill"
          objectFit="cover"
        />
      </section>
    </>
  );
};

export default Dashboard;
