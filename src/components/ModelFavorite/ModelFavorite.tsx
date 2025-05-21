"use client"
import React from 'react'
import { LuArrowDownFromLine } from 'react-icons/lu'
import { BiArrowToTop } from 'react-icons/bi'
interface propsType {
    ModelName: string,
    children: React.ReactNode,
    classChildren?: string
}
export default function ModelFavorite({ModelName , children , classChildren}: propsType ) {
    const [open , setOpen] = React.useState(false)
  return (
    <div>
        <header className='flex gap-2 bg-white  justify-between items-center rounded-md p-2 cursor-pointer hover:border-sColor border transition-all duration-300' onClick={() => setOpen(!open)}>
            <h3 className='text-2xl font-semibold'>{ModelName}</h3>
           { !open ?<LuArrowDownFromLine className='text-xl cursor-pointer'  /> : <BiArrowToTop className='text-xl cursor-pointer' />   }
        </header>
        {open && <div className={`rounded-md p-2 grid md:grid-cols-2  gap-6 ${classChildren}`}>
            {children}
        </div>}
    </div>
  )
}
