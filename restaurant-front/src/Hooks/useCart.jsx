import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "./useAxiosHook";
import useSavourYumContext from "./useSavourYumContext";


const useCart = () => {
    const axiosHook = useAxiosHook();
    const {user} = useSavourYumContext();
    const { isPending: isCartItemsLoading, error: cartItemsLoadingError, data : userCartItems } = useQuery({
        queryKey: ['cartItems', user?.email],
        queryFn: async () => {
            const res = await axiosHook.get(`/allCartItems/${user?.email}`)
            return res.data;
        }
      })
      return {isCartItemsLoading, cartItemsLoadingError, userCartItems}
};

export default useCart;