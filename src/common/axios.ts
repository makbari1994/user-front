import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

// const axiosHttp = axios.create();
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      //(`unauthorized :)`);
      localStorage.removeItem("token");
      //removeLocalStorageToken
      window.location.href = "/login";
    } else {
      toast.clearAll();
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default axios;
