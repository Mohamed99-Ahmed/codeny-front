
import React from 'react'
import { Fustat } from 'next/font/google'
import ModelFavorite from '@/components/ModelFavorite/ModelFavorite'
import PostSingle from '@/components/PostSingle/PostSingle';
import SingleGroup from '@/components/SingleGroup/SingleGroups';
const FustatFont = Fustat({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});

export default function favorites() {
  return (
    <main>
      <div className='container space-y-6'>
        <header className='flex items-center justify-between'>
          <h1 className={`${FustatFont.className} text-3xl font-semibold text-gray-600`} >المفضلة</h1>
          <button className='text-red-500  hover:text-red-600 underline'>ازالة الكل</button>
        </header>
        <ModelFavorite ModelName="البوستات">
            <PostSingle favoritePage={true}/> 
        </ModelFavorite>
        <ModelFavorite ModelName="الجروبات" classChildren='grid md:grid-cols-2  gap-6'>
        <SingleGroup/>
        <SingleGroup/>
        <SingleGroup/>
        </ModelFavorite>  
      </div>

    </main>
  )
}
