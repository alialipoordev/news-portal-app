"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function HeaderSearchBox() {
  const [state, setState] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/news?value=${state}`);
    setState("");
  };

  return (
    <div className="p-3 bg-white">
      <form className="flex" onSubmit={handleSubmit}>
        <div className="w-[calc(100%-45px)] h-[40px]">
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
            placeholder="Search"
            className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
          />
        </div>
        <button
          type="submit"
          className="w-[45px] h-[40px] flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white text-xl cursor-pointer outline-none"
          aria-label="Submit search"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default HeaderSearchBox;
