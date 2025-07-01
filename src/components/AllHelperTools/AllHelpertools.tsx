"use client";
import React, { useContext, useEffect } from "react";
import SingleHelperTool from "../SingleHelperTool/SingleHelperTool";
import { helperToolContext } from "@/api/HelperToolContext/helperTools.api";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";
import { helperToolType } from "@/types/helperTool";
import { FavoriteType } from "@/types/favorite";

export default function AllHelpertools() {
  const { getAllHelperTools, helperTools } = useContext(helperToolContext);
  const { favHerlperTools } = useContext(favoriteContext);

  useEffect(() => {
    getAllHelperTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {helperTools?.map((tool: helperToolType) => {
        let isFav = false;
                let idFav = undefined;
                if (favHerlperTools) {
                  const fav = favHerlperTools.find(
                    (fav: FavoriteType) => fav.typeId._id === tool._id
                  );
                  if (fav) {
                    isFav = true;
                    idFav = fav._id;
                  }
                }
        return <SingleHelperTool idFav={idFav} key={tool._id} tool={tool} hasFav={isFav} />;
      })}
    </div>
  );
}
