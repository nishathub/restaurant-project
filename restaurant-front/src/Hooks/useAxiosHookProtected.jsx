import axios from "axios";
import useSavourYumContext from "./useSavourYumContext";
import { useNavigate } from "react-router-dom";

const axiosHook = axios.create({ baseURL: import.meta.env.VITE_SAVOURYUM_API });
const useAxiosHookProtected = () => {
    const {customAlert} = useSavourYumContext();
    const navigate = useNavigate();
    // Request Interceptor
    axiosHook.interceptors.request.use(function (config) {
        const tokenJWT = localStorage.getItem('ACCESS_TOKEN_JWT');
        config.headers.authorization = `Bearer ${tokenJWT}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    // Response Interceptor
    axiosHook.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        console.log('error object inside interceptor response: ', error.response.status);
        const statusCode = error.response.status;
        if(statusCode === 401 || statusCode === 403){
            customAlert("UnAuthorized Access!!");
            navigate('/');
        }
        return Promise.reject(error);
    })
  return axiosHook;
};
export default useAxiosHookProtected;
