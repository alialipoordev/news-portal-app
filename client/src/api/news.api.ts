import axios from "axios";
import BASE_URL from "../config/config";

export const fetchNews = async (token: string | null) => {
  const { data } = await axios.get(`${BASE_URL}/api/news`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.news;
};

export const updateNewsStatus = async (
  id: string,
  status: string,
  token: string | null
) => {
  const { data } = await axios.put(
    `${BASE_URL}/api/news/status/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const deleteNews = async (id: string, token: string | null) => {
  const { data } = await axios.delete(`${BASE_URL}/api/news/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
