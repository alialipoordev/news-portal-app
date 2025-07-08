import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsCardPreviewProps {
  item: {
    _id: string;
    image: string;
    category: string;
    slug: string;
    title: string;
    date: string;
    writerName: string;
  };
  type?: string;
}

function NewsCardPreview({ item, type }: NewsCardPreviewProps) {
  return (
    <div className="group relative">
      <div className="overflow-hidden">
        <div
          className={`${
            type ? "h-[270px] sm:h-[470px]" : "h-[228px]"
          } w-full group-hover:scale-[1.1] transition-all duration-[1s] relative`}
        >
          <Image
            fill
            src={item.image || "/news.jpg"}
            alt="images"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
      <div className="left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2">
        <div className="px-[6px] py-[2px] rounded-md text-[13px] bg-[#c80000]">
          {item.category}
        </div>
        <Link href={`/news/${item.slug}`} className="text-xl">
          {item.title}
        </Link>
        <div className="flex gap-x-2 text-sm font-medium">
          <span>{item.date}</span>
          <span>{item.writerName}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCardPreview;
