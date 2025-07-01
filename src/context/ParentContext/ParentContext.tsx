"use client";
import React, { ReactNode } from "react";
import AuthContext from "../../api/AuthContext/AuthContext";
import PostsApiContext from "@/api/PostContext/posts.api";
import WebsitesApiContext from "@/api/WebsiteContext/websites.api";
import GroupsApiContext from "@/api/GroupContext/groups.api";
import CoursesApiContext from "@/api/CourseContext/courses.api";
import HelperToolsApiContext from "@/api/HelperToolContext/helperTools.api";
import FavoritesApiContext from "@/api/FavoriteContext/favorites.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ParentContext({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
