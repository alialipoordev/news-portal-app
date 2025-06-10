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

function NewsContent() {
  const { store } = useContext(storeContext);
  const role = store.userInfo?.role;

  // News State
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(5);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.max(1, Math.ceil(news.length / newsPerPage));

  // Search State
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter State
  const [statusFilter, setStatusFilter] = useState("");

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setAllNews(data.news);
      setNews(data.news);
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
    }
  };

  async function handleDeleteNews(id: string) {
    if (!window.confirm("Are your sure to delete news?")) return;

    try {
      const { data } = await axios.delete(`${BASE_URL}/api/news/delete/${id}`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      toast.success(data.message);
      getNews();
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
    }
  }

  const handleSearch = () => {
    const keyword = searchRef.current?.value.toLowerCase() || "";
    if (!keyword) {
      setNews(allNews);
      setCurrentPage(1);
      return;
    }

    const filtered = allNews.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
    setNews(filtered);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setStatusFilter(selected);

    if (!selected) {
      setNews(allNews);
      setCurrentPage(1);
      return;
    }

    const filtered = allNews.filter((item) => item.status === selected);
    setNews(filtered);
    setCurrentPage(1);
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "pending"
        ? "active"
        : currentStatus === "active"
        ? "inactive"
        : "pending";

    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/news/status/${id}`,
        { status: nextStatus },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      toast.success(data.message);

      const res = await axios.get(`${BASE_URL}/api/news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });

      const updatedNews = res.data.news;
      setAllNews(updatedNews);

      if (statusFilter) {
        const filtered = updatedNews.filter(
          (item: NewsArticle) => item.status === statusFilter
        );
        setNews(filtered);
      } else {
        setNews(updatedNews);
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex items-center gap-4 mb-6">
        <select
          onChange={handleStatusFilter}
          name="status"
          className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--- Select Status ---</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
        </select>
        <input
          ref={searchRef}
          onChange={handleSearch}
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
            {currentNews.map((n, index) => (
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
                  {role === "admin" ? (
                    <span
                      onClick={() => handleStatusChange(n._id, n.status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all
                        ${
                          n.status === "active"
                            ? "bg-green-200 text-green-800 hover:bg-green-300"
                            : n.status === "pending"
                            ? "bg-blue-200 text-blue-800 hover:bg-blue-300"
                            : "bg-red-200 text-red-700 hover:bg-red-300"
                        }
                      `}
                    >
                      {n.status}
                    </span>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          n.status === "active"
                            ? "bg-green-200 text-green-800"
                            : n.status === "pending"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-red-200 text-red-800"
                        }
                      `}
                    >
                      {n.status}
                    </span>
                  )}
                </td>

                <td className="py-4 px-6">
                  <div className="flex gap-3 text-gray-500">
                    <Link
                      to="#"
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                    >
                      <FaEye />
                    </Link>
                    {store.userInfo?.role === "writer" && (
                      <Link
                        to={`/dashboard/news/edit/${n._id}`}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                      >
                        <FaEdit />
                      </Link>
                    )}
                    <button
                      onClick={() => handleDeleteNews(n._id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-800"
                    >
                      <FaTrashAlt />
                    </button>
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
              value={newsPerPage}
              onChange={(e) => {
                setNewsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
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
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <IoIosArrowBack
                onClick={() =>
                  currentPage > 1 && setCurrentPage((prev) => prev - 1)
                }
                className={`w-8 h-8 p-1 rounded-md transition-all duration-150 shadow-sm
                  ${
                    currentPage === 1
                      ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
                  }`}
              />
              <IoIosArrowForward
                onClick={() => {
                  if (currentPage < totalPages)
                    setCurrentPage((prev) => prev + 1);
                }}
                className={`w-8 h-8 p-1 rounded-md transition-all duration-150 shadow-sm
                  ${
                    currentPage >= totalPages
                      ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
                  }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsContent;
