"use client"
import Image from 'next/image'
import React, {  useContext, useEffect, useRef } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import human  from "../../../public/imgs/Mohamed.jpeg"
import InputField from '@/components/InputField/inputField'

import SelectField from '@/components/SelectField/SelectField' 
import {  FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/Button/Button'
import { useQuery } from '@tanstack/react-query'
import { userContext } from '@/api/userContext/user.api'
import { authContext } from '@/api/AuthContext/AuthContext'
export default function UserSetting() {
  const inputFile = useRef<HTMLInputElement>(null);
  const {getOneUser} = useContext(userContext)
  const {payload} = useContext(authContext)

  useEffect(()=>{
  
    (async function call(){
      console.log(payload.id)
      const data = await getOneUser(payload && payload.id)
    
      console.log(data)
    })()
  },[])
  //   const { data, isLoading, error } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => await getOneUser(payload && payload.id),
  // });
  // if(data){
  //   console.log(data)
  //   return 
  // }
  // Define the form initial values
  const initialValues = {
    name: '',
    headLine: '',
    email: '',
    phone: '',
    photo: '',
    country: '',
    linkedinLink: '',
    githubLink: ''
  };

  // Define validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('الاسم مطلوب').min(3, 'الاسم يجب ان يحتوي على 3 حروف على الأقل').max(15, 'الاسم يجب ان يحتوي على 15 حرف على الأقل'),
    headLine: Yup.string(),
    email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
    phone: Yup.string().matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب ان يبدأ ب 01 و يحتوي على 11 رقم'),
    country: Yup.string().min(3, 'البلد يجب ان يحتوي على 3 حروف على الأقل').max(15, 'البلد يجب ان يحتوي على 15 حرف على الأقل'),
    githubLink: Yup.string().url('رابط GitHub غير صالح'),
    linkedinLink: Yup.string().url('رابط LinkedIn غير صالح')
  });

  // Handle form submission
  const handleSubmit = async (values : typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
    try {   
      // Create form data for file upload
      const formData = new FormData();
      
      // Append all form values
      Object.keys(values).forEach(key => {
        if (key !== 'photo') {
          formData.append(key, values[key as keyof typeof initialValues]);
        }
      });
      
      // Append photo if available
      if (inputFile.current?.files?.[0]) {
        formData.append('photo', inputFile.current.files[0]);
      }
      
      // TODO: Send formData to API
      console.log('Form data:', values);
      console.log('Photo:', inputFile.current?.files?.[0]);
      
      // Here you would typically make an API call to update user profile
      // await updateUserProfile(formData);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Change profile photo of my profile
  const changeProfilePhoto = () => {
    // This function is now just for UI feedback
    // The actual file handling is done in the form submission
    console.log('Photo selected:', inputFile.current?.files?.[0]?.name);
  };
  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit : handleSubmit,
  }); 
  return (
    <div className='container mx-auto py-8 px-4'>
      <h1 className='text-2xl font-bold mb-6'>إعدادات الملف الشخصي</h1>
      
        <form onSubmit={formik.handleSubmit} className='flex flex-col  gap-8'>
            {/* Photo section */}
            <div className='flex flex-col items-center'>
              <figure className='mb-4'>
                <input
                  id="file-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.svg,.webp"
                  className="-z-10 opacity-0 absolute"
                  ref={inputFile}
                  onChange={() => changeProfilePhoto()}
                />
                <label 
                  className="relative group/parent cursor-pointer" 
                  htmlFor="file-upload"
                >
                  <Image
                    src={human.src}
                    alt="صورة الملف الشخصي"
                    height={150}
                    width={150}
                    className="self-center w-[150px] h-[150px] object-cover rounded-full bg-cover"
                  />
                  {/* Upload icon overlay */}
                  <div className="absolute inset-0 bg-gray-300 opacity-80 hidden group-hover/parent:flex rounded-full justify-center items-center">
                    <FiUploadCloud size={20}/>
                  </div>
                </label>
              </figure>
              <p className='text-sm text-gray-500 mt-2'>انقر لتغيير الصورة</p>
            </div>
            
            {/* Form fields */}
            <div className='flex-1 space-y-4'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم</label>
                  <InputField
                    id="name"
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.name && formik.errors.name && <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>}
                </div>
                
                {/* Headline field */}
                <div>
                  <label htmlFor="headLine" className="block text-sm font-medium mb-1">العنوان المهني</label>
                  <SelectField
                    name="headLine"
                    options={["software developer", "frontend", "backend", "fullstack", "mobile developer", "game developer", "Ai", "cyberSecurity", "dataScientist", "other"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full"
                  />
                  {formik.touched.headLine && formik.errors.headLine && <div className="text-red-500 text-xs mt-1">{formik.errors.headLine}</div>}
                </div>
                
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                  <InputField
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                </div>
                
                {/* Phone field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">رقم الهاتف</label>
                  <InputField
                    id="phone"
                    type="string"
                    name="phone"
                    placeholder="01234567890"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
                </div>
                
                {/* Country field */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">البلد</label>
                  <InputField
                    id="country"
                    type="text"
                    name="country"
                    placeholder="البلد"
                    value={formik.values.country}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.country && formik.errors.country && <div className="text-red-500 text-xs mt-1">{formik.errors.country}</div>}
                </div>
                
                {/* LinkedIn field */}
                <div>
                  <label htmlFor="linkedinLink" className="block text-sm font-medium mb-1">رابط LinkedIn</label>
                  <InputField
                    id="linkedinLink"
                    type="url"
                    name="linkedinLink"
                    placeholder="https://linkedin.com/in/username"
                    value={formik.values.linkedinLink}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.linkedinLink && formik.errors.linkedinLink && <div className="text-red-500 text-xs mt-1">{formik.errors.linkedinLink}</div>}
                </div>  
                
                {/* GitHub field */}
                <div>
                  <label htmlFor="githubLink" className="block text-sm font-medium mb-1">رابط GitHub</label>
                  <InputField
                    id="githubLink"
                    type="url"
                    name="githubLink"
                    placeholder="https://github.com/username"
                    value={formik.values.githubLink}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                  {formik.touched.githubLink && formik.errors.githubLink && <div className="text-red-500 text-xs mt-1">{formik.errors.githubLink}</div>}
                </div>
              </div>
              
              {/* Submit button */}
              <Button
                ariaLabel="حفظ التغييرات"
                type="submit"
                text="حفظ التغييرات"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-blue-400"
              />
            </div>
          </form>
       
     
    </div>
  )
}
