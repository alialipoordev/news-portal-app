import Breadcrumb from "@/components/news/Breadcrumb";
import CategoryList from "@/components/news/CategoryList";
import PopularNews from "@/components/news/PopularNews";
import RecentNews from "@/components/news/RecentNews";
import SearchBox from "@/components/news/SearchBox";
import SearchNews from "@/components/news/SearchNews";
import React from "react";

function page() {
  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="Search" />
        </div>
      </div>

      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <SearchNews />
              </div>
            </div>

            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8 mt-3 xl:mt-0">
                  <SearchBox />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <CategoryList titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <PopularNews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
