import React from "react";
import NewsDetailsCard from "./NewsDetailsCard";
import Title from "./Title";

function PopularNews() {
  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="Popular News" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3">
          {[1, 2, 3, 4].map((item, i) => (
            <NewsDetailsCard item={item} key={i} height={230} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
