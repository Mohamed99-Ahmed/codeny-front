"use client";
import { groupType } from "@/types/group";
import CardComponent from "../CardComponent/CardComponent";
interface propsType {
  group:groupType
  hasFav?: boolean
  favoritePage?: boolean;
  idFav?: string; // Optional prop for favorite ID, used in some contexts
}
export default function SingleGroup({group, hasFav,favoritePage,idFav}:propsType) {    
  return (
    <CardComponent  id={group._id} idFav={idFav}  hasFav={hasFav} typeModel="Group" favoritePage={favoritePage}  title={group.name} imageCover={group.imageCover} category={group.socialType} description={group.description} link={group.link}/>
  );
}
