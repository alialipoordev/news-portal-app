import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/config";
import storeContext from "../../context/storeContext";
import useNews from "../../hooks/useNews";
import NewsTable from "../components/NewsTable";
import PaginationControls from "../components/PaginationControls";

type StatItem = {
  title: string;
  value: number;
  color: string;
};

function WriterPage() {
  const { store } = useContext(storeContext);
  const role = store.userInfo?.role;
  const { news } = useNews(store.token);

  const [newsStatistics, setNewsStatistics] = useState({
    totalNews: 0,
    pendingNews: 0,
    activeNews: 0,
    inactiveNews: 0,
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(5);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.max(1, Math.ceil(news.length / newsPerPage));

  const statsData: StatItem[] = [
    {
      title: "Writer Total News",
      value: newsStatistics.totalNews,
      color: "text-red-500",
    },
    {
      title: "Writer Pending News",
      value: newsStatistics.pendingNews,
      color: "text-purple-500",
    },
    {
      title: "Writer Active News",
      value: newsStatistics.activeNews,
      color: "text-cyan-500",
    },
    {
      title: "Writer Inactive News",
      value: newsStatistics.inactiveNews,
      color: "text-blue-500",
    },
  ];

  const fetchNewsStatistics = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/news/statistics`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setNewsStatistics(data);
    } catch (error) {
      console.error("Error fetching news statistics:", error);
    }
  };

  useEffect(() => {
    fetchNewsStatistics();
  }, []);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((start, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center gap-2"
          >
            <span className={`text-4xl font-bold ${start.color}`}>
              {start.value}
            </span>
            <span className="text-md font-semibold text-gray-600">
              {start.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-gray-500">
          <h2 className="text-xl font-bold text-gray-600">Recent News</h2>
          <Link
            to="/dashboard/news"
            className="text-blue-500 hover:text-blue-800 font-semibold transition duration-300"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto mt-6">
          <NewsTable
            currentNews={currentNews}
            role={role as "admin" | "writer"}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            newsPerPage={newsPerPage}
            setCurrentPage={setCurrentPage}
            setNewsPerPage={setNewsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default WriterPage;
