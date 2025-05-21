"use client"
import React, { FocusEventHandler } from 'react'

interface propsType {
    options : string[],
    name : string,
    
    onChange : (e : React.ChangeEvent<HTMLSelectElement>) => void,
    onBlur?: FocusEventHandler<HTMLSelectElement> | undefined;
    className?: string;
}
export default function SelectField({options ,name, onChange , onBlur , className} : propsType ) {
  return (
    <>
    
  <select id={name} name={name} onChange={onChange} onBlur={onBlur} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}>
    <option selected>{name}</option>
    {
        options.map((option) => (
            <option key={option} value={option}>{option}</option>
        ))
    }
  </select>
    </>
  )
}
