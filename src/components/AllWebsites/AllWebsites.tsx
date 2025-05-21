import React from "react";
import SingleWebsite from "../SingleWebsite/SingleWebsite";

export default function AllWebsites() {
  return (
    <>
      <section className="grid md:grid-cols-2  gap-6">
        <SingleWebsite />
        <SingleWebsite />
        <SingleWebsite />
        <SingleWebsite />
        <SingleWebsite />
      </section>
    </>
  );
}
