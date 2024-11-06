import useAxiosHookProtected from './useAxiosHookProtected';
import { useQuery } from '@tanstack/react-query';
import useSavourYumContext from './useSavourYumContext';

const useUserRoll = () => {
    const axiosProtected = useAxiosHookProtected();
    const {user} = useSavourYumContext();
    const {refetch : isUserRollRefetch, isPending: isUserRollPending, error: isUserRollError, data : userRollData} = useQuery({
        queryKey: [user?.email ,'userEmail'],
        queryFn: async () => {
            const response = await axiosProtected.get(`/jwt/userRoll/${user?.email}`);
            const userRoll = response.data;
            return userRoll;
        },
        enabled: !!user?.email, // Only fetch if user email exists
    });
    return {isUserRollRefetch, isUserRollPending, isUserRollError, userRollData};
};

export default useUserRoll;