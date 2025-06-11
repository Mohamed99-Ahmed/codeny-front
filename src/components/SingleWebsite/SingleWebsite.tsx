"use client";
import { websiteType } from "@/types/website";
import CardComponent from "../CardComponent/CardComponent";

interface propsType {
  website: websiteType
}
export default function SingleWebsite({website}:propsType) {
    
    
  return (
     <CardComponent title={website.name} imageCover={website.imageCover} category={website.region} description={website.description} link={website.link} />
 
  );
}
