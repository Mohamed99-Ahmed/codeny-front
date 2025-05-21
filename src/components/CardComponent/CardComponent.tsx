"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button/Button";
import modelLogo from "../../public/imgs/wuzzuf-logo.png";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";

interface propsType {
  title: string;
  category: string;
  description: string;
  link: string;
  imageCover: string;
  lang?: string;
  paid?: string;
  favoritePage?: boolean;
}
export default function CardComponent({
  title,
  lang,
  paid,
  category,
  description,
  link,
  imageCover,
  favoritePage,
}: propsType) {
  const [addToFav, setAddToFav] = useState<boolean>(false);
  
  return (
    <div className="bg-white relative hover:border-sColor hover:border overflow-hidden rounded-lg shadow-md  flex flex-col  items-center gap-4 md:gap-8 w-full max-w-2xl mx-auto">
      <div className="buttons text-xl  cursor-pointer  font-semibold absolute top-4 left-4">
 {!favoritePage ? <RiHeartAdd2Fill
        onClick={() => {
          setAddToFav((prev) => !prev);
          console.log(addToFav);
        }}
        className={` hover:text-sColor 
                  ${
                    addToFav
                      ? "text-sColor font-bold text-[2rem] "
                      : "text-gray-400"
                  } `}
      />: <MdOutlineDeleteForever className="text-red-500 text-2xl font-bold" />}
      </div>
      <a
        href={link}
        target="_blank"
        className="flex-shrink-0 flex items-center justify-center"
      >
        <figure className="w-20 h-20 md:w-24 p-4 md:p-6 md:h-24 flex items-center justify-center">
          <Image
            alt="model logo"
            src={imageCover || modelLogo.src}
            className="rounded-full border border-gray-200"
            width={96}
            height={96}
            priority
          />
        </figure>
      </a>
      <main className="flex p-4 md:p-6 flex-col gap-2 items-center  text-center md:text-left w-full">
        {/* title of model */}
        <h2 className="text-xl capitalize md:text-2xl font-semibold text-gray-800">
          {title}
        </h2>
        {/* category of model */}
        <Button
          text={category}
          ariaLabel={category}
          className="px-6 py-1 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-200 shadow-none border-0 focus:ring-2 focus:ring-blue-300"
        />
        {/* languae and paid if found */}
        {paid || lang ? (
          <div className="flex gap-4 text-sColor text-opacity-80 font-semibold items-center">
            {paid && <p className=" ">{paid} </p>}
            {lang && <p className=" ">{lang}</p>}
          </div>
        ) : (
          ""
        )}
        {/* description of model */}
        <p className="text-gray-500 text-sm md:text-base mt-1 text-center">
          {description}
        </p>
      </main>
      <footer className=" self-stretch">
        <a href={link} className="bg-sColor text-center text-white py-3 rounded-b-md block w-full">
          {" "}
          الذهاب الي الرابط
        </a>
      </footer>
    </div>
  );
}
