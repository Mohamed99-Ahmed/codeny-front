"use client";
import { websiteType } from "@/types/website";
import CardComponent from "../CardComponent/CardComponent";

interface propsType {
  website: websiteType;
  hasFav?: boolean; // Optional prop to indicate if the card is already favorited
  favoritePage?: boolean; // Optional prop to indicate if this is being displayed on a favorites page
  idFav?: string; // Optional prop for favorite ID, used in some contexts
}
export default function SingleWebsite({website, hasFav,favoritePage, idFav}:propsType) {
    
    
  return (
     <CardComponent id={website._id} hasFav={hasFav} idFav={idFav} favoritePage={favoritePage} typeModel="Website" title={website.name} imageCover={website.imageCover} category={website.region} description={website.description} link={website.link} />
 
  );
}
