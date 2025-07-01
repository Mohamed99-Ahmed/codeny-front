"use client";

import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  deleteAll,
} from "../handlerFactoryApi";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "@/api/AuthContext/AuthContext";
import { FavoriteType } from "@/types/favorite";
import axios from "axios";
const BaseUrl = "https://codeny-backend.vercel.app";

interface favoriteContextType {
  getAllFavorites: () => Promise<FavoriteType[] | null>;
  favorites: FavoriteType[] | null;
  deleteAllUserFavorites: () => Promise<void>;
  userFavorites: FavoriteType[] | null;
  getOneFavorite: (id: string) => Promise<FavoriteType | null>;
  getUserFavorites: () => Promise<FavoriteType[] | null>;
  addToFavorites: (bodyData: {
    typeId: string;
    typeModel: string;
  }) => Promise<FavoriteType | null>;
  removeFromFavorites: (id: string) => Promise<void>;
  favPosts: FavoriteType[] | null;
  favWebsites: FavoriteType[] | null;
  favCourses: FavoriteType[] | null;
  favHerlperTools: FavoriteType[] | null;
  favGroups: FavoriteType[] | null;
}
export const favoriteContext = createContext<favoriteContextType>({
  getAllFavorites: async () => null,
  favorites: null,
  deleteAllUserFavorites: async () => {},
  userFavorites: null,
  getOneFavorite: async () => null,
  getUserFavorites: async () => null,
  addToFavorites: async () => null,
  removeFromFavorites: async () => {},
  favPosts: null,
  favWebsites: null,
  favCourses: null,
  favHerlperTools: null,
  favGroups: null,
});

export default function FavoritesApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<FavoriteType[] | null>(null);
  const [userFavorites, setUserFavorites] = useState<FavoriteType[] | null>(
    null
  );
  const { token, payload } = useContext(authContext);

  const [favPosts, setPosts] = useState<FavoriteType[] | null>(null);
  const [favWebsites, setWebsites] = useState<FavoriteType[] | null>(null);
  const [favCourses, setCourses] = useState<FavoriteType[] | null>(null);
  const [favHerlperTools, setHelperToos] = useState<FavoriteType[] | null>(
    null
  );
  const [favGroups, setGroups] = useState<FavoriteType[] | null>(null);

  // Fetch user favorites when the application loads
  useEffect(() => {
    (async function getFavorites() {
      await getUserFavorites();
    })();
  }, []);

  // filter of favorites data based on typeModel
  useEffect(() => {
    if (userFavorites) {
      const postsArray: FavoriteType[] = [];
      const websitesArray: FavoriteType[] = [];
      const coursesArray: FavoriteType[] = [];
      const helperToolsArray: FavoriteType[] = [];
      const groupsArray: FavoriteType[] = [];

      userFavorites.forEach((favorite: FavoriteType) => {
        switch (favorite.typeModel) {
          case "Post":
            postsArray.push(favorite as FavoriteType);
            break;
          case "Group":
            groupsArray.push(favorite as FavoriteType);
          case "Website":
            websitesArray.push(favorite as FavoriteType);
            break;
          case "Course":
            coursesArray.push(favorite as FavoriteType);
            break;
          case "helperTool":
            helperToolsArray.push(favorite as FavoriteType);
            break;
        }
      });

      setPosts(postsArray.length > 0 ? postsArray : null);
      setWebsites(websitesArray.length > 0 ? websitesArray : null);
      setCourses(coursesArray.length > 0 ? coursesArray : null);
      setHelperToos(helperToolsArray.length > 0 ? helperToolsArray : null);
      setGroups(groupsArray.length > 0 ? groupsArray : null);
    }
  }, [userFavorites]);

  // functions
  async function getAllFavorites() {
    if (!token) return;
    const data = await getAll(`favorites`);
    setFavorites(data);
    return data;
  }
  async function getUserFavorites() {
    if (!token) return;
    // if user have token fetch user favorites
    try {
      const options = {
        url: `${BaseUrl}/favorites/user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      console.log("data", data.data.data);
      if (data.status === "success") {
        setUserFavorites(data.data.data);
        console.log("userFavorites", userFavorites);
        return data;
      }
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      console.error(errorMessage);
    }
  }
  async function deleteAllUserFavorites() {
    if (!token) return;
    const data = await deleteAll(`favorites/user`, token);
    await getUserFavorites(); // Refresh the list
    return data;
  }

  async function addToFavorites(bodyData: {
    typeId: string;
    typeModel: string;
  }) {
    if (!token ) return;
    if (!payload || !payload.id) return;
    const data = await createOne(`favorites`, token, {
      ...bodyData,
      user: payload.id ,
    });
    await getUserFavorites(); // Refresh the list
    return data;
  }

  async function getOneFavorite(id: string) {
    if (!token) return;
    const data = await getOne(`favorites`, id);
    await getUserFavorites(); // Refresh the list
    return data;
  }
  async function removeFromFavorites(id: string) {
    if (!token) return;
    const data = await deleteOne(`favorites`, id, token);
    await getUserFavorites(); // Refresh the list
    return data;
  }

  return (
    <favoriteContext.Provider
      value={{
        getAllFavorites,
        favorites,
        deleteAllUserFavorites,
        userFavorites,
        getOneFavorite,
        getUserFavorites,
        addToFavorites,
        removeFromFavorites,
        favPosts,
        favWebsites,
        favCourses,
        favHerlperTools,
        favGroups,
      }}
    >
      {children}
    </favoriteContext.Provider>
  );
}
