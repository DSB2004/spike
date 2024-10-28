"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Block from "./block";
import axios from "axios";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
const page = () => {
  const grid = Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from(
      { length: 5 },
      (_, colIndex) => `Row ${rowIndex + 1} Col ${colIndex + 1}`
    )
  );
  const { mineId } = useParams();
  const [data, setData] = useState<any>(null);
  const [disable, setDisable] = useState(false);
  const [res, setRes] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const handleEnd = (data: boolean) => {
    setDisable(data);
    fetchData();
  };
  const fetchData = async () => {
    const res = await axios.post("/api/mines/mineData", { mineId });
    setRes(res.data);
    setLoading(false);
    setDisable(res.data.gameEnd);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    const decood = jwt.decode(token!) as JwtPayload | null;
    console.log(decood?.id);
    setData(decood?.id);
    fetchData();
  }, []);
  const Cashout = async () => {
    const res = await axios.post("/api/mines/cashout", {
      userId: data,
      mineId: mineId,
    });
    fetchData();
  };
  return (
    <div className="flex w-full h-screen justify-between bg-gray-800">
      <div className="h-screen flex flex-col font-semiboldbold text-xl text-white p-5 ">
        {loading ? (
          <>loading</>
        ) : (
          <>
            <p className="">Multiplier- {res.multi}x</p>
            <p className="">Bet Amount- {res.betAmt}</p>
            <p className="">Mines Opened- {res.opened}</p>
            <button
              className={`bg-green-700 text-white px-3 rounded-xl border-2 m-2 border-green-800 ${
                disable ? "pointer-events-none bg-green-900" : ""
              }`}
              onClick={() => {
                Cashout();
              }}
              disabled={disable}
            >
              Cashout
            </button>
          </>
        )}
      </div>
      <div className="w-[65%] ">
        <div
          className={`grid grid-cols-5 gap-4 p-6 ${
            disable ? "pointer-events-none " : ""
          }`}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-full relative justify-center items-center flex h-full"
                style={{ paddingTop: "100%" }} // This ensures the div maintains a 1:1 aspect ratio (square)
              >
                <div className="absolute overflow-hidden inset-0 rounded-2xl shadow-md hover:-translate-y-1 duration-200 flex items-center justify-center">
                  <Block
                    handleEnd={handleEnd}
                    x={rowIndex + 1}
                    y={colIndex + 1}
                    id={String(mineId)}
                  />
                  {/* {cell} */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
