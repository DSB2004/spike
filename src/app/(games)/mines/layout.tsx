"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
interface JwtPayload {
  id: string; // or whatever type it is
  // Add other properties if needed
}
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [data, setData] = useState<any>(null);
  const [bombNo, setBombNo] = useState(3);
  const [betAmt, setBetAmt] = useState(0);
  const router = useRouter();
  const fetchData = async () => {
    const res = await axios.post("/api/mines/createGame", {
      userId: data,
      bombNo: bombNo,
      betAmt: betAmt,
    });
    console.log(res.data);
    router.push(`/mines/${res.data.res.id}`);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("login");
    }
    const decood = jwt.decode(token!) as JwtPayload | null;
    console.log(decood?.id);
    setData(decood?.id);
  }, []);
  return (
    <div className="flex ">
      {/* <Navbar /> */}
      <div className="bg-gray-700 text-white flex flex-col w-1/3 pt-14 p-4 h-screen">
        <h1 className="text-5xl text-white">Mines</h1>
        <hr />
        <div>
          <p>Number of Bombs</p>
          <input
            type="number"
            name=""
            id=""
            className="text-3xl rounded-md  bg-gray-800 w-full text-white px-4 flex mx-2"
            value={bombNo}
            min={1}
            max={24}
            onChange={(e) => {
              setBombNo(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <p>Bet Amount</p>
          <input
            type="number"
            name=""
            id=""
            min={0}
            className="text-3xl rounded-md bg-gray-800 w-full text-white flex px-4 mx-2 "
            value={betAmt}
            onChange={(e) => {
              setBetAmt(Number(e.target.value));
            }}
          />
        </div>
        <button
          className="text-3xl text-white bg-green-600 w-1/3 m-2 rounded-lg hover:scale-105 duration-300 "
          onClick={() => {
            console.log(data);

            fetchData();
          }}
        >
          Bet
        </button>
      </div>
      {children}
    </div>
  );
};

export default Layout;
