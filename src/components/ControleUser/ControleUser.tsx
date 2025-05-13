import Image from "next/image";
import React, { useContext } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import { User } from "@/types/responseTypes";
import userDefault from "../../../public/imgs/userDefault.png";
import { userContext } from "@/context/UserContext/UserContext";
type propsType = {
  user: User;
};
export default function ControleUser({ user }: propsType) {
  // handle image cover
    const handleImageCover = function() {
      if (user.photo) {
        return user.photo.startsWith("http")
          ? user.photo
          : `https://backend-three-nu-89.vercel.app/public/imgs/users/${user.photo}`;
      } else {
        return userDefault.src;
      }
    }
  const { deleteUser } = useContext(userContext);

  return (
    <figure className="flex relative flex-wrap overflow-hidden text-ellipsis  md:items-center gap-2 p-4  bg-white rounded-md hover:border hover:border-sColor">
      <Image
        src={handleImageCover()}
        alt="user image logo "
        className="w-[50px] h-[50px]"
        width={100}
        height={100}
      />
      <article className="space-y-2">
        <p>
          <span className="text-sColor">الاسم : </span>
          <span className="text-gray-900">{user.name}</span>
        </p>
        <p>
          <span className="text-sColor">الايميل: </span>
          <span className="text-gray-900 break-words  flex flex-wrap">
            {user.email?.split("@")[0]}
          </span>
        </p>
        <p>
          <span className="text-sColor">الهوية : </span>
          <span
            className={`${
              user.role == "user"
                ? "text-gray-900"
                : "text-sColor font-semibold text-lg capitalize"
            }`}
          >
            {" "}
            {user.role}{" "}
          </span>
        </p>
        <p>
          <span className="text-sColor">الموقع : </span>
          <span className="text-gray-900"> {user.location}</span>
        </p>
        <p>
          <span className="text-sColor">رقم التليفون : </span>
          <span className="text-gray-500 font-semibold"> {user.phone}</span>
        </p>
      </article>
      {/* remove user only with authorize */}

      <DeleteButton
        className="absolute top-2 left-2 flex-wrap-reverse"
        onClick={() => {
          deleteUser(user._id as string);
        }}
      >
        ازاله
      </DeleteButton>
    </figure>
  );
}
