"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
interface DataContext {
  name: string;
  balance: number;
  fetchData: () => void;
}
interface JwtPayloadExtended extends JwtPayload {
  id: string; // Adjust type based on your token structure
}
const Navbar = ({}) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [decood, setDecood] = useState("");
  const router = useRouter();

  const fetchData = async ({ userId }: { userId: string }) => {
    const res = await axios.post("/api/navbar", {
      userId: userId,
    });
    console.log(res.data.data.balance);
    // setName(res.data.name);
    setBalance(res.data.data.balance);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("login");
    }

    const decood = jwt.decode(token!) as JwtPayload | null;
    console.log(decood?.id);
    setDecood(decood?.id);

    fetchData({ userId: decood?.id });
  }, []);
  return (
    <div className="h-14 w-screen bg-gray-900 flex justify-center items-center fixed">
      <div className="text-white flex justify-center items-center flex-col bg-green-40 0 ">
        <p>Balance</p>
        <p className="text-2xl">{balance}</p>
      </div>
      <button
        onClick={() => {
          fetchData({ userId: decood });
        }}
      >
        🔃
      </button>
    </div>
  );
};
export default Navbar;
