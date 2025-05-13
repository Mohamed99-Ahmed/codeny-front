import React, { ReactNode } from "react";
import { FaStar } from "react-icons/fa";
import { Kufam } from "next/font/google";
const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});
interface props {
  titleWord: ReactNode;
  className : string
}
export default function Title({ titleWord,className }: props) {
  return (
    <>
      <div className="container flex itmes-center gap-4 justify-center overflow-hidden">
        <div className="before flex gap-2 items-center">
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
        </div>
        <h1
          className={`${kufam.className} text-3xl font-bold text-gray-800 uppercase ${className}`}
        >
          {titleWord}
        </h1>
        <div className="before flex gap-2 items-center">
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
          <FaStar className="text-gray-600" />
        </div>
      </div>
    </>
  );
}
