"use client";
import React, { ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";

export default function ParentContext({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthContext>
        {children}
      </AuthContext>
    </>
  );
}
