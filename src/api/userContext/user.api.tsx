"use client";

import {  deleteOne, updateOne } from "../handlerFactoryApi";
import { createContext, useContext, useState } from "react";
import { authContext } from "@/api/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { userType } from "@/types/auth";

interface userContextType {
      getAllusers: () => Promise<userType[]>;
      users: userType[] | null;
      getOneUser: (id: string) => Promise<userType>;
      deletOneUser: (id: string) => Promise<void>;
      updateOneUser: (id: string, bodyData: FormData | JSON) => Promise<userType>;
}
export const userContext = createContext<userContextType>({
  getAllusers: async () => [],
  users: null,
  getOneUser: async () => ({} as userType),
  deletOneUser: async () => {},
  updateOneUser: async () => ({} as userType),
});

export default function UsersApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<userType[] | null>(null);
  const { token } = useContext(authContext);

  // get all users function
  async function getAllusers() {
    try {
      const options = {
        url: `https://codeny-backend.vercel.app}/users`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setUsers(data.data.data);
        return data.data.data;
      }
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
      return null;
    }
  }

  //   get one user function
  async function getOneUser(id: string) {
      console.log("helllaodsfa")
    try {
      const options = {
        url: `https://codeny-backend.vercel.app/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.request(options);
      console.log("this is data " ,data)
      return data
      
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";
        console.log("error" , err)
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }
  //   get one post function
  async function deletOneUser(id: string) {
    // check if token is available
    if (!token) {
      return;
    }
    const data = await deleteOne(`users`, id, token);
    return data;
  }
// update Post
  async function updateOneUser(id: string, bodyData: FormData | JSON) {
    if (!token) return;
    const data = await updateOne(`users`, id, token, bodyData);
    await getAllusers(); // Refresh the list after update
    return data;
  }

  return (
    <userContext.Provider
      value={{
        getAllusers,
        users,
        getOneUser,
        deletOneUser,
        updateOneUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
