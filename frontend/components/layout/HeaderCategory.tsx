"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { IoMdCloseCircle, IoMdList } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

import HeaderSearchBox from "./HeaderSearchBox";

interface HeaderCategoryProps {
  categories: { count: number; category: string }[];
}

const HeaderCategory = ({ categories }: HeaderCategoryProps) => {
  const path = usePathname();
  const router = useRouter();
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const isActive = (route: string) =>
    path === route ? "bg-[#00000026] text-blue-400" : "";

  const renderLinks = (isMobile: boolean = false) => (
    <>
      <Link
        className={`${
          isMobile ? "px-4" : "px-6"
        } font-medium hover:text-blue-300 py-[${
          isMobile ? "5px" : "13px"
        }] ${isActive("/")}`}
        href="/"
      >
        Home
      </Link>
      {categories?.map((c, index) => (
        <Link
          key={index}
          className={`${
            isMobile ? "px-4" : "px-6"
          } font-medium hover:text-blue-300 py-[${
            isMobile ? "5px" : "13px"
          }] ${isActive(`/news/category/${c.category.toLowerCase()}`)}`}
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

          <nav className="px-4 hidden lg:flex xl:px-8">
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

      <AnimatePresence>
        {categoryVisible && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black opacity-60"
              onClick={() => setCategoryVisible(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "circInOut" }}
              className="absolute left-0 top-0 h-full w-[16rem] bg-[#5271ff] text-white shadow-lg z-50 p-4 overflow-y-auto"
            >
              <button
                className="text-white text-2xl absolute top-4 right-4 cursor-pointer"
                onClick={() => setCategoryVisible(false)}
                aria-label="Close menu"
              >
                <IoMdCloseCircle />
              </button>
              <nav className="flex flex-col justify-between mt-10">
                <div className="flex flex-col gap-2">{renderLinks(true)}</div>

                <button
                  onClick={() => router.push("/client/login")}
                  className="mt-6 w-full py-2 bg-white text-[#5271ff] font-semibold rounded hover:bg-blue-600 hover:text-white cursor-pointer transition"
                >
                  Login
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderCategory;
