import React from "react";
import Title from "./Title";
import NewsDetailsCard from "./NewsDetailsCard";
import NewsCard from "./NewsCard";

interface NewsDetailsColProps {
  category: string;
  news: {
    _id: string;
    image: string;
    category: string;
    slug: string;
    title: string;
    date: string;
    writerName: string;
    description: string;
  }[];
}

function NewsDetailsCol({ category, news }: NewsDetailsColProps) {
  if (!news || news.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-6">
        <NewsDetailsCard
          news={news[0]}
          showDescription={true}
          // height={300}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-[8px] mb-3">
        {news.slice(1).map((item) => (
          <div key={item._id}>
            <NewsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsDetailsCol;
