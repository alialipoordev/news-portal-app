import Marquee from "react-fast-marquee";
import Link from "next/link";
import LoadingSpinner from "react-spinners-components";

const headlines = [
  { id: 1, title: "Breaking: React 19 Released!", link: "/news/1" },
  { id: 2, title: "Global Climate Conference Starts Today", link: "/news/2" },
  { id: 3, title: "Local Election Results Announced", link: "/news/3" },
];

const NewsHeadline = () => {
  return (
    <div className="bg-white shadow flex flex-wrap">
      <div className="flex md:w-[170px] w-full bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30">
        <div className="md:pl-4 w-full py-2 flex justify-start items-center gap-x-1">
          <span>
            <LoadingSpinner
              type="Ripple"
              colors={["#800000", "#c80000"]}
              size={"30px"}
            />
          </span>
          <h2 className="text-[#333333] font-semibold text-lg">Headlines</h2>
        </div>
      </div>

      <div className="flex md:w-[calc(100%-170px)] w-full">
        <div className="flex w-full justify-start items-center bg-blue-200">
          <Marquee
            gradient={false}
            pauseOnHover
            speed={50}
            className="text-sm tracking-wide overflow-hidden"
          >
            {headlines.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="py-3 font-semibold hover:text-[#c80000] pr-12 text-sm"
              >
                {item.title}
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default NewsHeadline;
