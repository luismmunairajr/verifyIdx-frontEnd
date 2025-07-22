
import axios from "axios";
import { getSession } from "next-auth/react"; 

const axiosInstance = axios.create({
  baseURL: process.env.MIDLEWARE_BASE_UR,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default axiosInstance;

