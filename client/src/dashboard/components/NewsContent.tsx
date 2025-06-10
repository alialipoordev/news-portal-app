import { useContext, useState } from "react";

import storeContext from "../../context/storeContext";
import useNews from "../../hooks/useNews";

import PaginationControls from "./PaginationControls";
import NewsFilters from "./NewsFilters";
import NewsTable from "./NewsTable";

function NewsContent() {
  const { store } = useContext(storeContext);
  const role = store.userInfo?.role;

  // Filter State
  const [statusFilter, setStatusFilter] = useState("");

  // News Hook
  const { news, allNews, setNews, handleDeleteNews, handleStatusChange } =
    useNews(store.token, statusFilter);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(5);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.max(1, Math.ceil(news.length / newsPerPage));

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <NewsFilters
        allNews={allNews}
        setNews={setNews}
        setCurrentPage={setCurrentPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <NewsTable
        handleDeleteNews={handleDeleteNews}
        handleStatusChange={handleStatusChange}
        role={role as "admin" | "writer"}
        currentNews={currentNews}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        newsPerPage={newsPerPage}
        setCurrentPage={setCurrentPage}
        setNewsPerPage={setNewsPerPage}
      />
    </div>
  );
}

export default NewsContent;
