"use client";

import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  deleteAll,
} from "../handlerFactoryApi";
import { createContext, useContext, useState } from "react";
import { authContext } from "@/app/api/AuthContext/AuthContext";
import { FavoriteType } from "@/types/favorite";

export const favoriteContext = createContext({});

export default function FavoritesApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<FavoriteType[] | null>(null);
  const [userFavorites, setUserFavorites] = useState<FavoriteType[] | null>(
    null
  );
  const { token } = useContext(authContext);

  async function getAllFavorites() {
    if (!token) return;
    const data = await getAll(`favorites`);
    setFavorites(data);
    return data;
  }
  async function getUserFavorites() {
    if (!token) return;
    const data = await getAll(`/favorites/user`);
    setUserFavorites(data);
    return data;
  }
  async function deleteAllUserFavorites() {
    if (!token) return;
    const data = await deleteAll(`favorites/user`, token);
    await getUserFavorites(); // Refresh the list
    return data;
  }

  async function addToFavorites(bodyData: object) {
    if (!token) return;
    const data = await createOne(`courses`, token, bodyData);
    await getAllFavorites(); // Refresh the list
    return data;
  }

  async function getOneFavorite(id: string) {
    if (!token) return;
    const data = await getOne(`favorites`, id);
    await getAllFavorites(); // Refresh the list
    return data;
  }
  async function removeFromFavorites(id: string) {
    if (!token) return;
    const data = await deleteOne(`favorites`, id, token);
    await getAllFavorites(); // Refresh the list
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
      }}
    >
      {children}
    </favoriteContext.Provider>
  );
}
