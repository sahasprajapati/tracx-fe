import axios from "axios";
import { toast } from "react-toastify";

const AxiosInstance = axios?.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken");
    const accessToken = token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise?.reject(error.response || error?.message);
  }
);
// AxiosInstance.interceptors.response.use(
//   (response: any) => {
//     return response;
//   },
//   (error) => {
//     toast.error(error.response.data.message ?? error.message);
//     if (error?.response?.status === 401) {
//       localStorage.clear();
//       if (!error.request.responseURL.includes("auth/login")) {
//         location.href = "/";
//       }
//     }
//     Promise?.reject(error.response || error?.message);
//   }
// );
export default AxiosInstance;
