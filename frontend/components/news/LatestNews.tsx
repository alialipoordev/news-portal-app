"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NewsCardPreview from "./NewsCardPreview";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BASE_URL from "@/config/config";

type ButtonGroupProps = {
  next?: () => void;
  previous?: () => void;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-xl font-bold text-gray-800 relative pl-4">
        <span className="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-sm"></span>
        Latest News
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={previous}
          aria-label="Previous"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-800 shadow-md transition"
        >
          <FiChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-800 shadow-md transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

function LatestNews() {
  const [news, setNews] = useState([]);

  const getLatestNews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/public/latest/news`);
      const data = await res.json();
      setNews(data.latestNews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLatestNews();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full flex flex-col-reverse gap-3 pr-0 lg:pr-2">
      <Carousel
        autoPlay={true}
        arrows={false}
        responsive={responsive}
        infinite={true}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {news?.map((item, i) => (
          <div key={i}>
            <NewsCardPreview item={item} type="latest" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default LatestNews;
