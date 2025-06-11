"use client";
import React, { useContext, useEffect } from "react";
import SingleHelperTool from "../SingleHelperTool/SingleHelperTool";
import { helperToolContext } from "@/app/api/HelperToolContext/helperTools.api";
import { helperToolType } from "@/types/helperTool";

export default function AllHelpertools() {
  const { getAllHelperTools, helperTools } = useContext(helperToolContext);

  useEffect(() => {
    getAllHelperTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {helperTools?.map((tool: helperToolType) => (
        <SingleHelperTool key={tool._id} tool={tool} />
      ))}
    </div>
  );
}
