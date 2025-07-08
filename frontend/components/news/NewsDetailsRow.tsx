import React from "react";
import Title from "./Title";
import NewsDetailsCard from "./NewsDetailsCard";
import NewsCard from "./NewsCard";

interface NewsDetailsRowProps {
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

function NewsDetailsRow({ category, news }: NewsDetailsRowProps) {
  if (!news || news.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      <Title title={category} />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <NewsDetailsCard
          news={news[0]}
          showDescription={true}
          // height={300}
        />

        <div className="grid grid-cols-1 gap-2">
          {news.slice(1).map((item) => (
            <div key={item._id}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsDetailsRow;
