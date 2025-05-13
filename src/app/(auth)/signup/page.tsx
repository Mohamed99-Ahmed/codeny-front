"use client";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { FaPhoneAlt } from "react-icons/fa";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { Kufam } from "next/font/google";
import { submitType } from "../../../types/auth";;
import { authContext } from "@/context/AuthContext/AuthContext";

const phoneReg = /^(2)01[0125][0-9]{8}$/gm;
const passReg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});

export default function SignUp() {
  const {signUp} = useContext(authContext);
  //   run: false,
  //   url: "https://backend-three-nu-89.vercel.app/users/signup",
  //   method: "POST",
  //   toastLoading: "جاري انشاء الحساب",
  //   toastSuccess: "مبروك تم انشاء حسابك",
  // });
  // submit funciton
  async function submitFunc(values: submitType) {

    signUp(values)
    
  }
  // validate by Yup
  const validate = yup.object({
    name: yup
      .string()
      .required("يجب عليك كتابة اسمك ")
      .min(3, "يجب ان يكون الاسم 3 احرف او اكثر ")
      .max(15, " اقصي عدد احرف 15 حرف"),
    email: yup
      .string()
      .required("يجب كتابة البريد الالكتروني")
      .email("البريد الالكتروني غير صحيح"),
    phone: yup
      .string()
      .required("يجب عليك كتابة رقم المحمول")
      .matches(phoneReg, "رقم التليفون يجب ان يكون رقم مصري يبدا ب 20"),
    password: yup
      .string()
      .required("يجب كتابة كلمة المرور")
      .matches(
        passReg,
        "يجب أن تحتوي كلمة المرور على حرف كبير وصغير ورقم ورمز خاص على الأقل، وأن تكون 8 أحرف أو أكثر"
      ),
    rePassword: yup
      .string()
      .required("يجب كتابة اعادة كلمة المرور ")
      .oneOf(
        [yup.ref("password")],
        "كلمة المرور غير متطابقة مع اعادة كلمة المرور"
      ),
    location: yup
      .string()
      .required("يجب كتابة موقعك الجغرافي لمعرفة توصيل الاوردو اليك"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "2",
      password: "",
      rePassword: "",
      location: "",
    },
    onSubmit: submitFunc,
    validationSchema: validate,
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
            انشاء حساب
          </p>
          {/* Name */}
          <div className="relative">
            <div className="relative z-0">
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
                placeholder=""
              />
              <label
                htmlFor="name"
                className="absolute text-lg   text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                الاسم بالكامل <span className="text-sColor py-4"> *</span>
              </label>
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="errMessage mt-2 text-red-700">
                {formik.errors.name}
              </p>
            )}
          </div>
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
          {/* Password */}
          <div className="relative">
            <div className="relative z-0">
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
                placeholder=""
              />
              <label
                htmlFor="password"
                className="absolute text-lg   text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                كلمة المرو<span className="text-sColor py-4"> *</span>
              </label>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="errMessage mt-2 text-red-700">
                {formik.errors.password}
              </p>
            )}
          </div>
          {/* rePassword */}
          <div className="relative">
            <div className="relative z-0">
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
                placeholder=""
              />
              <label
                htmlFor="rePassword"
                className="absolute text-lg   text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                اعادة كلمة المرو<span className="text-sColor py-4"> *</span>
              </label>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="errMessage mt-2 text-red-700">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
          {/* phone */}
          <div className="relative">
            <FaPhoneAlt className="absolute start-0 top-2 text-gray-500" />
            <input
              type="string"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              رقم المحمول
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <p className="errMessage mt-2 text-red-700">
                {formik.errors.phone}
              </p>
            )}
          </div>
          {/* location */}
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium  text-gray-500"
            >
              عنوانك (الموقع الجغرافي){" "}
              <span className="text-sColor py-4"> *</span>
            </label>
            <textarea
              id="location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block max-h-24 min-h-4  p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
        focus:ring-sColor focus:border-sColor "
              placeholder="اكتب موقعك هنا"
            ></textarea>
            {formik.errors.location && formik.touched.location && (
              <p className="errMessage mt-2 text-red-700">
                {formik.errors.location}
              </p>
            )}
          </div>
          {/* submit or login */}
          <div
            className={`flex flex-col items-center md:flex-row gap-6 ${kufam.className}`}
          >
            <Button
              type="submit"
              text="انشاء حساب"
              className="grow self-stretch"
              ariaLabel="انشاء حساب"
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
