import React from 'react'
type propsType = {
  children: React.ReactNode,
    onClick?: () => void,
    className?: string
    };
export default function AddSquare({children,onClick,className}:propsType) {
  return (
    <button
    onClick={onClick}
    className={`bg-white flex items-center justify-center text-gray-800 font-semibold rounded-md h-24  w-24 text-4xl ${className}`}>
        {children}
    </button>
  )
}
