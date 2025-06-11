import React from 'react'
import CardComponent from '../CardComponent/CardComponent'
import { helperToolType } from '@/types/helperTool'

interface propsType {
  tool:helperToolType
}
export default function SingleHelperTool({tool}:propsType) {
  return (
    <>
            <CardComponent title={tool.name} imageCover="" category={tool.category} description={tool.description} link={tool.link} />
        
    </>
  )
}
