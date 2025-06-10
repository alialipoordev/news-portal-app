import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteNews, fetchNews, updateNewsStatus } from "../api/news.api";
import { ErrorAxios, NewsArticle } from "../types";

const useNews = (token: string | null, statusFilter: string) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);

  const getNews = useCallback(async () => {
    try {
      const newsData = await fetchNews(token);
      setAllNews(newsData);
      setNews(newsData);
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
    }
  }, [token]);

  const handleDeleteNews = async (id: string) => {
    if (!window.confirm("Are your sure to delete news?")) return;
    try {
      const { message } = await deleteNews(id, token);
      toast.success(message);
      getNews();
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
    }
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "pending"
        ? "active"
        : currentStatus === "active"
        ? "inactive"
        : "pending";

    try {
      const { message } = await updateNewsStatus(id, nextStatus, token);
      toast.success(message);

      const updatedNews = await fetchNews(token);
      setAllNews(updatedNews);
      setNews(
        statusFilter
          ? updatedNews.filter(
              (item: NewsArticle) => item.status === statusFilter
            )
          : updatedNews
      );
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return {
    news,
    allNews,
    setNews,
    // setAllNews,
    // getNews,
    handleDeleteNews,
    handleStatusChange,
  };
};

export default useNews;
