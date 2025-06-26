import Link from "next/link";
import React from "react";

function FooterCategories() {
  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div
        className={`text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#5271ff] before:h-full before:-left-0 pl-3`}
      >
        Category
      </div>
      <div
        className={`flex flex-col justify-start items-start text-sm gap-y-3 text-white pt-1 `}
      >
        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <li className="list-none font-semibold" key={i}>
            <Link href={`/`} className="hover:text-blue-600 hover:underline">
              Category List
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default FooterCategories;
