"use client";
import React, { useContext, useEffect, useState } from "react";
import ControleCategory from "@/components/ControleCategory/ControleCategory";
import { CateogryContext } from "@/context/CategoriesContext/Categories.context";
import { Kufam } from "next/font/google";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import AddSquare from "@/components/AddSquare/AddSquare";

const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});
export default function ControleProducts() {
  const { categories, getAllCategories, createCategory } =
    useContext(CateogryContext);
  const [appearNew, setAppearNew] = useState<boolean>(false);
  useEffect(() => {
    getAllCategories();
  }, []);
  // rerender of component when categories change
  useEffect(() => {}, [categories]);
  // create category function
  const validationSchema = yup.object({
    categoryName: yup
      .string()
      .required("اسم الفئة مطلوب")
      .min(3, "اسم الفئة يجب ان يكون اكثر من حرفين")
      .max(100, "اسم الفئة يجب ان يكون اقل من 100 حرف"),
  });
  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema,
    onSubmit: () => {
      createCategory(formik.values.categoryName);
      setAppearNew(false);
      formik.resetForm();
    },
  });
  return (
    <div className="container space-y-5">
      {/* add new category */}
      <AddSquare onClick={() => setAppearNew(!appearNew)}>+</AddSquare>
      {appearNew && (
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex gap-2 justify-between items-center "
          >
            <input
              className={`${kufam.className} w-full   text-xl focus:outline-sColor font-bold text-gray-800 uppercase p-2 rounded-r-xl box-border`}
              name="categoryName"
              value={formik.values.categoryName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              placeholder="اسم الفئة"
            />
            <Button
              ariaLabel="اضافة الفئة"
              text="اضافة الفئة"
              className="whitespace-nowrap"
            ></Button>
          </form>
          {formik.errors.categoryName && formik.touched.categoryName && (
            <p className="text-red-500 font-semibold">
              {formik.errors.categoryName}
            </p>
          )}
        </div>
      )}
      {/* category with its products */}
      {categories &&
        categories
          .map((category) => {
            return <ControleCategory category={category} key={category.id} />;
          }).reverse()
          }
    </div>
  );
}
