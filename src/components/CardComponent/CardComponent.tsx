"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button/Button";
import modelLogo from "../../public/imgs/wuzzuf-logo.png";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";

interface propsType {
  title: string;
  category: string;
  description: string;
  link: string;
  imageCover: string;
  lang?: string;
  paid?: boolean;
  favoritePage?: boolean;
  imageShape?: "Rectangle" | "circle";
  id: string;
  typeModel?: string;
  hasFav?: boolean; // Indicates if the card is already favorited
  idFav?: string; // Optional prop for favorite ID, used in some contexts
}
export default function CardComponent({
  id,
  typeModel,
  hasFav,
  title,
  lang,
  paid,
  category,
  description,
  link,
  imageCover,
  favoritePage = true,
  imageShape = "circle",
  idFav,
}: propsType) {
  const [addToFav, setAddToFav] = useState<boolean | undefined>(hasFav );
  const { addToFavorites, removeFromFavorites } = useContext(favoriteContext);
  // if userFavorites is chnge rerender the component

  //  remove from favorite function
  async function removeFromFavorite() {
    setAddToFav((prev) => !prev);
    if(!idFav) return;
    await removeFromFavorites(idFav);
  }
  //  add to favorite function
  async function addToFavorite() {
    setAddToFav((prev) => !prev);
    await addToFavorites({
      typeModel,
      typeId: id,
    });
  }
  // handle function of favorite
  async function handleAddToFav() {
    if (addToFav && idFav) {
      await removeFromFavorite();
    } else {
      await addToFavorite();
    }
  }

  return (
    <div className="bg-white relative hover:border-sColor hover:border overflow-hidden rounded-lg shadow-md  flex justify-between flex-col  items-center gap-4 md:gap-8 w-full max-w-2xl mx-auto">
      <div className="buttons text-xl  cursor-pointer  font-semibold absolute top-4 left-4">
        {favoritePage ? (
          <RiHeartAdd2Fill
            onClick={() => {
              handleAddToFav();
            }}
            className={` hover:text-sColor text-[2rem]
                  ${
                    hasFav
                      ? "text-sColor font-bold text-[2.2rem] "
                      : "text-gray-400"
                  } `}
          />
        ) : (
          <MdOutlineDeleteForever
            className="text-red-500 text-2xl font-bold"
            onClick={() => {
              removeFromFavorite();
            }}
          />
        )}
      </div>
      <a
        // href={link}
        // target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center justify-center"
      >
        {" "}
        <figure
          className={`${
            imageShape !== "Rectangle"
              ? "w-40 h-40 md:w-50 p-4 md:p-6 md:h-50 flex items-center justify-center"
              : "w-full"
          }`}
        >
          <Image
            alt="model logo"
            src={imageCover?.trim() || modelLogo.src}
            className={`${
              imageShape == "Rectangle"
                ? "h-[200px] object-cover"
                : "rounded-full border border-gray-200"
            }`}
            width={imageShape === "Rectangle" ? 1920 : 100}
            height={imageShape === "Rectangle" ? 200 : 100}
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
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sColor text-center text-white py-3 rounded-b-md block w-full"
        >
          {" "}
          الذهاب الي الرابط
        </a>
      </footer>
    </div>
  );
}
