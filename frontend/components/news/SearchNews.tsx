"use client";

import React, { useEffect, useState } from "react";
import NewsDetailsCard from "./NewsDetailsCard";
import { useSearchParams } from "next/navigation";
import BASE_URL from "@/config/config";

function SearchNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchValue = useSearchParams();
  const value = searchValue.get("value");

  const getSearchNews = async () => {
    if (!value) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/public/search/news?value=${value}`
      );
      const data = await res.json();
      setNews(data.news || []);
    } catch (error) {
      console.error("Search failed:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchNews();
  }, [value]);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {news.length > 0 ? (
        news.map((item, i) => (
          <div key={i}>
            <NewsDetailsCard showDescription={true} news={item} height={200} />
          </div>
        ))
      ) : (
        <p>News not found</p>
      )}
    </div>
  );
}

export default SearchNews;
