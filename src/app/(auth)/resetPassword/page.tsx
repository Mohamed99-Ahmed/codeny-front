"use client";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { Kufam } from "next/font/google";
import { authContext } from "@/context/AuthContext/AuthContext";
const passReg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});
export default function Login() {
  // const navigate = useRouter();
  const {resetPassword} = useContext(authContext);
  // vlaidation by yup
  const validationSchema = yup.object({
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
  });


  // formik
  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
      token: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      resetPassword(values);
    },
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
            اعادة تعيين كلمة المرور
          </p>

          {/* token */}
          <div className="relative">
            <div className="relative z-0">
              <input
                type="text"
                id="token"
                name="token"
                value={formik.values.token}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
                placeholder=""
              />
              <label
                htmlFor="token"
                className="absolute text-lg   text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                الكود<span className="text-sColor py-4"> *</span>
              </label>
            </div>
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
                className="block py-2.5 mb-2  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sColor peer"
                placeholder=""
              />
              <label
                htmlFor="password"
                className="absolute text-lg   text-gray-500  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                كلمة المرور الجديدة<span className="text-sColor py-4"> *</span>
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
          {/* change password buttuon  */}
          <div
            className={`flex flex-col items-center md:flex-row gap-3 ${kufam.className}`}
          >
            <Button
              type="submit"
              text="تغيير كلمة المرور"
              className="grow self-stretch"
              ariaLabel="تغيير كلمة المرو"
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
