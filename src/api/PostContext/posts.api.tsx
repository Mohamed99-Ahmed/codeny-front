"use client";

import { postType } from "@/types/post";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "../handlerFactoryApi";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "@/api/AuthContext/AuthContext";
interface postContextTyper {
  getAllPosts: () => Promise<postType[] | null>;
  posts: postType[] | null;
  getOnePost: (id: string) => Promise<postType | null>;
  createPost: (bodyData: object) => Promise<postType | null>;
  deletOnePost: (id: string) => Promise<void>;
  updateOnePost: (id: string, bodyData: FormData | JSON) => Promise<postType | null>;
}
export const postContext = createContext<postContextTyper>({
  getAllPosts: async () => null,
  posts: null,
  getOnePost: async () => null,
  createPost: async () => null,
  deletOnePost: async () => {},
  updateOnePost: async () => null,
});

export default function PostsApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<postType[] | null>(null);
  const { token } = useContext(authContext);
  useEffect(() => {
    // getOnePost();
  }, []);
  // get all posts function
  async function getAllPosts() {
    const data = await getAll(`posts`);
    setPosts(data);
    // console.log("posts", data);
    return data;
  }

  //   create post function
  async function createPost(bodyData: object) {
    // check if token is available
    if (!token) {
      return;
    }
    const data = await createOne(`posts`, token, bodyData);
    console.log("created post", data);
    return data;
  }

  //   get one post function
  async function getOnePost(id: string) {
    const data = await getOne(`posts`, id);
    console.log("one post", data);
    return data;
  }
  //   get one post function
  async function deletOnePost(id: string) {
    // check if token is available
    if (!token) {
      return;
    }
    const data = await deleteOne(`posts`, id, token);
    console.log("one post", data);
    return data;
  }

  async function updateOnePost(id: string, bodyData: FormData | JSON) {
    if (!token) return;
    const data = await updateOne(`posts`, id, token, bodyData);
    await getAllPosts(); // Refresh the list after update
    return data;
  }

  return (
    <postContext.Provider
      value={{
        getAllPosts,
        posts,
        getOnePost,
        createPost,
        deletOnePost,
        updateOnePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
}
