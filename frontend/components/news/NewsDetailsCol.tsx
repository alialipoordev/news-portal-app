import React from "react";
import Title from "./Title";
import NewsDetailsCard from "./NewsDetailsCard";
import NewsCard from "./NewsCard";

function NewsDetailsCol({ category }: { category: string }) {
  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-6">
        <NewsDetailsCard showDescription={true} height={300} />
      </div>
      <div className="grid grid-cols-1 gap-y-[8px] mb-3">
        {[1, 2, 3, 4].map((item, i) => (
          <div key={i}>
            <NewsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsDetailsCol;
