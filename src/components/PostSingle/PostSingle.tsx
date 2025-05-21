"use client";
import Image from "next/image";
import React, { useState } from "react";
import human from "../../public/imgs/human.png";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";

interface propsType {
    favoritePage?: boolean
}
export default function PostSingle({favoritePage}: propsType) {
  const [addToFav, setAddToFav] = useState<boolean>(false);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden  my-4 relative">
      {/* Post Category */}
      <h2 className="text-xs absolute left-0 top-0 px-6 font-semibold text-sColor rounded-bl-none bg-blue-100 py-1 rounded">
        Tech
      </h2>
      {/* Top bar: author and date */}
      <header className="flex items-center justify-between p-4 border-b py-5">
        <div className="flex items-center space-x-2">
          {/* Author image */}
          <Image
            src={human.src}
            alt="Author"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          {/* Author name */}
          <span className="text-sm font-medium text-gray-700">John Doe</span>
        </div>
        {/* crated At */}
        <p className="text-sm text-gray-500 ">
          <time dateTime="2023-10-01">October 1, 2023</time>
        </p>
      </header>

      {/* Post Title */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">
          Post Title Goes Here
        </h2>
      </div>

      {/* Main Image */}
      <figure className="w-full h-56 bg-gray-200">
        <Image
          src="/path/to/post-image.jpg"
          alt="Post Cover"
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Post Content */}
      <footer className="p-4 flex flex-col gap-4 items-center">
        <p className="text-gray-700 text-base text-center">
          This is the post content or description. It will show a summary or the
          main body of the post here.
        </p>
    <div className=" cursor-pointer font-semibold text-[2rem] self-end ">

     {!favoritePage ? <RiHeartAdd2Fill
          onClick={() => {
            setAddToFav((prev) => !prev)
           console.log(addToFav)
          }
          }
          className={` hover:text-sColor  
            ${
              addToFav ? "text-sColor font-bold text-[2rem] " :"text-gray-400"
            }`}
        />: <MdOutlineDeleteForever className="text-red-500 text-2xl font-bold" />}
    </div>
      </footer>
    </div>
  );
}
