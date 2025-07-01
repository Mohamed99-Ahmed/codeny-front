"use client";
import React, { useContext, useEffect } from "react";
import { Fustat } from "next/font/google";
import ModelFavorite from "@/components/ModelFavorite/ModelFavorite";
import SingleWebsite from "@/components/SingleWebsite/SingleWebsite";
import SingleCourse from "@/components/Singlecourse/SingleCourse";
import SingleHelperTool from "@/components/SingleHelperTool/SingleHelperTool";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";
import SingleGroup from "@/components/SingleGroup/SingleGroups";
import { postType } from "@/types/post";
import { groupType } from "@/types/group";
import { websiteType } from "@/types/website";
import { courseType } from "@/types/course";
import { helperToolType } from "@/types/helperTool";
import SinglePost from "@/components/SinglePost/SinglePost";

const FustatFont = Fustat({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});

// Update type definitions to include id

export default function Favorites() {
  // states
  const {
    favCourses,
    favHerlperTools,
    favPosts,
    favGroups,
    favWebsites,
    userFavorites,
  } = useContext(favoriteContext);

  // if change in any of fav rerender the page
  useEffect(() => {}, [userFavorites]);

  // return
  return (
    <main>
      <div className="container space-y-6">
        {/* header */}
        <header className="flex items-center justify-between">
          <h1
            className={`${FustatFont.className} text-3xl font-semibold text-gray-600`}
          >
            المفضلة
          </h1>
          {/* <button className="text-red-500  hover:text-red-600 underline">
            ازالة الكل
          </button> */}
        </header>
        {/* posts */}
        {favPosts && favPosts.length > 0 && (
          <ModelFavorite ModelName="البوستات">
            {favPosts.map((favPost) => (
              <SinglePost
                key={favPost._id}
                idFav={favPost._id}
                post={favPost.typeId as postType}
                favoritePage={false}
              />
            ))}
          </ModelFavorite>
        )}
        {/* groups */}
        {favGroups && favGroups.length > 0 && (
          <ModelFavorite
            ModelName="المجموعات"
            classChildren="grid md:grid-cols-2 gap-6"
          >
            {favGroups.map((favGroup) => (
              <SingleGroup
                key={favGroup._id}
                idFav={favGroup._id}
                group={favGroup.typeId as groupType}
                favoritePage={false}
              />
            ))}
          </ModelFavorite>
        )}
        {/* websites */}
        {favWebsites && favWebsites.length > 0 && (
          <ModelFavorite
            ModelName="المواقع"
            classChildren="grid md:grid-cols-2 gap-6"
          >
            {favWebsites.map((favWebsite) => (
              <SingleWebsite
                key={favWebsite._id}
                idFav={favWebsite._id}
                website={favWebsite.typeId as websiteType}
                favoritePage={false}
              />
            ))}
          </ModelFavorite>
        )}
        {/* courses */}
        {favCourses && favCourses.length > 0 && (
          <ModelFavorite
            ModelName="الكورسات"
            classChildren="grid md:grid-cols-2 gap-6"
          >
            {favCourses.map((favCourse) => (
              <SingleCourse
                key={favCourse._id}
                idFav={favCourse._id}
                course={favCourse.typeId as courseType}
                favoritePage={false}
              />
            ))}
          </ModelFavorite>
        )}
        {/* helper tools */}
        {favHerlperTools && favHerlperTools.length > 0 && (
          <ModelFavorite
            ModelName="الأدوات المساعدة"
            classChildren="grid md:grid-cols-2 gap-6"
          >
            {favHerlperTools.map((favHerlperTool) => (
              <SingleHelperTool
                key={favHerlperTool._id}
                idFav={favHerlperTool._id}
                tool={favHerlperTool.typeId as helperToolType}
                favoritePage={false}
              />
            ))}
          </ModelFavorite>
        )}
      </div>
    </main>
  );
}
