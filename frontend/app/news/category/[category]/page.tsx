import Breadcrumb from "@/components/news/Breadcrumb";
import CategoryList from "@/components/news/CategoryList";
import NewsDetailsCard from "@/components/news/NewsDetailsCard";
import RecentNews from "@/components/news/RecentNews";
import SearchBox from "@/components/news/SearchBox";
import PopularNews from "@/components/news/PopularNews";
import React from "react";
import BASE_URL from "@/config/config";
import { formatText } from "@/utils/formatText";

type ParamsPromise = Promise<{ category: string }>;

interface PageProps {
  params: ParamsPromise;
}

interface NewsItem {
  image: string;
  category: string;
  slug: string;
  title: string;
  date: string;
  writerName: string;
  description: string;
}

async function page({ params }: PageProps) {
  const { category } = await params;
  const res = await fetch(
    `${BASE_URL}/api/public/news/category/${formatText(category)}`,
    {
      next: {
        revalidate: 1,
      },
    }
  );
  const { news }: { news: NewsItem[] } = await res.json();

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={formatText(category)} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {news.map((item, i) => (
                    <div key={i}>
                      <NewsDetailsCard
                        news={item}
                        showDescription={true}
                        // height={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8 mt-4 xl:mt-0">
                  <SearchBox />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <CategoryList titleStyle="text-gray-700 font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <PopularNews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
