"use client"
import React, { useState } from "react";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { categoryFilter } from "@/types/filter";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { usePathname } from "next/navigation";
// interface FilterRadioProps {
//   categories: categoryFilter[]
// //   onChange: (value: string) => any;
// }

export default function AsideFilteration() {
  const path = usePathname();
  let categories: categoryFilter[] = []
  // categories depend on path 
  switch (path) {
    case "/":
      categories = [
        {name:"اضيف من " , options:["كل الأوقات", "ثلاثة ايام", "يوم واحد"] , selectedValue:"كل الأوقات"},
        {name:"تصنيف البوست", options:["all", "software development", "frontend", "backend", "fullstack", "mobile", "game", "other"] , selectedValue:"all"},
        {name: "نوع البوست", options :["all","text", "image", "link"], selectedValue:"all"},
    ]
      break;
    case "/websites":
      categories = 
        [
          {name:"اضيف من " , options:["كل الأوقات", "ثلاثة ايام", "يوم واحد"] , selectedValue:"كل الأوقات"},
          {name:"استقطاب المواقع", options:["الكل", "عربي", "انجليزي"], selectedValue:"الكل"}
        ];
      break;
    case "/groups":
      categories =[ 
        {name:"اضيف من " , options:["كل الأوقات", "ثلاثة ايام", "يوم واحد"] , selectedValue:"كل الأوقات"    },
        {name: "نوع الجروب", options:["الكل", "whatsapp", "telegram","discord", "facebook"] , selectedValue:"الكل"},
      ];
      break;
    case "/helperTools":
      categories = [
        {name:"اضيف من " , options:["كل الأوقات", "ثلاثة ايام", "يوم واحد"] , selectedValue:"كل الأوقات"    },
        {name:"نوع الادوات", options:["all", "software development", "frontend", "backend", "fullstack", "mobile", "game", "other"] , selectedValue:"all"},
      ]
      break;
    case "/courses":
       categories = [
          {name:"اضيف من " , options:["كل الأوقات", "ثلاثة ايام", "يوم واحد"] , selectedValue:"كل الأوقات"    },
          {name:"تصنيف الدورة", options:["all", "software development", "frontend", "backend", "fullstack", "mobile", "game", "other"] , selectedValue:"all"},
      
        ]
      break;
  }
 const [open , setOpen] = useState<boolean>(false)
 return ( <div className={` ${path === "/favorites" && "hidden"} bg-white  px-4 py-6 flex gap-4 border-t-sColor border-2   flex-wrap  lg:flex-col  absolute bottom-0 translate-y-[100%] left-[80px] right-0  lg:left-auto   lg:rounded-none rounded-bl-lg lg:border-0    z-[20]   lg:p-10 lg:border-l lg:border-l-sColor `}>
  <BsLayoutTextSidebar className="relative bottom-2 left-2  cursor-pointer font-bold text-xl text-sColor" onClick={() => setOpen(!open)} />
      {open && categories.map((category) => {
        return (
          <CategoryFilter
          key={category.name}
          category={category}
          />
        )
      })}
  </div>)
}