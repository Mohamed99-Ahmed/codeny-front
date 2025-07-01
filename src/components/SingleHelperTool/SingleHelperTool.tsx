import React from 'react'
import CardComponent from '../CardComponent/CardComponent'
import { helperToolType } from '@/types/helperTool'

interface propsType {
  tool:helperToolType
  hasFav?: boolean;
  idFav?: string; // Optional prop for favorite ID, used in some contexts
  favoritePage?: boolean; // Optional prop to indicate if this is being displayed on a favorites page
}
export default function SingleHelperTool({tool, hasFav, favoritePage,idFav}:propsType) {
  return (
    <>
            <CardComponent id={tool._id} idFav={idFav} hasFav={hasFav} favoritePage={favoritePage} typeModel='helperTool' title={tool.name} imageCover="" category={tool.category} description={tool.description} link={tool.link} />
        
    </>
  )
}
