"use client";
import React, { useContext, useEffect } from "react";
import SingleCourse from "../Singlecourse/SingleCourse";
import { courseContext } from "@/app/api/CourseContext/courses.api";
import { courseType } from "@/types/course";

export default function AllCourses() {
  const { getAllCourses, courses } = useContext(courseContext);

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {courses?.map((course: courseType) => (
        <SingleCourse key={course._id} course={course} />
      ))}
    </div>
  );
}
