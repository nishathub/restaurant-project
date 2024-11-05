import axios from "axios";
import useSavourYumContext from "./useSavourYumContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SAVOURYUM_API
});

const useAxiosHookProtected = () => {
  const { user, userLoading, customAlert } = useSavourYumContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Only set up interceptors if user is authenticated and token exists
    if (!user || userLoading || !localStorage.getItem("ACCESS_TOKEN_JWT")) {
      return;
    }

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const tokenJWT = localStorage.getItem("ACCESS_TOKEN_JWT");
        if (tokenJWT) {
          config.headers.authorization = `Bearer ${tokenJWT}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("Error object inside interceptor response: ", error);
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          customAlert("Unauthorized Access!");
          navigate("/");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when the component is unmounted or user state changes
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, userLoading, navigate, customAlert]);

  return axiosInstance;
};

export default useAxiosHookProtected;
