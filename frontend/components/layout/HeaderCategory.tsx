"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { IoMdCloseCircle, IoMdList } from "react-icons/io";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import HeaderSearchBox from "./HeaderSearchBox";

interface HeaderCategoryProps {
  categories: { count: number; category: string }[];
}

const HeaderCategory = ({ categories }: HeaderCategoryProps) => {
  const path = usePathname();
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const isActive = (route: string) => (path === route ? "bg-[#00000026]" : "");

  const renderLinks = (isMobile: boolean = false) => (
    <>
      <Link
        className={`${isMobile ? "px-4" : "px-6"} font-medium py-[${
          isMobile ? "5px" : "13px"
        }] ${isActive("/")}`}
        href="/"
      >
        Home
      </Link>
      {categories?.map((c, index) => (
        <Link
          key={index}
          className={`${isMobile ? "px-4" : "px-6"} font-medium py-[${
            isMobile ? "5px" : "13px"
          }] ${isActive(`/${c.category.toLowerCase()}`)}`}
          href={`/news/category/${c.category.toLowerCase()}`}
        >
          {c.category}
        </Link>
      ))}
    </>
  );

  return (
    <div className="w-full">
      <div className="bg-[#5271ff] text-white uppercase font-semibold relative">
        <div className="flex justify-between items-center h-[50px] relative">
          <button
            onClick={() => setCategoryVisible(!categoryVisible)}
            className={`text-3xl flex lg:hidden font-bold h-full w-[50px] cursor-pointer justify-center items-center hover:bg-[#00000026] ${
              categoryVisible ? "bg-[#00000026]" : ""
            }`}
            aria-label="Toggle categories"
          >
            <IoMdList />
          </button>

          <nav className="px-8 hidden lg:flex flex-wrap">
            {renderLinks(false)}
          </nav>

          <div className="h-full w-[50px]">
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className={`text-xl font-bold h-full w-full flex justify-center items-center cursor-pointer hover:bg-[#00000026] ${
                searchVisible ? "bg-[#00000026]" : ""
              }`}
              aria-label="Toggle search"
            >
              {searchVisible ? <IoMdCloseCircle /> : <FaSearch />}
            </button>

            <div
              className={`absolute lg:block top-[50px] z-31 w-full lg:w-[300px] lg:right-10 right-0 transition-all shadow-lg text-slate-700 ${
                searchVisible ? "visible" : "invisible"
              }`}
            >
              <HeaderSearchBox />
            </div>
          </div>
        </div>
      </div>

      {categoryVisible && (
        <div className="flex flex-wrap lg:hidden py-2 px-[30px]">
          {renderLinks(true)}
        </div>
      )}
    </div>
  );
};

export default HeaderCategory;
