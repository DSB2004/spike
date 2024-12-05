"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

interface JwtPayload {
  id: string;
}
export default function LargeTwoColorSlider() {
  const min = 0;
  const max = 100;
  const step = 0.05;
  const defaultValue = 50;
  const defaultFixedValue = 0;
  const [value, setValue] = useState(defaultValue);
  const [fixedValue, setFixedValue] = useState(defaultFixedValue);
  const [betAmt, setBetAmt] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [data, setData] = useState<string | null>(null); // Assuming userId is a string
  // const [betResponse, setBetResponse] = useState<BetResponse | null>(null);
  const [multi, setMulti] = useState(0);
  const [balance, setBalance] = useState(0);
  const [succ, setSucc] = useState(true);
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    updateValue(e);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updateValue(e);
  };

  const updateValue = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    const newValue = Math.round((min + percentage * (max - min)) / step) * step;
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("login");
    }
    const decood = jwt.decode(token!) as JwtPayload | null;
    console.log(decood?.id);
    setData(decood?.id || "");
    const handleMouseUpGlobal = () => {
      isDragging.current = false;
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, [router]);

  const getLeftPosition = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const bet = async () => {
    const res = await axios.post("/api/dice", {
      userId: data,
      betAmt: betAmt,
      diceVal: value * 100,
    });
    console.log(res.data);
    setFixedValue(res.data.random);
    // setBetAmt(res.data.)
    setMulti(res.data.multiplier);
    setBalance(res.data.balance);
    setSucc(res.data.success);
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-10 bg-gray-800">
      {/* <button onClick={handleUpdateFixedValue} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Fixed Value"}
      </button> */}
      <div className="flex w-2/3 p-4 gap-2">
        <input
          type="number"
          className="text-3xl rounded-md bg-gray-900 w-fit text-white px-4 flex mx-2"
          value={value.toFixed(2)}
          step={0.05}
          min={0}
          max={100}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
        />
        <input
          type="number"
          className="text-3xl rounded-md bg-gray-900 w-fit text-white px-4 flex mx-2"
          value={betAmt}
          min={0}
          onChange={(e) => {
            setBetAmt(Number(e.target.value));
          }}
        />
        <button
          className="text-3xl text-white bg-green-600 w-1/3 m-2 rounded-lg hover:scale-105 duration-300 "
          onClick={() => {
            console.log(data);
            bet();
          }}
        >
          Bet
        </button>
      </div>
      <div
        className="text-3xl font-semibold"
        style={{ color: succ ? "green" : "red" }}
      >
        Multiplier - {multi} Balance - {balance}
      </div>
      {/* <div className={succ ? "text-green-500" : "text-red-500"}>
        Multiplier - {multi} Balance - {balance}
      </div>
      <button className="mt-4 p-2 bg-gray-300" onClick={() => setSucc(!succ)}>
        Toggle Success
      </button> */}
      <div className="w-2/3">
        <div
          ref={sliderRef}
          className="relative w- 2/3 h-8 rounded-full cursor-pointer bg-green-500"
          // style={{ backgroundColor: secondaryColor.replace("bg-", "") }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className={`absolute h-full rounded-md bg-red-500`}
            style={{ width: `${getLeftPosition(value)}%` }}
          />
          <div
            className="absolute top-1/2 flex justify-center items-center text-gray-700 font-bold -translate-y-1/2 w-9 h-12 bg-white border-4 border-blue-500 rounded-xl cursor-grab active:cursor-grabbing shadow-lg"
            style={{
              left: `${getLeftPosition(value)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            |||
          </div>
          <div
            className="absolute top-1/2 flex justify-center items-center text-gray-700 font-bold -translate-y-1/2 w-12 h-12 border-4 bg-white border-blue-500 rounded-2xl pointer-events-none shadow-lg transition-all duration-500 ease-in-out"
            style={{
              left: `${getLeftPosition(fixedValue)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {fixedValue.toFixed(2)}
          </div>
        </div>
        <div className="flex w- 2/3 justify-between text-lg text-gray-500">
          <span>{min.toFixed(2)}</span>
          <span>{max.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
