import React from "react";
import Title from "./Title";
import NewsDetailsCard from "./NewsDetailsCard";

function NewsDetails({ category }: { category: string }) {
  return (
    <div className="w-full flex flex-col gap-[14px] pr-2 py-8">
      <Title title={category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 lg:gap-x-3">
        <NewsDetailsCard showDescription={true} height={300} />
        <NewsDetailsCard showDescription={true} height={300} />
      </div>
    </div>
  );
}

export default NewsDetails;
