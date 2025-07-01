"use client";

import { helperToolType } from "@/types/helperTool";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "../handlerFactoryApi";
import { createContext, useContext, useState } from "react";
import { authContext } from "@/api/AuthContext/AuthContext";

interface HelperToolContextType {
  getAllHelperTools: () => Promise<helperToolType[]>;
  helperTools: helperToolType[] | null;
  getOneHelperTool: (id: string) => Promise<helperToolType>;
  createHelperTool: (bodyData: object) => Promise<helperToolType>;
  deleteOneHelperTool: (id: string) => Promise<void>;
  updateOneHelperTool: (
    id: string,
    bodyData: FormData | JSON
  ) => Promise<helperToolType>;
}

export const helperToolContext = createContext<HelperToolContextType>({
  getAllHelperTools: async () => [],
  helperTools: null,
  getOneHelperTool: async () => ({} as helperToolType),
  createHelperTool: async () => ({} as helperToolType),
  deleteOneHelperTool: async () => {},
  updateOneHelperTool: async () => ({} as helperToolType),
});

export default function HelperToolsApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [helperTools, setHelperTools] = useState<helperToolType[] | null>(null);
  const { token } = useContext(authContext);

  async function getAllHelperTools() {
    const data = await getAll(`helperTools`);
    setHelperTools(data);
    return data;
  }

  async function createHelperTool(bodyData: object) {
    if (!token) return;
    const data = await createOne(`helperTools`, token, bodyData);
    await getAllHelperTools(); // Refresh the list
    return data;
  }

  async function getOneHelperTool(id: string) {
    const data = await getOne(`helperTools`, id);
    return data;
  }
  async function deleteOneHelperTool(id: string) {
    if (!token) return;
    const data = await deleteOne(`helperTools`, id, token);
    await getAllHelperTools(); // Refresh the list
    return data;
  }

  async function updateOneHelperTool(id: string, bodyData: FormData | JSON) {
    if (!token) return;
    const data = await updateOne(`helperTools`, id, token, bodyData);
    await getAllHelperTools(); // Refresh the list after update
    return data;
  }

  return (
    <helperToolContext.Provider
      value={{
        getAllHelperTools,
        helperTools,
        getOneHelperTool,
        createHelperTool,
        deleteOneHelperTool,
        updateOneHelperTool,
      }}
    >
      {children}
    </helperToolContext.Provider>
  );
}
