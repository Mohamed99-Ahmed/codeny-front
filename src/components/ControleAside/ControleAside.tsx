"use client";
import React, { useState } from "react";
import { HiOutlineBars2 } from "react-icons/hi2";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ControleAside() {
  const path = usePathname();
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  return (
    <div className="fixed z-30 top-[130px]  lg:mt-16 lg:text-xl bg-mColor lg:top-0 left-0 right-0 lg:left-auto  lg:border-r-4 lg:border-r-slate-500">
      <div className="container pt-4">
        {/* start toggle NavBar */}
        <div
          className="toggle lg:hidden text-4xl cursor-pointer text-slate-900"
          onClick={() => setOpenToggle(!openToggle)}
        >
          {!openToggle ? <HiOutlineBars2 /> : <VscChromeClose />}
        </div>
        {/* start navBar list */}
        <nav>
          <ul
            className={`hidden${
              openToggle ? "block" : ""
            } lg:block py-2 rounded-md divide-y divide-slate-500 border-slate-500 border-2  mt-4 lg:m-0 shadow-md lg:rounded-0 lg:border-0`}
          >
            <li>
              <Link
                href="/controle"
                className={`${
                  path === "/controle" ? "text-sColor font-semibold" : ""
                }text-black navLink block md:px-1 p-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                onClick={() => setOpenToggle(!openToggle)}
              >
                المنتجات
              </Link>
            </li>
            <li>
              <Link
                href="/controle/orders"
                className={`${
                  path === "/controle/orders" ? "text-sColor font-semibold" : ""
                }text-black navLink block md:px-1 p-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                onClick={() => setOpenToggle(!openToggle)}
              >
                الاوردرت
              </Link>
            </li>
            <li>
              <Link
                href="/controle/stores"
                className={`${
                  path === "/controle/stores" ? "text-sColor font-semibold" : ""
                }text-black navLink block md:px-1 p-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                onClick={() => setOpenToggle(!openToggle)}
              >
                الفروع
              </Link>
            </li>
            <li>
              <Link
                href="/controle/users"
                className={`${
                  path === "/controle/users" ? "text-sColor font-semibold" : ""
                }text-black navLink block md:px-1 p-2 lg:px-3 rounded md:bg-transparent hover:text-sColor `}
                onClick={() => setOpenToggle(!openToggle)}
              >
                المستخدمين
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
