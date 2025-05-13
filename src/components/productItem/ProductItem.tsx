"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";

import Button from "../Button/Button";
import { productType } from "../../types/category.type";
import { BiDish } from "react-icons/bi";
import { CartContex } from "@/context/cartContext/cartContext";
import SizeAndCoice from "../SizeAndChoice/SizeAndCoice";
import { authContext } from "@/context/AuthContext/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import imageDefault from "../../../public/imgs/relativeImg.svg";
// const relativeImg = require("../../../public/imgs/relativeImg.svg");
type propsType = {
  product: productType;
};
export default function ProductItem({ product }: propsType) {
  const { addProductToCart } = useContext(CartContex);
  const { token } = useContext(authContext);
  const [addToCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [size, setSize] = useState<string>("");
  const [choice, setChoice] = useState<string>("");
  const router = useRouter();

  // Add this new function to handle adding to cart
  function handleAddToCart(check: string) {
    let newQuantity;
    if (check === "incr") {
      newQuantity = quantity + 1;
    } else if (check === "decr") {
      newQuantity = quantity - 1;
    }
    if (newQuantity && product) {
      setQuantity(newQuantity);
      if (typeof product.price === "object") {
        addProductToCart({
          productId: product._id,
          size,
          choice,
          quantity: newQuantity,
        });
        return;
      }else{addProductToCart({
        productId: product._id,
        choice,
        quantity: newQuantity,
      });}
    }
  }
  const handleImageCover = function () {
    if (product.imageCover) {
      return product.imageCover.startsWith("http")
        ? product.imageCover
        : `https://backend-three-nu-89.vercel.app/public/imgs/products/${product.imageCover}`;
    } else {
      return imageDefault.src;
    }
  };
  return (
    product && (
      <>
        <figure className="flex flex-col justify-between relative overflow-hidden  group/parent hover:shadow-md items-center gap-4 p-4 bg-white rounded-md hover:border hover:border-sColor">
          {product.imageCover ? (
            <Image
              alt="name of product"
              src={handleImageCover()}
              className="w-full h-[300px] rounded-md object-contain"
              width={100}
              height={300}
            />
          ) : (
            <div className="w-full h-[300px] rounded-md object-contain flex items-center justify-center">
              <BiDish className="font-bold text-gray-600 text-[100px]" />
            </div>
          )}
          <h3 className="text-xl font-[500] text-center capitalize">
            {product.name}
          </h3>
          {typeof product.price === "object" ? (
            <div dir="ltr" className="space-y-2">
              <p className="flex justify-between gap-4">
                <span className="capitalize">single : </span>
                <span className="price text-sColor font-bold ">
                  {product.price.single} Egy
                </span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="capitalize">double : </span>
                <span className="price text-sColor font-bold ">
                  {product.price.double} Egy
                </span>
              </p>
            </div>
          ) : (
            <p className="price text-sColor font-bold ">{product.price} Egy</p>
          )}
          {/* size and choice */}
          <div dir="ltr">
            {typeof product.price === "object" ? (
              <SizeAndCoice
                setSize={setSize}
                setChoice={setChoice}
                size={size}
                choice={choice}
                productId={product._id}
              />
            ) : (
              <SizeAndCoice
                oneSize={true}
                setSize={setSize}
                setChoice={setChoice}
                size={size}
                choice={choice}
                productId={product._id}
              />
            )}
          </div>

          {quantity ? (
            <div className="flex self-stretch rounded-md border border-gray-300 overflow-hidden">
              <button
                aria-label="decreament "
                className="bg-gray-300 px-4 py-2 "
                onClick={() => {
                  handleAddToCart("decr");
                }}
              >
                {" "}
                -{" "}
              </button>
              <span className="number-product grow flex items-center justify-center font-bold">
                {quantity}
              </span>
              <button
                aria-label="increament  "
                className="bg-sColor text-whitep-2 px-4 py-2 "
                onClick={() => {
                  handleAddToCart("incr");
                }}
              >
                {" "}
                +{" "}
              </button>
            </div>
          ) : (
            <>
              <Button
                text={" اضافتة الي العربة"}
                ariaLabel="اضافة الي العربة"
                className={` w-full cursor-pointer    ${
                  addToCart && "bg-gray-600 "
                } `}
                onClick={() => {
                  if (token) {
                    if(typeof product.price === "object"){
                      if (size && choice) {
                        handleAddToCart("incr");
                      } else {
                        toast.error("من فضلك اختار الحجم و الاختيار");
                      }
                    }else{
                      if (choice) {
                        handleAddToCart("incr");
                      } else {
                        toast.error("من فضلك اختار الحجم ");
                      }
                    }
                 
                  } else {
                    router.push("/login");
                  }
                }}
              />
            </>
          )}
        </figure>
      </>
    )
  );
}
