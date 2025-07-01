"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { Fustat } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { authContext } from "@/api/AuthContext/AuthContext";
import { CiLogin } from "react-icons/ci";
import { ImHeartBroken } from "react-icons/im";
import UserBox from "../UserBox/UserBox";
import human from "../../public/imgs/human.png";
import AsideFilteration from "../AsideFilteration/AsideFilteration";
const FustatFont = Fustat({
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
        className={`fixed   whitespace-nowrap  top-0 left-0 right-0 shadow-bottom bg-white  z-40 border-b border-gray-200`}
      >
        {/* start user box */}
        <UserBox
          name="mohamed"
          photo={human.src}
          headLine="frontend developer"
        />
        {/* start filteration */}
        <AsideFilteration />
        {/* content of nav */}
        <div className=" flex gap-2 flex-wrap md:gap-2  items-center justify-between p-4">
          {/* start logo */}
          <Link href="/" className="logo">
            <h1
              className={`sColor text-3xl font-bold    uppercase text-center text-sColor  ${FustatFont.className}`}
            >
              كودني
            </h1>
          </Link>
          {/* toggle nav */}
          <div className=" m-0  flex-grow md:flex-grow-0  justify-end mr-auto inline-flex gap-2 sm:self-auto md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* cartshopping toogle   */}
            {/* {token && ( */}
            <p className="relative">
              <ImHeartBroken
                className={`text-2xl cursor-pointer hover:text-sColor ${
                  path === "/favorites" ? "text-sColor" : "text-gray-400"
                }`}
                onClick={() => {
                  router.push("/favorites");
                }}
              />
              {/* <span className="absolute text-white text-[0.8rem] flex  items-end justify-center w-6 h-6 text-center -translate-y-1/2 -translate-x-1/2 top-0 left-0 bg-sColor rounded-full">
                  {true?.items.length || 0}
                </span> */}
            </p>
            {/* )} */}
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
            <div className="toogle button flex font-semibold text-xl items-center flex-wrap justify-center cursor-pointer md:hidden">
              <HiMiniBars3BottomLeft
                className=" text-2xl font-bold "
                onClick={toggleNav}
              />
            </div>
          </div>
          {/* start items in nav */}
          <div
            className={`items-center grow-[1] justify-center w-full  md:flex md:w-auto  md:order-1 ${
              isOpen ? "h-0 overflow-hidden " : ""
            } md:h-auto `}
            id="navbar-sticky"
          >
            <ul className="flex flex-col md:p-0 md:text-[0.9rem]  mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-1 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  ">
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
                <Link
                  href="/websites"
                  className={`${
                    path === "/websites" ? "text-sColor font-semibold" : ""
                  }text-black navLink block md:px-1 py-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  مواقع التوظيف
                </Link>
              </li>

              <li>
                <Link
                  href="/groups"
                  className={`${
                    path === "/groups" ? "text-sColor font-semibold" : ""
                  }text-black navLink block md:px-1 py-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  جروبات التوظيف
                </Link>
              </li>
              <li>
                <Link
                  href="/helperTools"
                  className={`${
                    path === "/helperTools" ? "text-sColor font-semibold" : ""
                  }text-black navLink block md:px-1 py-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  ادوات المبرمجين
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className={`${
                    path === "/courses" ? "text-sColor font-semibold" : ""
                  }text-black navLink block md:px-1 py-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  كورسات
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
