import LatestNews from "@/components/news/LatestNews";
import NewsCard from "@/components/news/NewsCard";
import NewsCardPreview from "@/components/news/NewsCardPreview";
import NewsDetails from "@/components/news/NewsDetails";
import NewsDetailsCol from "@/components/news/NewsDetailsCol";
import NewsDetailsRow from "@/components/news/NewsDetailsRow";
import PopularNews from "@/components/news/PopularNews";
import Title from "@/components/news/Title";
import BASE_URL from "@/config/config";

export default async function Home() {
  const res = await fetch(`${BASE_URL}/api/public/all/news`, {
    next: { revalidate: 5 },
  });

  const data = await res.json();
  const allNews = data.news;
  
  return (
    <main>
      <div className="bg-slate-100">
        <div className="px-4 md:px-8 py-8">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12">
              <LatestNews />
            </div>

            <div className="w-full lg:w-6/12 mt-5 lg:mt-5">
              <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                <Title title="Technology" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {allNews["Technology"].map((item) => (
                    <div key={item._id}>
                      <NewsCardPreview item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <PopularNews />
          {/* first Section  */}
          <div className="w-full">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-8/12">
                <NewsDetailsRow category="Sports" news={allNews["Sports"]} />
                <NewsDetails category="Health" news={allNews["Health"]} />
              </div>

              <div className="w-full lg:w-4/12">
                <NewsDetailsCol
                  category="Education"
                  news={allNews["Education"]}
                />
              </div>
            </div>
          </div>

          {/* 2nd Section  */}
          <div className="w-full">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12">
                <div className="pl-3">
                  <NewsDetailsCol
                    category="Business"
                    news={allNews["Business"]}
                  />
                </div>
              </div>

              <div className="w-full lg:w-8/12">
                <div className="pl-3">
                  <NewsDetailsRow category="Travel" news={allNews["Travel"]} />
                  <NewsDetails
                    category="International"
                    news={allNews["International"]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3nd Section  */}
          <div className="w-full">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-8/12 mb-3">
                <NewsDetailsRow
                  category="Technology"
                  news={allNews["Technology"]}
                />
              </div>

              <div className="w-full lg:w-4/12">
                <div className="pl-3">
                  <Title title="Recent News" />
                  <div className="grid grid-cols-1 gap-y-[8px] mt-2">
                    {allNews["Health"].map((item, i) => (
                      <div key={i}>
                        <NewsCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
