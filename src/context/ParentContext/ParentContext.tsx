"use client";
import React, { ReactNode } from "react";
import AuthContext from "../../app/api/AuthContext/AuthContext";
import PostsApiContext from "@/app/api/PostContext/posts.api";
import WebsitesApiContext from "@/app/api/WebsiteContext/websites.api";
import GroupsApiContext from "@/app/api/GroupContext/groups.api";
import CoursesApiContext from "@/app/api/CourseContext/courses.api";
import HelperToolsApiContext from "@/app/api/HelperToolContext/helperTools.api";
import FavoritesApiContext from "@/app/api/FavoriteContext/favorites.api";

export default function ParentContext({ children }: { children: ReactNode }) {
  return (
    <AuthContext>
      <PostsApiContext>
        <WebsitesApiContext>
          <GroupsApiContext>
            <CoursesApiContext>
              <HelperToolsApiContext>
                <FavoritesApiContext>{children}</FavoritesApiContext>
              </HelperToolsApiContext>
            </CoursesApiContext>
          </GroupsApiContext>
        </WebsitesApiContext>
      </PostsApiContext>
    </AuthContext>
  );
}
