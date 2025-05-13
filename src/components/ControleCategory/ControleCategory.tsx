"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Kufam } from "next/font/google";
import ControleProduct from "../ControleProduct/ControleProduct";
import { useFormik } from "formik";
import categoryType, { productType } from "@/types/category.type";
import { CateogryContext } from "@/context/CategoriesContext/Categories.context";
import * as yup from "yup";
import AddSquare from "../AddSquare/AddSquare";
const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});
export default function ControleCategory({
  category,
}: {
  category: categoryType;
}) {
  const { updateCategory, removeCategory } = useContext(CateogryContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [appearNew, setAppearNew] = useState<boolean>(false);
  // when change in category close the add new product
  useEffect(() => {
    setAppearNew(false);
  }, [category]);
  const validationSchema = yup.object({
    categorName: yup
      .string()
      .required("اسم الفئة مطلوب")
      .min(3, "اسم الفئة يجب ان يكون اكثر من حرفين")
      .max(100, "اسم الفئة يجب ان يكون اقل من 100 حرف"),
  });
  // formik
  const formik = useFormik({
    initialValues: {
      categorName: `${category.categoryName || "categoryName"} `,
    },
    validationSchema,
    onSubmit: async () => {
      if (isUpdate) {
        updateCategory(category._id, formik.values.categorName);
      } else {
        removeCategory(category._id);
      }
    },
  });

  return (
    <>
      <div className="p-2 border-sColor border-opacity-60  border rounded-md space-y-4">
        {/* category with its products */}
        <form
          className="flex gap-2 justify-between items-center "
          onSubmit={formik.handleSubmit}
        >
          <input
            className={`${kufam.className} w-full   text-xl focus:outline-sColor font-bold text-gray-800 uppercase p-2 rounded-r-xl box-border`}
            type="text"
            name="categorName"
            value={formik.values.categorName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="flex items-center gap-4">
            <Button ariaLabel="تعديل" text="تعديل" className="p-2"></Button>
            <DeleteButton onClick={() => setIsUpdate(false)}>
              ازالة
            </DeleteButton>
          </div>
        </form>
        {formik.errors.categorName && formik.touched.categorName && (
          <p className="text-red-500 font-semibold">
            {formik.errors.categorName}
          </p>
        )}
        {/* create new product */}
        <div className="flex gap-4 flex-col border-sColor border p-2 ">
          <AddSquare
            className="w-12 h-12"
            onClick={() => setAppearNew(!appearNew)}
          >
            +
          </AddSquare>

          {appearNew && <ControleProduct category={category} />}
        </div>
        {/* prducts */}
        <div className="grid gap-4  md:grid-cols-2 ">
          {category &&
            category.products
              ?.map((product: productType) => (
                <ControleProduct
                  product={product}
                  category={category}
                  key={product._id}
                />
              ))
              .reverse()}
        </div>
      </div>
    </>
  );
}
