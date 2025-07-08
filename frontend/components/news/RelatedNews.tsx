import React from "react";
import NewsDetailsCard from "./NewsDetailsCard";
import Title from "./Title";

interface RelatedNewsProps {
  relatedNews: {
    _id?: string;
    image: string;
    category: string;
    slug: string;
    title: string;
    date: string;
    writerName: string;
    description: string;
  }[];
}

async function RelatedNews({ relatedNews }: RelatedNewsProps) {
  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="Related News" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3">
          {relatedNews?.map((item) => (
            <div key={item._id}>
              <NewsDetailsCard
                news={item}
                showDescription={false}
                // height={230}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedNews;
