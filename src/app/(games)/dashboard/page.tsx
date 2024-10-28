"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen text-white p-6 bg-gray-800">
      <h1 className="text-6xl font-semibold">Games</h1>
      <div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/mines");
          }}
        >
          Mines
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/dice");
          }}
        >
          Dice
        </div>
      </div>
      <p>More games coming (🧢🧢🧢)</p>
    </div>
  );
};

export default Dashboard;
