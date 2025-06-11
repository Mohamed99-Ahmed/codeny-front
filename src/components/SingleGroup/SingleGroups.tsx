"use client";
import { groupType } from "@/types/group";
import CardComponent from "../CardComponent/CardComponent";
interface propsType {
  group:groupType
}
export default function SingleGroup({group}:propsType) {    
  return (
    <CardComponent favoritePage={true} title={group.name} imageCover={group.imageCover} category={group.socialType} description={group.description} link={group.link}/>
  );
}
