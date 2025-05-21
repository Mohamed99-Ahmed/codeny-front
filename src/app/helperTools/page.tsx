import AllHelpertools from '@/components/AllHelperTools/AllHelpertools'
import React from 'react'
import ContentContainer from '@/components/ContentContainer/ContentContainer'


const categories = [
    {name:"اضيف من " , options:["كل الأوقات", "ثلاثة ايام", "يوم واحد"] , selectedValue:"كل الأوقات"    },
    {name:"تصنيف الاداة", options:["all", "software development", "frontend", "backend", "fullstack", "mobile", "game", "other"] , selectedValue:"all"},

  ]
export default function helperToolsPage() {
  return (
    <ContentContainer categories={categories}>
        <AllHelpertools/>
    </ContentContainer> 
  )
}
