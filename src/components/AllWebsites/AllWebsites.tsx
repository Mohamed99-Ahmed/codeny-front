"use client";
import React, { useContext, useEffect } from "react";
import SingleWebsite from "../SingleWebsite/SingleWebsite";
import { websiteContext } from "@/app/api/WebsiteContext/websites.api";
import { websiteType } from "@/types/website";

export default function AllWebsites() {
  const {getAllWebsites,websites} = useContext(websiteContext);
  useEffect(()=>{
    getAllWebsites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <section className="grid md:grid-cols-2  gap-6">
      {  websites?.map((website:websiteType)=>{
        return (
          <SingleWebsite key={website._id} website={website} />
        )
      })}
      
    
      </section>
    </>
  );
}
