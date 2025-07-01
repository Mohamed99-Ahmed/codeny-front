"use client";

import { courseType } from "@/types/course";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "../handlerFactoryApi";
import { createContext, useContext, useState } from "react";
import { authContext } from "@/api/AuthContext/AuthContext";

interface CourseContextType {
  getAllCourses: () => Promise<courseType[]>;
  courses: courseType[] | null;
  getOneCourse: (id: string) => Promise<courseType>;
  createCourse: (bodyData: object) => Promise<courseType>;
  deleteOneCourse: (id: string) => Promise<void>;
  updateOneCourse: (
    id: string,
    bodyData: FormData | JSON
  ) => Promise<courseType>;
}

export const courseContext = createContext<CourseContextType>({
  getAllCourses: async () => [],
  courses: null,
  getOneCourse: async () => ({} as courseType),
  createCourse: async () => ({} as courseType),
  deleteOneCourse: async () => {},
  updateOneCourse: async () => ({} as courseType),
});

export default function CoursesApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [courses, setCourses] = useState<courseType[] | null>(null);
  const { token } = useContext(authContext);

  async function getAllCourses() {
    const data = await getAll(`courses`);
    setCourses(data);
    return data;
  }

  async function createCourse(bodyData: object) {
    if (!token) return;
    const data = await createOne(`courses`, token, bodyData);
    await getAllCourses(); // Refresh the list
    return data;
  }

  async function getOneCourse(id: string) {
    const data = await getOne(`courses`, id);
    return data;
  }
  async function deleteOneCourse(id: string) {
    if (!token) return;
    const data = await deleteOne(`courses`, id, token);
    await getAllCourses(); // Refresh the list
    return data;
  }

  async function updateOneCourse(id: string, bodyData: FormData | JSON) {
    if (!token) return;
    const data = await updateOne(`courses`, id, token, bodyData);
    await getAllCourses(); // Refresh the list after update
    return data;
  }

  return (
    <courseContext.Provider
      value={{
        getAllCourses,
        courses,
        getOneCourse,
        createCourse,
        deleteOneCourse,
        updateOneCourse,
      }}
    >
      {children}
    </courseContext.Provider>
  );
}
