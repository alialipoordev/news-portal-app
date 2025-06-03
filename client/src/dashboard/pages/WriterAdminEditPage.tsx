import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../config/config";
import storeContext from "../../context/storeContext";
import axios from "axios";
import { ErrorAxios } from "../../types";

function WriterAdminEditPage() {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate();
  const { store } = useContext(storeContext);
  const { id } = useParams();

  function inputChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    const getWriterData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/news/writer/${id}`, {
          headers: { Authorization: `Bearer ${store.token}` },
        });
        setFormData({
          ...data.writer,
        });
      } catch {
        toast.error("Failed to load writer data!");
      }
    };

    getWriterData();
  }, [id]);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/update/writer/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      setLoader(false);
      toast.success(data.message);
      navigate("/dashboard/writers");
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
      setLoader(false);
    }
  }

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-semibold">Edit Writers</h2>
        <Link
          className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
          to="/dashboard/writers"
        >
          Writers
        </Link>
      </div>

      <div className="p-4">
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="name"
                className="text-md font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                value={formData.name}
                onChange={inputChangeHandler}
                required
                type="text"
                placeholder="Name"
                name="name"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                id="name"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="category"
                className="text-md font-semibold text-gray-600"
              >
                Category
              </label>
              <select
                value={formData.category}
                onChange={inputChangeHandler}
                required
                name="category"
                id="category"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
              >
                <option value="">--- Select Category ---</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Health">Health</option>
                <option value="International">International</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={inputChangeHandler}
                required
                type="email"
                placeholder="Email"
                name="email"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                id="email"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="role"
                className="text-md font-semibold text-gray-600"
              >
                Category
              </label>
              <select
                value={formData.role}
                onChange={inputChangeHandler}
                required
                name="role"
                id="role"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
              >
                <option value="">--- Select Role ---</option>
                <option value="admin">Admin</option>
                <option value="writer">Writer</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={loader}
              className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
            >
              {loader ? (
                <ImSpinner8 className="animate-spin" />
              ) : (
                "Update Writer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriterAdminEditPage;
