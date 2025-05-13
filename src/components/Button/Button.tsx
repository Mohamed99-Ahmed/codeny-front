import React, {  ReactNode } from "react";
interface props {
  text: ReactNode;
  className?: string;
  ariaLabel: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  type?: "button" | "submit" | "reset"; 
}
export default function Button({type, text, className, ariaLabel, onClick }: props) {
  return (
    <button
      className={`capitalize px-4  text-xl text-slate-200  py-2 rounded-full bg-sColor text-center ${className}`}
      aria-label={ariaLabel}
        onClick= {onClick}
        type={type}
    >
      {text}
    </button>
  );
}
