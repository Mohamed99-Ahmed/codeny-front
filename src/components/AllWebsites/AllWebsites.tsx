"use client";
import React, { useContext, useEffect } from "react";
import SingleWebsite from "../SingleWebsite/SingleWebsite";
import { websiteContext } from "@/api/WebsiteContext/websites.api";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";
import { websiteType } from "@/types/website";
import { FavoriteType } from "@/types/favorite";

export default function AllWebsites() {
  const { getAllWebsites, websites } = useContext(websiteContext);
  const { favWebsites } = useContext(favoriteContext);
  useEffect(() => {
    getAllWebsites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="grid md:grid-cols-2  gap-6">
        {websites?.map((website: websiteType) => {
       let isFav = false;
        let idFav = undefined;
        if (favWebsites) {
          const fav = favWebsites.find(
            (fav: FavoriteType) => fav.typeId._id === website._id
          );
          if (fav) {
            isFav = true;
            idFav = fav._id;
          }
        }          return (
            <SingleWebsite key={website._id} idFav={idFav} website={website} hasFav={isFav} />
          );
        })}
      </section>
    </>
  );
}
