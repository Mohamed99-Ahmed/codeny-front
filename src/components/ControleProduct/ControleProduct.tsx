"use client";
import React, { useContext } from "react";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useFormik } from "formik";
import InputField from "../InputField/inputField";
import categoryType, { productType } from "@/types/category.type";
import { CateogryContext } from "@/context/CategoriesContext/Categories.context";
import relativeImg from "../../../public/imgs/relativeImg.svg";
import Image from "next/image";
interface propsType {
  product?: productType;
  category?: categoryType;
}
export default function ControleProduct({ product, category }: propsType) {
  const [isUpdate, setIsUpdate] = React.useState<boolean>(true);
  const { updateProduct, removeProduct, createProduct } =
    useContext(CateogryContext);
  const [manySize, setManySize] = React.useState<boolean>(false);
  const [imageCover, setImageCover] = React.useState<File | null>(null);
  // formik
  const formik = useFormik({
    initialValues: {
      name: `${product?.name || ""}`,
      priceSingle: typeof product?.price === "object" && product.price.single,
      priceDouble: typeof product?.price === "object" && product.price.double,
      price: typeof product?.price !== "object" && product?.price,
      description: `${product?.description || ""}`,
    },
    onSubmit: () => {
      // reshape of product to send it to the server
      const newdProduct = {
        name: formik.values.name,
        description: formik.values.description,
        price:
          typeof product?.price === "object" || manySize
            ? {
                single: Number(formik.values.priceSingle),
                double: Number(formik.values.priceDouble),
              }
            : Number(formik.values.price),
        category: category?._id,
      };
      if (product) {
        if (isUpdate) {
          if (imageCover) {
            // if the user add new product and he upload image cover
            const formData = new FormData();
            formData.append("imageCover", imageCover);
            updateProduct(product._id, newdProduct, formData);
          } else {
            updateProduct(product._id, newdProduct);
          }
        } else {
          removeProduct(product._id);
        }
      } else {
        createProduct(newdProduct);
      }
    },
  });
  if (product) {
  }
  // handle image of product
  const handleImageCover = function () {
    if (product?.imageCover) {
      return product.imageCover.startsWith("http")
        ? product.imageCover
        : `https://backend-three-nu-89.vercel.app/public/imgs/products/${product.imageCover}`;
    } else {
      return relativeImg;
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="product  bg-white p-4   rounded-md hover:border hover:border-sColor flex flex-col gap-2"
    >
      {/* photo {if product appear or not so no appear} */}
      {product && (
        <figure className="relative  group/parent overflow-hidden ">
          {!imageCover ? (
            <Image
              src={handleImageCover()}
              className="w-full object-contain h-[300px]"
              height={100}
              width={100}
              alt={product?.description || "img description"}
            ></Image>
          ) : (
            <Image
              src={URL.createObjectURL(imageCover)}
              height={100}
              width={100}
              alt="Preview"
              className="w-full object-cover h-[300px] "
            />
          )}
          <div className=" layer  absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover/parent:opacity-50 flex items-center justify-center transition-all duration-300 ease-in-out">
            <input
              type="file"
              accept="image/*"
              className="w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  setImageCover(e.target.files[0]);
                }
              }}
            ></input>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-8xl text-gray-600 font-bold">
              {" "}
              +{" "}
            </span>
          </div>
        </figure>
      )}
      {/* name of product */}
      <p className="flex items-center  gap-2">
        <label htmlFor="name">اسم المنتج :</label>
        <InputField
          id="name"
          type="tesxt"
          name="name"
          placeholder="اسم المنتج"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className=" bg-white p-0  max-w-[100px] sm:max-w-full  rounded-md text-lg font-semibold capitalize text-center"
        />
      </p>
      {/* if  add new product add this field this ask admin many of size of only one size */}
      {!product && (
        <header className="flex items-center justify-between gap-4">
          <input
            type="radio"
            name="size"
            onChange={() => {
              setManySize(false);
            }}
            id="oneSize"
            className="w-4 h-4 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
          />
          <label htmlFor="oneSize"> حجم واحد</label>
          <input
            type="radio"
            name="size"
            onChange={() => {
              setManySize(true);
            }}
            id="towSize"
            className="w-4 h-4 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
          />
          <label htmlFor="towSize"> حجمين</label>
        </header>
      )}
      {/* price */}
      <p className="flex  items-center gap-1">
        <span>السعر:</span>
        {typeof product?.price === "object" || manySize ? (
          <div dir="ltr" className="space-y-1">
            <p className="flex justify-between  items-center gap-x-1">
              <label
                className="capitalize whitespace-nowrap"
                htmlFor="priceSingle"
              >
                single :
              </label>
              <InputField
                id="priceSingle"
                type="number"
                name="priceSingle"
                placeholder="single price"
                value={formik.values.priceSingle || ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className=" grow"
              />
            </p>
            <p className="flex justify-between  items-center gap-x-1">
              <label
                className="capitalize whitespace-nowrap"
                htmlFor="priceDouble"
              >
                double :
              </label>
              <InputField
                id="priceDouble"
                type="number"
                name="priceDouble"
                placeholder="double price"
                value={formik.values.priceDouble || ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className=" "
              />
            </p>
          </div>
        ) : (
          <span className="  text-center text-sColor font-semibold  ">
            {" "}
            <InputField
              id="price"
              type="number"
              name="price"
              placeholder="price"
              value={formik.values.price || ""}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className=" grow"
            />
          </span>
        )}
      </p>

      {/* description of product */}
      <p className="flex flex-wrap items-center gap-2 ">
        <label htmlFor="description">الوصف :</label>
        <textarea
          id="description"
          name="description"
          placeholder="وصف المنتج"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className=" p-1 bg-white w-full max-w-[120px] input-change   focus:outline-sColor rounded-md grow text-wrap min-h-24 overflow-hidden "
        />
      </p>
      {/* buttons */}
      <footer className="flex justify-around gap-2 items-center pt-2 border-t-2 border-slate-500">
        {product ? (
          <>
            <Button ariaLabel="تعديل" text="تعديل" type="submit"></Button>
            <DeleteButton onClick={() => setIsUpdate(false)}>
              {" "}
              ازالة
            </DeleteButton>
          </>
        ) : (
          <Button
            text="اضافة"
            type="submit"
            // onClick={() => set}
            ariaLabel="اضافة"
          ></Button>
        )}
      </footer>
    </form>
  );
}
