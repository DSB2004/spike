"use client"

import {
  InputHTMLAttributes, forwardRef, ReactNode, useState
} from "react";

interface IPROPS extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
import { FaEye } from "react-icons/fa";
const Input = forwardRef<HTMLInputElement, IPROPS>(({ className, error, type, ...props }, ref) => {
  const [newType, changeType] = useState(type)
  return (
    <div className="relative w-full pb-3 flex gap-2 items-center">
      <input
        autoComplete="off"
        spellCheck="false"
        ref={ref}
        type={newType}
        className={`p-2 bg-transparent border-b-2 border-gray-800 outline-none focus:outline-none text-xs w-full transition-all duration-200 ${className}focus:border-white hover:border-white`}
        {...props}
      />


      <p className="absolute -bottom-2 right-0 text-red-500" style={{ fontSize: ".7rem" }}>{error}</p>

      {type === 'password' ? <>
        < FaEye className={`fill-white transition-all duration-100 h-4 w-4 absolute right-2 top-2 ${newType === 'password' ? "opacity-65" : "opacity-35"}`}
          onClick={() => changeType((prev) => (prev === 'password' ? 'text' : 'password'))}
        />
      </> : <></>
      }
    </div>
  )
});


Input.displayName = "Input";
export default Input;