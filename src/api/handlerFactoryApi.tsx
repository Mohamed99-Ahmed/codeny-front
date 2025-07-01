// getAll
"use client";
import axios from "axios";

import toast from "react-hot-toast";
const BaseUrl = "https://codeny-backend.vercel.app";
// get All  function
async function getAll(EndPoint: string) {
  try {
    const options = {
      url: `${BaseUrl}/${EndPoint}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    console.log("data", data);
    if (data.status === "success") {
      return data.data.data;
    }
  } catch (err) {
    let errorMessage = "حدث خطأ غير متوقع";

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage);
    return null;
  }
}
//  get One function
async function getOne(EndPoint: string, id: string) {
  try {
    const options = {
      url: `${BaseUrl}/${EndPoint}/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    if (data.status === "success") {
      return data.data.data;
    }
  } catch (err) {
    let errorMessage = "حدث خطأ غير متوقع";

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage);
  }
}
//   delet one funciton
async function deleteOne(EndPoint: string, id: string, token: string) {
  try {
    const options = {
      url: `${BaseUrl}/${EndPoint}/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.request(options);
    if (data.status === "success") {
      toast.success("تمت الازالة بنجاح");
    }
  } catch (err) {
    let errorMessage = "حدث خطأ غير متوقع";

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage);
  }
}
// delet All funciton
async function deleteAll(EndPoint: string, token: string) {
  try {
    const options = {
      url: `${BaseUrl}/${EndPoint}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.request(options);
    if (data.status === "success") {
      toast.success("تمت الازالة بنجاح");
    }
  } catch (err) {
    let errorMessage = "حدث خطأ غير متوقع";

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage);
  }
}
//   update One funciton
async function updateOne(
  EndPoint: string,
  id: string,
  token: string,
  bodyData: FormData | JSON
) {
  try {
    const options = {
      url: `${BaseUrl}/${EndPoint}/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(!(bodyData instanceof FormData) && {
          "Content-Type": "application/json",
        }),
      },
      data: bodyData,
    };
    const { data } = await axios.request(options);
    if (data.status === "success") {
      toast.success("تم التعديل بنجاح");
      return data.data;
    }
  } catch (err) {
    let errorMessage = "حدث خطأ غير متوقع";

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage);
  }
}
//   update One funciton
async function createOne(EndPoint: string, token: string, bodyData: object) {
  try {
    const options = {
      url: `${BaseUrl}/${EndPoint}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: bodyData,
    };
    const { data } = await axios.request(options);
    if (data.status === "success") {
      toast.success("تم الانشاء بنجاح");
      return data.data;
    }
  } catch (err) {
    let errorMessage = "حدث خطأ غير متوقع";

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    toast.error(errorMessage);
  }
}

export { getAll, getOne, deleteOne, updateOne, deleteAll, createOne, BaseUrl };
