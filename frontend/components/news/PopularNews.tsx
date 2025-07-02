import React from "react";
import NewsDetailsCard from "./NewsDetailsCard";
import Title from "./Title";
import BASE_URL from "@/config/config";

async function PopularNews() {
  const res = await fetch(`${BASE_URL}/api/public/popular/news`, {
    next: {
      revalidate: 1,
    },
  });
  const { popularNews } = await res.json();

  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="Popular News" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3">
          {popularNews.map((item) => (
            <div key={item._id}>
              <NewsDetailsCard news={item} height={230} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
