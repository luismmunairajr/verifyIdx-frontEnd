import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://verify-idx-api-c2aaegctbxavbac8.southafricanorth-01.azurewebsites.net",
    headers: {
        "Content-Type": "aplication/json",
    },
})

export default axiosInstance