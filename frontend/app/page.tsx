import LatestNews from "@/components/news/LatestNews";
import NewsCardPreview from "@/components/news/NewsCardPreview";
import Title from "@/components/news/Title";

export default function Home() {
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
                  {[1, 2, 3, 4].map((item, i) => (
                    <div key={i}>
                      <NewsCardPreview item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>Main Page</h1>
    </main>
  );
}
