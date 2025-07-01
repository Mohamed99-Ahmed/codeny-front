"use client";
import React, { useContext, useEffect } from "react";
import SingleGroup from "../SingleGroup/SingleGroups";
import { groupContext } from "@/api/GroupContext/groups.api";
import { favoriteContext } from "@/api/FavoriteContext/favorites.api";
import { groupType } from "@/types/group";
import { FavoriteType } from "@/types/favorite";

export default function AllGroups() {
  const { getAllGroups, groups } = useContext(groupContext);
  const { favGroups } = useContext(favoriteContext);

  useEffect(() => {
    getAllGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="grid md:grid-cols-2 gap-6">
      {groups?.map((group: groupType) => {
        let isFav = false;
        let idFav = undefined;
        if (favGroups) {
          const fav = favGroups.find(
            (fav: FavoriteType) => fav.typeId._id === group._id
          );
          if (fav) {
            isFav = true;
            idFav = fav._id;
          }
        }
        return (
          <SingleGroup
            idFav={idFav}
            key={group._id}
            group={group}
            hasFav={isFav}
          />
        );
      })}
    </section>
  );
}
