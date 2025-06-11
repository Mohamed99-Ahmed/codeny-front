"use client";
import React, { useContext, useEffect } from "react";
import PostSingle from "../PostSingle/PostSingle";
import { postContext } from "@/app/api/PostContext/posts.api";
import { postType } from "@/types/post";
export default function AllPosts() {
  const { posts, getAllPosts } = useContext(postContext);
  useEffect(() => {
    getAllPosts();
  }, []);
  if (!posts) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  return (
    <div>
      {posts.map((post: postType) => {
        return <PostSingle key={post._id} post={post} />;
      })}
    </div>
  );
}
