import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import storeContext from "../../context/storeContext";
import BASE_URL from "./../../config/config";
import { ErrorAxios, WriterUser } from "../../types";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

function WritersPage() {
  const [writers, setWriters] = useState([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { store } = useContext(storeContext);

  const getWriters = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/news/writers`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setWriters(data.writers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWriters();
  }, []);

  async function handleDeleteWriter(id: string) {
    if (!window.confirm("Are your sure to delete writer?")) return;
    setDeletingId(id);

    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/delete/writer/${id}`,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      toast.success(data.message);
      getWriters();
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-400">
        <h2 className="text-2xl font-semibold text-gray-800">Writers</h2>
        <Link
          to="/dashboard/writer/add"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition duration-300"
        >
          Add Writer
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-4 px-6 text-left">No</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Category</th>
              <th className="py-4 px-6 text-left">Role</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {writers.map((item: WriterUser, index) => (
              <tr key={item._id} className="border-t">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{item.name} </td>
                <td className="py-4 px-6">{item.category}</td>
                <td className="py-4 px-6">{item.role}</td>
                <td className="py-4 px-6">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={profile}
                    alt="news"
                  />
                </td>

                <td className="py-4 px-6">{item.email}</td>
                <td className="py-4 px-6">
                  <div className="flex gap-3 text-gray-500">
                    <Link
                      to={`/dashboard/writer/edit/${item._id}`}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteWriter(item._id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-800"
                    >
                      {deletingId === item._id ? (
                        <ImSpinner8 className="animate-spin" />
                      ) : (
                        <FaTrashAlt />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WritersPage;
