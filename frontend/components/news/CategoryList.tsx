import BASE_URL from "@/config/config";
import Link from "next/link";
import React from "react";

async function CategoryList({ titleStyle }: { titleStyle: string }) {
  const res = await fetch(`${BASE_URL}/api/public/categories/all`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  const { categories } = await res.json();

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div
        className={`text-xl font-bold ${titleStyle} relative before:absolute before:w-[4px] before:bg-[#5271ff] before:h-full before:-left-0 pl-3`}
      >
        Category
      </div>
      <div
        className={`flex flex-col justify-start items-start text-sm gap-y-3 pt-1 ${titleStyle}`}
      >
        {categories?.map((item, i) => (
          <li className="list-none" key={i}>
            <Link
              href={`/news/category/${item.category.toLowerCase()}`}
              className="hover:text-blue-600 hover:underline"
            >
              {item.category} ({item.count})
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
