import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsCardProps {
  item: {
    image: string;
    category: string;
    slug: string;
    title: string;
    date: string;
    writerName: string;
  };
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="bg-[#e5effe] shadow-md rounded-md flex p-4 hover:shadow-md transition-shadow duration-300">
      <div className="relative flex-shrink-0 overflow-hidden rounded-md group">
        <div className="group-hover:scale-110 transform transition-transform duration-700 w-[100px] md:w-[160px] h-[93px] lg:w-[100px] relative">
          <Image
            fill
            src={item?.image || "/news.jpg"}
            alt="images"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 cursor-pointer bg-black bg-opacity-20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-md"></div>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-4 w-full">
        <Link
          href={`/news/category/${item?.category?.toLowerCase()}`}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          {item?.category}
        </Link>

        <Link
          href={`/news/${item?.slug}`}
          className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          {item?.title}
        </Link>
        <div className="flex gap-x-3 text-xs text-gray-500">
          <span className="font-semibold">{item?.date}</span>
          <span className="font-semibold">{item?.writerName}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
