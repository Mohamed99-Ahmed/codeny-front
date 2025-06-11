"use client";
import React, { useContext, useEffect } from "react";
import SingleGroup from "../SingleGroup/SingleGroups";
import { groupContext } from "@/app/api/GroupContext/groups.api";
import { groupType } from "@/types/group";

export default function AllGroups() {
  const { getAllGroups, groups } = useContext(groupContext);

  useEffect(() => {
    getAllGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="grid md:grid-cols-2 gap-6">
      {groups?.map((group: groupType) => (
        <SingleGroup key={group._id} group={group} />
      ))}
    </section>
  );
}
