"use client";

import { groupType } from "@/types/group";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "../handlerFactoryApi";
import { createContext, useContext, useState } from "react";
import { authContext } from "@/app/api/AuthContext/AuthContext";

interface GroupContextType {
  getAllGroups: () => Promise<groupType[]>;
  groups: groupType[] | null;
  getOneGroup: (id: string) => Promise<groupType>;
  createGroup: (bodyData: object) => Promise<groupType>;
  deleteOneGroup: (id: string) => Promise<void>;
  updateOneGroup: (id: string, bodyData: FormData | JSON) => Promise<groupType>;
}

export const groupContext = createContext<GroupContextType>({
  getAllGroups: async () => [],
  groups: null,
  getOneGroup: async () => ({} as groupType),
  createGroup: async () => ({} as groupType),
  deleteOneGroup: async () => {},
  updateOneGroup: async () => ({} as groupType),
});

export default function GroupsApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groups, setGroups] = useState<groupType[] | null>(null);
  const { token } = useContext(authContext);

  async function getAllGroups() {
    const data = await getAll(`groups`);
    setGroups(data);
    return data;
  }

  async function createGroup(bodyData: object) {
    if (!token) return;
    const data = await createOne(`groups`, token, bodyData);
    await getAllGroups(); // Refresh the list
    return data;
  }

  async function getOneGroup(id: string) {
    const data = await getOne(`groups`, id);
    return data;
  }
  async function deleteOneGroup(id: string) {
    if (!token) return;
    const data = await deleteOne(`groups`, id, token);
    await getAllGroups(); // Refresh the list
    return data;
  }

  async function updateOneGroup(id: string, bodyData: FormData | JSON) {
    if (!token) return;
    const data = await updateOne(`groups`, id, token, bodyData);
    await getAllGroups(); // Refresh the list after update
    return data;
  }

  return (
    <groupContext.Provider
      value={{
        getAllGroups,
        groups,
        getOneGroup,
        createGroup,
        deleteOneGroup,
        updateOneGroup,
      }}
    >
      {children}
    </groupContext.Provider>
  );
}
