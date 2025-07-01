import React from 'react'
import CardComponent from '../CardComponent/CardComponent'
import { courseType } from '@/types/course'

interface propsType {
  course: courseType
  hasFav?: boolean
  idFav?: string; 
  favoritePage?: boolean; // Optional prop to indicate if this is being displayed on a favorites page
}
export default function SingleCourse({course, hasFav, favoritePage, idFav}:propsType) {
  return (
               <CardComponent hasFav={hasFav} idFav={idFav} id={course._id} favoritePage={favoritePage} typeModel='Course' title={course.name} imageShape='Rectangle' imageCover={course.imageCover} category={course.category} lang={course.language} paid={course.payed} description={course.description} link={course.link} />
   
  )
}
