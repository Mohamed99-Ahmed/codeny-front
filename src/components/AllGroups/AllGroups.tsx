import React from "react";
import SingleGroup from "../SingleGroup/SingleGroups";

export default function AllGroups() {
  return (
    <>
      <section className="grid md:grid-cols-2  gap-6">
        <SingleGroup />
      </section>
    </>
  );
}
