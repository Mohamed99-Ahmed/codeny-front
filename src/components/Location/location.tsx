import React from "react";
import { RiArrowLeftUpLine } from "react-icons/ri";
import { storeType } from "../../types/store.type";
type typePorps = {
  store: storeType;
};
export default function Location({ store }: typePorps) {
  return (
    <>
      <a
        href={store.link}
        className="p-4 bg-white rounded-md hover:border shadow-sm flex justify-between items-center  hover:border-sColor"
        target="_blank"
      >
        <article className="flex flex-col  gap-1">
          <h2 className="text-2xl font-bold text-gray-700">{store.name}</h2>
          <p className="text--sm text-gray-600">{store.description}</p>
        </article>
        <button aria-label="icon go to link">
          <RiArrowLeftUpLine className="text-3xl text-sColor" />
        </button>
      </a>
    </>
  );
}
