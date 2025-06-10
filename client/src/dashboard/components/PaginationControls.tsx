import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  newsPerPage: number;
  setNewsPerPage: (count: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  newsPerPage,
  setNewsPerPage,
}) => {
  return (
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
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <IoIosArrowBack
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className={`w-8 h-8 p-1 rounded-md transition-all duration-150 shadow-sm ${
              currentPage === 1
                ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
            }`}
          />
          <IoIosArrowForward
            onClick={() => {
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            className={`w-8 h-8 p-1 rounded-md transition-all duration-150 shadow-sm ${
              currentPage >= totalPages
                ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
