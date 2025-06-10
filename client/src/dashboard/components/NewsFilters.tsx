import { useRef, useCallback, Dispatch, SetStateAction } from "react";
import { NewsArticle } from "../../types";

interface NewsFiltersProps {
  allNews: NewsArticle[];
  setNews: Dispatch<SetStateAction<NewsArticle[]>>;
  setCurrentPage: (page: number) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

function NewsFilters({
  allNews,
  setNews,
  setCurrentPage,
  statusFilter,
  setStatusFilter,
}: NewsFiltersProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  // Handle search filter
  const handleSearch = useCallback(() => {
    const keyword = searchRef.current?.value.toLowerCase() || "";
    let filtered = allNews;

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Apply search filter
    if (keyword) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(keyword)
      );
    }

    setNews(filtered);
    setCurrentPage(1);
  }, [allNews, statusFilter]);

  // Handle status filter change
  const handleStatusFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value;
      setStatusFilter(selected);
      const filtered = selected
        ? allNews.filter((item) => item.status === selected)
        : allNews;
      setNews(filtered);
      setCurrentPage(1);
    },
    [allNews]
  );

  return (
    <div className="flex items-center gap-4 mb-6">
      <select
        value={statusFilter}
        onChange={handleStatusFilter}
        name="status"
        className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        aria-label="Filter news by status"
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
        aria-label="Search news by title"
      />
    </div>
  );
}

export default NewsFilters;
