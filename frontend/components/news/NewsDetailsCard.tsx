import Image from "next/image";
import Link from "next/link";
import React from "react";

function NewsDetailsCard({ showDescription }: { showDescription: boolean }) {
  return (
    <div className="bg-white shadow">
      <div className="group relative overflow-hidden">
        <div className="w-full h-[250px] group-hover:scale-[1.1] transition-all duration-[1s] relative">
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

        <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>

        <div className="left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2">
          <div className="px-[6px] py-[2px] rounded-md text-[13px] bg-[#c80000]">
            Category
          </div>
        </div>
      </div>
      <div className="p-5">
        <Link
          href={"/"}
          className="text-[15px] font-semibold text-[#333333] hover:text-[#c80000]"
        >
          What puzzles reveal about the depths of our own
        </Link>
        <div className="flex gap-x-2 text-xs font-normal text-slate-600">
          <span className="font-semibold">25-06-2025</span>
          <span className="font-semibold">By Ali Alipoor</span>
        </div>
        {showDescription && (
          <p className="text-sm text-slate-600 pt-3">
            The news that Margot Robbie and Jacob Elordi are starring in Emerald
            Fennell's take on Emily Brontë's romance has caused a storm – no
            surprise in an age of increased casting scrutiny.Add commentMore
            actions
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsDetailsCard;
