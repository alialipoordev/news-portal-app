import React from "react";
import Title from "./Title";
import NewsDetailsCard from "./NewsDetailsCard";
import NewsCard from "./NewsCard";

function NewsDetailsRow({ category }: { category: string }) {
  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      <Title title={category} />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <NewsDetailsCard showDescription={true} height={300} />

        <div className="grid grid-cols-1 gap-2">
          {[1, 2, 3].map((item, i) => (
            <div key={i}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsDetailsRow;
