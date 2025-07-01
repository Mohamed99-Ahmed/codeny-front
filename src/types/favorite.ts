import { userType } from "./auth";
import { courseType } from "./course";
import { groupType } from "./group";
import { helperToolType } from "./helperTool";
import { postType } from "./post";
import { websiteType } from "./website";


export interface FavoriteType  {
  _id: string;
  typeId : courseType | groupType | helperToolType| postType | websiteType
    typeModel: "Course" | "Group" | "helperTool" | "Post" | "Website";
  user:userType
}