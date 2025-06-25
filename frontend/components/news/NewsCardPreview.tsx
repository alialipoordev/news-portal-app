import Image from "next/image";
import Link from "next/link";
import React from "react";

function NewsCardPreview({ item, type }: { item: number; type?: string }) {
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
            src={
              "https://res.cloudinary.com/denxmcn0r/image/upload/v1749464325/news_images/e5mcnogby44mljxwdlty.webp"
            }
            alt="images"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
      <div className="left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2">
        <div className="px-[6px] py-[2px] rounded-md text-[13px] bg-[#c80000]">
          Category
        </div>
        <Link href={"/"} className="text-xl">
          What puzzles reveal about the depths of our own
        </Link>
        <div className="flex gap-x-2 text-sm font-medium">
          <span>25-09-2024</span>
          <span>By Ali Alipoor</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCardPreview;
