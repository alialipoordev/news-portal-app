import { FaImage } from "react-icons/fa";
import storeContext from "../../context/storeContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ErrorAxios } from "../../types";
import BASE_URL from "../../config/config";
import axios from "axios";

function ProfilePage() {
  const { store } = useContext(storeContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [selectedImageFile, setSelectedImageFile] = useState<string | File>("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // fetch profile data
  const fetchProfileData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      const { name, email, image } = data.user;
      setUserData({ name, email, image });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle image removal
  const handleRemoveImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to remove your profile image?"))
      return;

    if (selectedImageFile && userData.image.startsWith("blob:")) {
      setSelectedImageFile("");
      setUserData({ ...userData, image: "" });
      toast.success("image deleted successfully");
      return;
    }

    try {
      const { data } = await axios.delete(`${BASE_URL}/api/profile/image`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      toast.success(data.message);
      fetchProfileData();
      setSelectedImageFile("");
    } catch (error) {
      console.log(error);
      toast.error(
        (error as ErrorAxios).response?.data.message || "Failed to remove image"
      );
    }
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setUserData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update profile form submission
  const handleSubmitProfile = async () => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
    } catch (err) {
      toast.error(
        (err as ErrorAxios).response?.data.message || "Update failed"
      );
    }
  };

  // Handle change password
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/profile/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(error);
      toast.error(
        (error as ErrorAxios).response?.data.message || "Password change failed"
      );
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5">
      <div className="bg-white p-6 rounded-lg flex items-center shadow-md ">
        <div className="flex-shrink-0 relative group">
          <label
            htmlFor="img"
            className="w-[150px] h-[150px] flex flex-col justify-center items-center rounded-full bg-gray-200 border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-200 transition duration-300 overflow-hidden"
          >
            {userData.image ? (
              <div className="relative group w-full h-full">
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />

                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <label
                    htmlFor="img"
                    className="text-white text-sm cursor-pointer hover:underline"
                  >
                    Change Photo
                  </label>

                  <button
                    type="button"
                    onClick={(e) => handleRemoveImage(e)}
                    className="absolute bottom-6 right-[1.90rem] opacity-0 group-hover:opacity-100 bg-red-500 text-white text-xs px-2 py-1 rounded-sm hover:bg-red-600 transition duration-300 shadow-md"
                    aria-label="Remove profile image"
                  >
                    Delete Photo
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="img"
                className="w-full h-full flex flex-col justify-center items-center bg-gray-200 border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-200 transition duration-300"
              >
                <FaImage className="text-4xl" />
                <span className="mt-2">Select Image</span>
              </label>
            )}
          </label>
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="w-full ml-6 text-gray-700 flex flex-col ">
          <div className="mb-2">
            <label htmlFor="name" className="text-xs font-medium text-gray-600">
              Name:
            </label>
            <input
              name="name"
              type="text"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 shadow-md shadow-gray-300 rounded-md focus:ring-0  outline-none transition duration-300 text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name" className="text-xs font-medium text-gray-600">
              Email:
            </label>
            <input
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 shadow-md shadow-gray-300 rounded-md focus:ring-0  outline-none transition duration-300 text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="text-xs font-medium text-gray-600">
              Category:
            </label>
            <input
              type="text"
              value={store.userInfo?.category}
              className="w-full px-3 py-2 shadow-md shadow-gray-300 rounded-md focus:ring-0  outline-none transition duration-300 text-sm"
              disabled
            />
          </div>
          <button
            onClick={handleSubmitProfile}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
        <h2 className="text-lg font-bold text-center mb-5">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="old_password"
                className="block text-md font-semibold text-gray-600"
              >
                Old Password
              </label>
              <input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                id="old_password"
                name="old_password"
                placeholder="Enter Old Password"
                className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="new_password"
                className="block text-md font-semibold text-gray-600"
              >
                New Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                id="new_password"
                name="new_password"
                placeholder="Enter New Password"
                className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
