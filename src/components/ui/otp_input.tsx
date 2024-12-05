import React, { InputHTMLAttributes, forwardRef } from "react";

const OtpInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, onKeyDown, onInput, ...props }, ref) => {

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            // e.preventDefault()
            if (e.key === "Backspace") {
                e.currentTarget.value = '';
                if (e.currentTarget?.previousElementSibling) {
                    (e.currentTarget?.previousElementSibling as HTMLElement).focus();
                }
            }
            else {
                if ((/^[0-9]+$/.test(e.currentTarget.value))) {
                    if (e.currentTarget.value.length === 1 && e.currentTarget?.nextElementSibling) {
                        (e.currentTarget?.nextElementSibling as HTMLElement).focus();
                    }
                }
                else { e.currentTarget.value = "" }
            }

        };

        return (
            <>
                <input
                    ref={ref}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                    type="text"
                    maxLength={1}
                    className={`w-12 h-12 text-center bg-transparent outline-none border-2 border-white border-opacity-40 rounded-sm transition-opacity duration-200 caret-transparent focus:border-opacity-100 ${className}`}
                    {...props}
                />


            </>
        );
    }
);

OtpInput.displayName = "OtpInput";

export default OtpInput;
