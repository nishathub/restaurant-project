import { useQuery } from "@tanstack/react-query";
import useSavourYumContext from "./useSavourYumContext";
import useAxiosHookProtected from "./useAxiosHookProtected";

const usePaymentHistory = () => {
  const { user } = useSavourYumContext();
  const axiosProtected = useAxiosHookProtected();
  const {
    isPending: isPaymentHistoryPending,
    isError: isPaymentHistoryError,
    data: paymentHistoryData,
    refetch: paymentHistoryRefetch,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const result = await axiosProtected.get(
        `/userPaymentHistory/${user?.email}`
      );
      return result.data;
    },
  });

  return {
    isPaymentHistoryError,
    isPaymentHistoryPending,
    paymentHistoryData,
    paymentHistoryRefetch,
  };
};

export default usePaymentHistory;
