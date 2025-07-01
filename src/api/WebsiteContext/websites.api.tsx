"use client";

import { websiteType } from "@/types/website";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "../handlerFactoryApi";
import { createContext, useContext, useState } from "react";
import { authContext } from "@/api/AuthContext/AuthContext";

interface WebsiteContextType {
  getAllWebsites: () => Promise<websiteType[]>;
  websites: websiteType[] | null;
  getOneWebsite: (id: string) => Promise<websiteType>;
  createWebsite: (bodyData: object) => Promise<websiteType>;
  deleteOneWebsite: (id: string) => Promise<void>;
  updateOneWebsite: (
    id: string,
    bodyData: FormData | JSON
  ) => Promise<websiteType>;
}

export const websiteContext = createContext<WebsiteContextType>({
  getAllWebsites: async () => [],
  websites: null,
  getOneWebsite: async () => ({} as websiteType),
  createWebsite: async () => ({} as websiteType),
  deleteOneWebsite: async () => {},
  updateOneWebsite: async () => ({} as websiteType),
});

export default function WebsitesApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [websites, setWebsites] = useState<websiteType[] | null>(null);
  const { token } = useContext(authContext);

  async function getAllWebsites() {
    const data = await getAll(`websites`);
    setWebsites(data);
    return data;
  }

  async function createWebsite(bodyData: object) {
    if (!token) return;
    const data = await createOne(`websites`, token, bodyData);
    await getAllWebsites(); // Refresh the list
    return data;
  }

  async function getOneWebsite(id: string) {
    const data = await getOne(`websites`, id);
    return data;
  }
  async function deleteOneWebsite(id: string) {
    if (!token) return;
    const data = await deleteOne(`websites`, id, token);
    await getAllWebsites(); // Refresh the list
    return data;
  }

  async function updateOneWebsite(id: string, bodyData: FormData | JSON) {
    if (!token) return;
    const data = await updateOne(`websites`, id, token, bodyData);
    await getAllWebsites(); // Refresh the list after update
    return data;
  }

  return (
    <websiteContext.Provider
      value={{
        getAllWebsites,
        websites,
        getOneWebsite,
        createWebsite,
        deleteOneWebsite,
        updateOneWebsite,
      }}
    >
      {children}
    </websiteContext.Provider>
  );
}
