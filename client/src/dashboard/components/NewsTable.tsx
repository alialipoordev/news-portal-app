import { Link } from "react-router-dom";
import { convert } from "html-to-text";
import { NewsArticle } from "../../types";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import StatusBadge from "./StatusBadge";

interface NewsTableProps {
  role: "admin" | "writer";
  currentNews: NewsArticle[];
  handleDeleteNews?: (id: string) => Promise<void>;
  handleStatusChange?: (id: string, currentStatus: string) => Promise<void>;
}

function NewsTable({
  role,
  currentNews,
  handleDeleteNews,
  handleStatusChange,
}: NewsTableProps) {
  return (
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
          {!currentNews.length ? (
            <tr>
              <td
                colSpan={role === "admin" ? 9 : 8}
                className="py-4 px-6 text-gray-500 text-center"
              >
                No news items available.
              </td>
            </tr>
          ) : (
            currentNews.map((n, index) => (
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
                  <StatusBadge
                    status={n.status}
                    onClick={
                      role === "admin" && handleStatusChange
                        ? () => handleStatusChange(n._id, n.status)
                        : undefined
                    }
                    role={role as "admin" | "writer"}
                  />
                </td>

                <td className="py-4 px-6">
                  <div className="flex gap-3 text-gray-500">
                    <Link
                      to="#"
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                    >
                      <FaEye />
                    </Link>
                    {role === "writer" && (
                      <Link
                        to={`/dashboard/news/edit/${n._id}`}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                      >
                        <FaEdit />
                      </Link>
                    )}
                    {handleDeleteNews && (
                      <button
                        onClick={() => handleDeleteNews(n._id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NewsTable;
