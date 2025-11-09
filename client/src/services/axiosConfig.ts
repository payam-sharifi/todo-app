// lib/api.ts
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api/'
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    //console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    toast.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(`[API ERROR ${error.response.status}]`, error.response.data);
    } else if (error.request) {
      toast.error("[API ERROR] No response received from server");
    } else {
      toast.error("[API ERROR] Unexpected error");
    }

    return Promise.reject(error);
  }
);

export default api;
