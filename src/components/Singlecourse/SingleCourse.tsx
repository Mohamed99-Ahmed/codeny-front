import React from 'react'
import CardComponent from '../CardComponent/CardComponent'
import { courseType } from '@/types/course'

interface propsType {
  course: courseType
}
export default function SingleCourse({course}:propsType) {
  return (
               <CardComponent title={course.name} imageShape='Rectangle' imageCover={course.imageCover} category={course.category} lang={course.language} paid={course.payed} description={course.description} link={course.link} />
   
  )
}
