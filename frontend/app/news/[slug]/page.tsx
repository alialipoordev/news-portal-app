import React from "react";
import BASE_URL from "@/config/config";

import Breadcrumb from "@/components/news/Breadcrumb";
import CategoryList from "@/components/news/CategoryList";
import RecentNews from "@/components/news/RecentNews";
import RelatedNews from "@/components/news/RelatedNews";
import SearchBox from "@/components/news/SearchBox";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";

type ParamsPromise = Promise<{ slug: string }>;

interface DetailsPageProps {
  params: ParamsPromise;
}

async function DetailsPage({ params }: DetailsPageProps) {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/public/news/${slug}`, {
    next: {
      revalidate: 1,
    },
  });
  const { news, relatedNews } = await res.json();

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={news?.category} two={news?.title} />
        </div>
      </div>

      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-5 bg-white">
                  <img src={news?.image} alt="image" />
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-red-700 uppercase font-medium text-xl">
                      {news?.category}
                    </h3>
                    <h2 className="text-3xl text-gray-700 font-bold">
                      {news?.title}
                    </h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span className="font-bold">{news?.date}</span>
                      <span className="font-bold">By {news?.writerName}</span>
                    </div>
                    <div>{parse(news?.description)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8 mt-4 xl:mt-0">
                  <SearchBox />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <CategoryList titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 xl:pt-8">
            <RelatedNews relatedNews={relatedNews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
