import React from 'react'
import { FaShoppingBasket } from "react-icons/fa";
interface propsType  {
 children: string,
 className?:  string,
 type?: "button" | "submit" | "reset"; 
 onClick?:  (() => Promise<void>) | (() => void) ;
}
export default function DeleteButton({children,className,onClick,type} : propsType) {
  return (
               <button
                  onClick={onClick}
                  className={` flex  items-center gap-2 underline  text-red-900  text-lg whitespace-nowrap ${className}`}
                  dir="ltr"
                  type={type}
                >
                  <span> {children} </span>
                  <FaShoppingBasket className=" font-semibold underline" />
                </button>
  )
}
