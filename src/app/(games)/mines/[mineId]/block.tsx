import axios from "axios";
import React, { useState } from "react";
type HandleEndFunction = (gameEnd: boolean) => void;
const Block = ({
  x,
  y,
  id,
  handleEnd,
}: {
  x: number;
  y: number;
  id: string;
  handleEnd: HandleEndFunction;
}) => {
  const select = async () => {
    const res = await axios.post("/api/mines/select", { id, x, y });
    console.log(res.data);
    setBomb(res.data.bomb);
    setOpened(true);

    handleEnd(res.data.gameEnd);
  };
  const [bomb, setBomb] = useState(false);
  const [opened, setOpened] = useState(false);
  return (
    <div className="w-full h-full justify-center items-center">
      {opened ? (
        <div className=" flex w-full h-full justify-center items-center">
          {bomb ? <Bomb /> : <Diamond />}
        </div>
      ) : (
        <div
          className="bg-gray-700 w-full h-full"
          onClick={() => {
            select();
          }}
        >
          {/* <Diamond /> */}
          {/* <Bomb /> */}
        </div>
      )}
    </div>
  );
};
const Diamond = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
      <defs>
        <style>
          {`.cls-1{fill:#051d27;}
          .cls-2{fill:#06e403;}
          .cls-3{fill:#05a902;}
          .cls-4{fill:#01e501;}
          .cls-5{fill:#00d503;}
          .cls-6{fill:#09fd02;}
          .cls-7{fill:#019902;}
          .cls-8{fill:#01e300;}
          .cls-9{fill:#57fd7f;}
          .cls-10{fill:#03be02;}`}
        </style>
      </defs>
      <g id="Layer_1" data-name="Layer 1">
        <path
          className="cls-1"
          d="M38,70h0a2.75,2.75,0,0,1-2-.92L.7,29.62a2.76,2.76,0,0,1-.31-3.25L11,8.55a2.76,2.76,0,0,1,1.27-1.12L23.12,2.71a2.77,2.77,0,0,1,.62-.19L37.74,0a3.09,3.09,0,0,1,1,0L52.62,2.52a3.38,3.38,0,0,1,.62.18L64.42,7.58l.13,0h0a2.69,2.69,0,0,1,.65.45h0a3,3,0,0,1,.4.47h0l.09.14L76.23,26.6a2.73,2.73,0,0,1-.34,3.25L40.06,69.1A2.76,2.76,0,0,1,38,70Z"
        />
        <path
          className="cls-2"
          d="M22.13,18.75c-2.64,7-1.74,13.65,2.09,20,6.74-3.1,11.83-8.4,14.44-17C33,18.93,27.49,17.74,22.13,18.75Z"
        />
        <path
          className="cls-3"
          d="M73.86,28,63.33,10.1c-6.26,1.19-8.79,4.41-9,8.91C58.67,25.3,65.39,28,73.86,28Z"
        />
        <path
          className="cls-4"
          d="M38.49,21.94c.15,7.77,4.2,13.31,12.19,16.57l.07,0c4.5-5.59,5.9-12,3.62-19.47C48.26,16.08,42.9,16.72,38.49,21.94Z"
        />
        <path
          className="cls-5"
          d="M24.22,38.76q13.19,6.43,26.46-.25L38.49,21.94Z"
        />
        <path
          className="cls-6"
          d="M24.22,38.76c1,9.17,6.29,18.72,13.81,28.49,7.4-9,12.5-18.4,12.72-28.77Z"
        />
        <path
          className="cls-7"
          d="M50.75,38.48,38,67.25,73.86,28C64.47,28.32,56.19,30.75,50.75,38.48Z"
        />
        <path
          className="cls-8"
          d="M2.75,27.79,38,67.25,24.22,38.76C20.11,31,11.89,28.8,2.75,27.79Z"
        />
        <path
          className="cls-9"
          d="M13.39,10,2.75,27.79c9.33,1.22,16.19-1.21,19.54-8.88C24.57,13.79,21.22,11,13.39,10Z"
        />
        <polygon
          className="cls-6"
          points="2.75 27.79 24.22 38.76 22.29 18.91 2.75 27.79"
        />
        <polygon
          className="cls-6"
          points="52.14 5.23 38.22 2.75 24.22 5.23 13.39 9.96 22.29 18.91 38.49 21.94 54.37 19.01 63.33 10.1 52.14 5.23"
        />
        <polygon
          className="cls-10"
          points="50.74 38.48 73.86 27.99 54.37 19.01 50.74 38.48"
        />
        <polygon
          className="cls-9"
          points="13.89 10.83 24.37 5.43 38.22 2.75 24.22 5.23 13.39 9.96 13.89 10.83"
        />
        <polygon
          className="cls-9"
          points="22.29 18.91 24.22 38.76 21.1 19.05 22.29 18.91"
        />
        <polygon
          className="cls-9"
          points="22.29 18.91 38.49 21.94 38.03 22.48 22.29 18.91"
        />
        <polygon
          className="cls-9"
          points="63.33 10.1 53 19.28 54.37 19.01 63.33 10.1"
        />
      </g>
    </svg>
  );
};
const Bomb = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 75 75"
      // className="w-8 h-8"
    >
      <title>bomb</title>
      <path
        d="M35,70a35.47,35.47,0,0,1-8.45-1A35,35,0,1,1,49.83,3.3c3.53-2.25,8.75-.54,12.39,4.16.15.19.3.39.44.59a11.89,11.89,0,0,1,3.61,2.31,10.6,10.6,0,0,1,3.27,7.91A9,9,0,0,1,68,23.44a32.32,32.32,0,0,1,1.14,4h0A35,35,0,0,1,35,70ZM35,6.47A28.57,28.57,0,1,0,62.85,28.84h0A27.53,27.53,0,0,0,61.34,24a3.17,3.17,0,0,1-.16-2,3.2,3.2,0,0,1-1.49-1.33c-.29-.5-.6-1-.92-1.48a3.23,3.23,0,0,1-.11-3.39.92.92,0,0,0,.06-.29,3.33,3.33,0,0,1,.77-1.79,3.16,3.16,0,0,1-1.73-1.4,11.43,11.43,0,0,0-.65-.95c-1.59-2-3.35-2.68-3.87-2.62A1.81,1.81,0,0,1,53,9l-1.37.79a3.22,3.22,0,0,1-3.14.06A28.47,28.47,0,0,0,35,6.47Z"
        style={{ fill: "#051d27" }}
      />
      <path
        d="M66.76,35A31.62,31.62,0,0,0,66,28.14c-2.45-.61-13.43-3.53-16.07-3.53-17.55,0-28.75,14.48-28.75,32,0,2.35,5.65,7,6.14,9.19A31.8,31.8,0,0,0,66.76,35Z"
        style={{ fill: "#d8003e" }}
      />
      <path
        d="M58.34,27.2a31.72,31.72,0,0,1,7.67.94A31.76,31.76,0,1,0,27.33,65.83a31.77,31.77,0,0,1,31-38.63Z"
        style={{ fill: "#fd013e" }}
      />
      <path
        d="M51.33,6.19,45.71,9.44c-2.24,1.74-1.7,6.17,1.19,9.9S54,24.69,56.19,23l4.55-4.64Z"
        style={{ fill: "#d8003e" }}
      />
      <ellipse
        cx="56.03"
        cy="12.26"
        rx="4.6"
        ry="7.67"
        transform="translate(4.24 36.9) rotate(-37.78)"
        style={{ fill: "#fd013e" }}
      />
      {/* Add remaining paths */}
    </svg>
  );
};
export default Block;
