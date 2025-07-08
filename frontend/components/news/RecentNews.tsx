import React from "react";
import Title from "./Title";
import NewsCard from "./NewsCard";
import BASE_URL from "@/config/config";

interface NewsItem {
  image: string;
  category: string;
  slug: string;
  title: string;
  date: string;
  writerName: string;
}

async function RecentNews() {
  const res = await fetch(`${BASE_URL}/api/public/recent/news`, {
    next: {
      revalidate: 1,
    },
  });

  const { news }: { news: NewsItem[] } = await res.json();

  return (
    <div className="w-full flex flex-col gap-y-[6px] bg-white pt-4">
      <div className="pl-4">
        <Title title="Recent News" />
      </div>
      <div className="grid grid-cols-1 gap-y-1">
        {news?.map((item, i) => (
          <div key={i}>
            <NewsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentNews;
