"use client";
import { useFormik } from "formik";
import React, { useContext  } from "react";
import * as yup from "yup";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { Kufam } from "next/font/google";

import { authContext } from "@/context/AuthContext/AuthContext";


const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});

export default function Login() {
  const {forgetPassword} = useContext(authContext);
  
  //   run: false,
  //   url: "https://backend-three-nu-89.vercel.app/users/forgetPassword",
  //   method: "POST",
  //   toastLoading: "جاري تحميل بيناتك",
  //   toastSuccess: " تم ارسال كود الي الايميل",
  // });
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("يجب كتابة البريد الالكتروني")
      .email("البريد الالكتروني غير صحيح"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      forgetPassword(values)
    },
    validationSchema,
  });
  return (
    <section>
      <div className="container">
        <form
          onSubmit={formik.handleSubmit}
          className="relative p-4 border-sColor rounded-md flex flex-col gap-8"
        >
          <p
            className={`self-center text-sColor font-semibold text-2xl ${kufam.className}`}
          >
            ايجاد الايميل
          </p>

          {/* Email */}
          <div className="relative">
            <div className="relative z-0">
              <input
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
                placeholder=""
              />
              <label
                htmlFor="email"
                className="absolute text-lg   text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                البريد الالكتروني<span className="text-sColor py-4"> *</span>
              </label>
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="errMessage mt-2 text-red-700">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* submit or login */}
          <div
            className={`flex flex-col items-center md:flex-row gap-3 ${kufam.className}`}
          >
            <Button
              type="submit"
              text="ارسال"
              className="grow self-stretch"
              ariaLabel="ارسال كود للايميل"
            />
            <p className="text-lg">او</p>
            <Link href="/login" className={`underline hover:text-sColor`}>
              تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
