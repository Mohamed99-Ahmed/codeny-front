"use client";
import Button from "@/components/Button/Button";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import InputField from "@/components/InputField/inputField";
import { useFormik } from "formik";
import { storeType } from "@/types/store.type";
import React, { useContext } from "react";
import { storesContext } from "@/context/Stores/StoresContext";
import * as yup from "yup";
type typePorps = {
  store?: storeType;
};
export default function ContoleLocation({ store }: typePorps) {
  const { updateStore, createStore, deleteStore } = useContext(storesContext);
  const [isChanged, setIsChanged] = React.useState(true);
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("اسم الفرع مطلوب")
      .min(3, "اسم الفرع يجب ان يكون 3 حروف على الاقل")
      .max(100, "اسم الفرع يجب ان يكون 100 حرف على الاكثر"),
    description: yup.string().required("العنوان مطلوب"),
    link: yup
      .string()
      .url("رابط الموقع غير صحيح")
      .required("رابط الموقع مطلوب"),
  });
  const formik = useFormik({
    initialValues: {
      name: store ? store.name : "",
      description: store ? store.description : "",
      link: store ? store.link : "",
    },
    validationSchema,
    onSubmit: () => {
      if (store) {
        if (isChanged) {
          updateStore(store._id, formik.values);
        } else {
          deleteStore(store._id);
        }
      } else {
        createStore(formik.values);
      }
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="p-4 bg-white rounded-md gap-5 hover:border shadow-sm flex flex-wrap justify-between items-center  hover:border-sColor"
      >
        <main className="flex flex-col  gap-1">
          <label htmlFor="name"></label>
          <div className="flex gap-1 items-center">
            {!store && (
              <label htmlFor="location" className="whitespace-nowrap">
                اسم الفرع :{" "}
              </label>
            )}
            <InputField
              id="name"
              type="text"
              name="name"
              placeholder="حدائق القبة"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="text-2xl font-bold text-gray-700 w-full"
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-sColor">{formik.errors.name}</p>
          )}
          <div className="flex gap-1 items-center">
            {!store && (
              <label htmlFor="location" className="whitespace-nowrap">
                {" "}
                العنوان:{" "}
              </label>
            )}
            <textarea
              id="discription"
              name="description"
              placeholder="١٥١ مصر والسودان، حدائق القبة، امام صيدلية العزبي"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className=" text--sm text-gray-600 p-1 bg-white focus:outline-sColor rounded-md grow text-wrap min-h-18 overflow-hidden "
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sColor">{formik.errors.description}</p>
            )}
          </div>

          <div className="flex gap-1 items-center">
            <label htmlFor="link">الموقع</label>
            <textarea
              name="link"
              placeholder="https://maps.app.goo.gl/ZeDXqLLFLBRQZ5q18"
              value={formik.values.link}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className=" text-sm text-center  p-1 text-sColor bg-white focus:outline-sColor rounded-md grow text-wrap min-h-18 overflow-hidden "
            />
            {formik.touched.link && formik.errors.link && (
              <p className="text-sColor">{formik.errors.link}</p>
            )}
          </div>
        </main>
        <footer className="flex gap-2">
          {store ? (
            <>
              <Button type="submit" text="تعديل" ariaLabel="تعديل"></Button>
              <DeleteButton
                onClick={() => {
                  setIsChanged(false);
                }}
                type="submit"
              >
                ازالة
              </DeleteButton>
            </>
          ) : (
            <Button
              text="اضافة"
              type="submit"
              ariaLabel="اضافة"
            ></Button>
          )}
        </footer>
      </form>
    </>
  );
}
