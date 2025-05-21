"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '../Button/Button'
import { useRouter } from 'next/navigation'
interface propsType {
    name: string,
    photo: string,
    headLine:  string,
    
}
export default function UserBox({name , photo , headLine}: propsType) {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className='flex flex-col items-center gap-4 p-4  absolute left-0 bottom-0 translate-y-[100%] bg-white border-t-sColor border-t-2 rounded-br-lg cursor-pointer  '>
            <Image src={photo} alt={name} width={30} height={30} className='rounded-full border border-gray-200' onClick={()=>setOpen((prev)=>!prev)}   />
          { open &&  <>
                <h2 className='font-semibold text-gray-800 capitalize'>{name}</h2>
                <p className='text-sm text-gray-500 capitalize'>{headLine}</p>
            <Button text="الأعدادات" ariaLabel="الأعدادات" className='self-stretch' onClick={()=>router.push("/User/settings")}/>
            </>}
        </div>
    )
}