"use client";
import Link from "next/link";
import {  useContext, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { Kufam } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { authContext } from "@/context/AuthContext/AuthContext";
import { CiLogin } from "react-icons/ci";
const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});

export default function NavBar() {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const { token, logOut, payload } = useContext(authContext);

  function toggleNav() {
    setIsOpen((prev) => !prev);
  }
  // handle login and logout
  function handleLog() {
    if (token) {
      logOut();
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <nav
        className={`fixed whitespace-nowrap  top-0 left-0 right-0 shadow-bottom bg-white  z-40 border-b border-gray-200 ${kufam.className}`}
      >
        <div className=" flex gap-2 md:gap-2 flex-wrap md:flex-nowrap items-center justify-between p-4">
          {/* start logo */}
          <Link href="/" className="logo">
            <h1 className="sColor uppercase font-extrabold text-xl text-center text-sColor">
              burger <br /> republic
            </h1>
          </Link>
          {/* toggle nav */}
          <div className=" m-0 flex-grow md:flex-grow-0  justify-end inline-flex gap-2 self-end sm:self-auto md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* cartshopping toogle   */}
            {token && (
              <p className="relative">
                <FaCartShopping
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
                {/* <span className="absolute text-white text-[0.8rem] flex  items-end justify-center w-6 h-6 text-center -translate-y-1/2 -translate-x-1/2 top-0 left-0 bg-sColor rounded-full">
                  {true?.items.length || 0}
                </span> */}
              </p>
            )}
            {/* handle log */}
            <a className=" flex gap-3 items-center cursor-pointer">
              <button onClick={() => handleLog()}>
                {" "}
                {token ? "تسحيل الخروج" : "تسجيل الدخول "}
              </button>
              {token ? (
                <CiLogout className="text-xl" />
              ) : (
                <CiLogin className="text-xl" />
              )}
            </a>

            {/* start toggle  */}
            <div className="toogle button flex font-semibold text-xl items-center justify-center cursor-pointer md:hidden">
              <HiMiniBars3BottomLeft
                className=" text-2xl font-bold "
                onClick={toggleNav}
              />
            </div>
          </div>
          {/* start items in nav */}
          <div
            className={`items-center grow-[1] justify-center w-full md:flex md:w-auto  md:order-1 ${
              isOpen ? "h-0 overflow-hidden " : ""
            } md:h-auto `}
            id="navbar-sticky"
          >
            <ul className="flex flex-col md:p-0 md:text-[0.9rem] xl:text-xl mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-1 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  ">
              <li>
                <Link
                  href="/"
                  className={`${
                    path === "/" ? "text-sColor font-semibold" : ""
                  }text-black navLink block md:px-1 py-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  الرئيسة
                </Link>
              </li>
              <li>
                {payload?.role === "admin" && (
                  <Link
                    href="/controle"
                    className={`${
                      path === "/controle" ? "text-sColor font-semibold" : ""
                    }text-black navLink block md:px-1 py-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    لوحة التحكم
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
