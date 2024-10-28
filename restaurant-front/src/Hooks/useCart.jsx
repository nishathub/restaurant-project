import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "./useAxiosHook";
import useSavourYumContext from "./useSavourYumContext";


const useCart = () => {
    const axiosHook = useAxiosHook();
    const {user} = useSavourYumContext();
    const { isPending, error, data : userCartItems } = useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const res = await axiosHook.get(`/allCartItems/${user?.email}`)
            return res.data;
        }
      })
      // idea: state management in contextProvider, then handle these in components
      if(isPending){

      }
      if(error) {

      }
      return [userCartItems]
};

export default useCart;