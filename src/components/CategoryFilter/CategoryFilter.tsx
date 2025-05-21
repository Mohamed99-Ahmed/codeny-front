"use client"
import { categoryFilter } from '@/types/filter'
import React from 'react'
import { LuCornerLeftDown } from 'react-icons/lu'
import { FiCornerLeftUp } from 'react-icons/fi'
interface propsType {
    category : categoryFilter
}
export default function CategoryFilter({category} : propsType) {
    const [open , setOpen] = React.useState(false)
  return (
    <>
   <div className='bg-mColor  rounded-md px-2 '>
   <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setOpen(!open)}>
      <span className="font-bold text-lg text-gray-700">{category.name}</span>
      <span className="text-xl text-sColor mt-4 mr-2 " >
      {
        !open ? <LuCornerLeftDown /> : <FiCornerLeftUp />
}
      </span>
    </div>
    <form action="" className='relative '>
    {open && <div className="flex absolute bg-white px-4 py-2 lg:static whitespace-nowrap  z-10 top-2  flex-col gap-2">
      {category.options.map((option) => (
        <div key={option} className='flex gap-3  items-center justify-between cursor-pointer'>
        <label
          htmlFor={option}
        //   if selceted make it text color sColor and bold
          className={`flex items-center justify-between cursor-pointer capitalize ${category.selectedValue === option ? "text-sColor font-bold" : ""}`}
        >
            {option}
          </label>  
          <input
          type="radio"
          name={category.name}
          value={option}
          id={option}
          checked={category.selectedValue === option}
          // onChange={() => onChange(option)}
          className="accent-blue-700 w-5 h-5"
        />
        </div>
      
      ))}
    </div>}
    </form>

   </div>
    </>
  )
}
