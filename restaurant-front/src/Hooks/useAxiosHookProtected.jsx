import axios from "axios";

const axiosHook = axios.create({ baseURL: import.meta.env.VITE_SAVOURYUM_API });
const useAxiosHookProtected = () => {
  return axiosHook;
};
export default useAxiosHookProtected;
