import React from 'react'
import SingleCourse from '../Singlecourse/SingleCourse'

export default function AllCourses() {
  return (
      <div className="grid md:grid-cols-2  gap-6">
          <SingleCourse/>
          <SingleCourse/>
          <SingleCourse/>
          <SingleCourse/>
          <SingleCourse/>
        </div>
  )
}
