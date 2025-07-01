"use client";
import React, {  useContext, useEffect } from "react";
import { postContext } from "@/api/PostContext/posts.api";
import { postType } from "@/types/post";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";
import { FavoriteType } from "@/types/favorite";
import SinglePost from "../SinglePost/SinglePost";
export default function AllPosts() {
  const { posts, getAllPosts } = useContext(postContext);
  const { favPosts } = useContext(favoriteContext);
  useEffect(() => {
    getAllPosts();
  }, []);
  if (!posts) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  return (
    <div>
      {posts.map((post: postType) => {
        let isFav = false;
        let idFav = undefined;
        if (favPosts) {
          const fav = favPosts.find(
            (fav: FavoriteType) => fav.typeId._id === post._id
          );
          if (fav) {
            isFav = true;
            idFav = fav._id;
          }
        }
        return (
          <SinglePost
            idFav={idFav}
            typeModel="Post"
            key={post._id}
            post={post}
            hasFav={isFav}
          />
        );
      })}
    </div>
  );
}
