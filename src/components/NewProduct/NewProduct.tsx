// import React from 'react'

// export default function NewProduct() {
//   return (
//       <form className="p-4 bg-white rounded-md gap-5 hover:border shadow-sm flex flex-wrap justify-between items-center  hover:border-sColor">
//             <main className="flex flex-col  gap-1">
//               <label htmlFor="name"></label>
//               <div className="flex gap-1 items-center">
//                   <label htmlFor="location" className="whitespace-nowrap">
//                     اسم الفرع :{" "}
//                   </label>
//                 <InputField
//                   id="name"
//                   type="text"
//                   name="name"
//                   placeholder="حدائق القبة"
//                   value={formik.values.name}
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   className="text-2xl font-bold text-gray-700 w-full"
//                 />
//               </div>
//               <div className="flex gap-1 items-center">
//                 {!store && (
//                   <label htmlFor="location" className="whitespace-nowrap">
//                     {" "}
//                     العنوان:{" "}
//                   </label>
//                 )}
//                 <textarea
//                   id="discription"
//                   name="description"
//                   placeholder="١٥١ مصر والسودان، حدائق القبة، امام صيدلية العزبي"
//                   value={formik.values.description}
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   className=" text--sm text-gray-600 p-1 bg-white focus:outline-sColor rounded-md grow text-wrap min-h-18 overflow-hidden "
//                 />
//               </div>
    
//               <div className="flex gap-1 items-center">
//                 <label htmlFor="location">الموقع</label>
//                 <textarea
//                   name="location"
//                   placeholder="https://maps.app.goo.gl/ZeDXqLLFLBRQZ5q18"
//                   value={formik.values.location}
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   className=" text-sm text-center  p-1 text-sColor bg-white focus:outline-sColor rounded-md grow text-wrap min-h-18 overflow-hidden "
//                 />
//               </div>
//             </main>
//             <footer className="flex gap-2">
//               {true ? (
//                 <>
//                   <Button text="تعديل" ariaLabel="تعديل"></Button>
//                   <DeleteButton>ازالة</DeleteButton>
//                 </>
//               ): <Button text="اضافة" ariaLabel="اضافة"></Button>}
//             </footer>
//           </form>
//   )
// }
