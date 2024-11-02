import { useQuery } from "@tanstack/react-query";
import useAxiosHookPublic from "./useAxiosHookPublic";
import useSavourYumContext from "./useSavourYumContext";
import useAxiosHookProtected from "./useAxiosHookProtected";

const useCart = () => {
  const axiosProtected = useAxiosHookProtected();
  const { user } = useSavourYumContext();
  const {
    refetch: cartItemsRefetch,
    isPending: isCartItemsLoading,
    error: cartItemsLoadingError,
    data: userCartItems,
  } = useQuery({
    queryKey: ["cartItems", user?.email],
    queryFn: async () => {
      const res = await axiosProtected.get(`/allCartItems/${user?.email}`);
      return res.data;
    },
  });
  return {
    cartItemsRefetch,
    isCartItemsLoading,
    cartItemsLoadingError,
    userCartItems,
  };
};

export default useCart;
