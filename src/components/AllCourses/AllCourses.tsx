"use client";
import React, { useContext, useEffect } from "react";
import SingleCourse from "../Singlecourse/SingleCourse";
import { courseContext } from "@/api/CourseContext/courses.api";
import { courseType } from "@/types/course";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";
import { FavoriteType } from "@/types/favorite";

export default function AllCourses() {
  const { getAllCourses, courses } = useContext(courseContext);
  const { favCourses } = useContext(favoriteContext);

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {courses?.map((course: courseType) => {
        let isFav = false;
        let idFav = undefined;
        if (favCourses) {
          const fav = favCourses.find(
            (fav: FavoriteType) => fav.typeId._id === course._id
          );
          if (fav) {
            isFav = true;
            idFav = fav._id;
          }
        }
        return (
          <SingleCourse
            key={course._id}
            idFav={idFav}
            course={course}
            hasFav={isFav}
          />
        );
      })}
    </div>
  );
}
