import { useContext, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/config";
import toast from "react-hot-toast";
import storeContext from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import { ErrorAxios } from "../../types";

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useContext(storeContext);
  const navigate = useNavigate();

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(`${BASE_URL}/api/login`, formData);
      setLoader(false);
      localStorage.setItem("newsToken", data.token);
      toast.success(data.message);
      dispatch({ type: "LOGIN_SUCCESS", payload: { token: data.token } });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorAxios).response?.data.message);
      setLoader(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-[400px]">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img
              className="w-[150px]"
              src="https://i.ibb.co.com/WcB36Jq/mainlogo.png"
              alt="logo"
            />
          </div>

          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={inputChangeHandler}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                value={formData.password}
                onChange={inputChangeHandler}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loader}
                className={`w-full py-3 text-white rounded-md transition font-semibold ${
                  loader
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-400"
                } `}
              >
                {loader ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
