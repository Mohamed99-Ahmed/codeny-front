"use client"
import ControleAside from "@/components/ControleAside/ControleAside";
import { authContext } from "@/context/AuthContext/AuthContext";
import React, { useContext } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {payload} = useContext(authContext);
  return (
  <main className="relative min-h-screen">
      {  payload?.role === "admin" &&
        <><ControleAside></ControleAside>
      <div className="  pt-20 lg:pt-12 lg:mr-40">{children}</div></>}
    </main>
  );
}
