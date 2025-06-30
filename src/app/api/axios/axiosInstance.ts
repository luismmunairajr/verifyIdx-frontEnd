<<<<<<< HEAD
import axios from "axios";
import { getSession } from "next-auth/react"; 

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ,
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
=======
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.verify-idx.com",
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstance
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
