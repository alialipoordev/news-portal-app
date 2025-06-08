import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { convert } from "html-to-text";
import axios from "axios";
import toast from "react-hot-toast";

import storeContext from "../../context/storeContext";
import BASE_URL from "../../config/config";
import { ErrorAxios, NewsArticle } from "../../types";

import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function NewsContent({ role }: { role: string }) {
  const { store } = useContext(storeContext);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);

  const hasFetchedRef = useRef(false);

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setAllNews(data.news);
      setNews(data.news);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    getNews();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex items-center gap-4 mb-6">
        <select
          name="status"
          className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--- Select Status ---</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
        </select>
        <input
          type="text"
          placeholder="Search News"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden ">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm ">
            <tr>
              <th className="py-4 px-6 text-left">No</th>
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Image</th>
              {role === "admin" && (
                <th className="py-4 px-6 text-left">Writer</th>
              )}
              <th className="py-4 px-6 text-left">Category</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {news.map((n, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">
                  {n.title.length < 15 ? n.title : `${n.title.slice(0, 15)}...`}
                </td>
                <td className="py-4 px-6">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={n.image}
                    alt="news"
                  />
                </td>
                {role === "admin" && (
                  <td className="py-4 px-6 text-left">{n.name}</td>
                )}
                <td className="py-4 px-6">{n.category}</td>
                <td className="py-4 px-6">
                  {n.description.length < 15
                    ? convert(n.description)
                    : `${convert(n.description).slice(0, 15)}...`}
                </td>
                <td className="py-4 px-6">{n.date}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-green-200 rounded-full text-xs font-semibold">
                    {n.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-3 text-gray-500">
                    <Link
                      to="#"
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to="#"
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to="#"
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-800"
                    >
                      <FaTrashAlt />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">News Per Page:</label>
            <select
              name="category"
              id="category"
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>6/10 of 5</span>
            <div className="flex gap-2">
              <IoIosArrowBack className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800" />
              <IoIosArrowForward className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsContent;
