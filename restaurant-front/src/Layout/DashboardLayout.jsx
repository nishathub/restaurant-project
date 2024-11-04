import { Outlet } from "react-router-dom";
import AdminDashboardNav from "../Component/Shared/DashboardMenu/AdminDashboardNav";
import CustomToast from "../Component/Shared/CustomToast/CustomToast";
import useSavourYumContext from "../Hooks/useSavourYumContext";
import UserDashboardNav from "../Component/Shared/DashboardMenu/UserDashboardNav";
import useUserRoll from "../Hooks/useUserRoll";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";

const DashboardLayout = () => {
  const { user } = useSavourYumContext();
  const { userRollData, isUserRollPending } = useUserRoll();

  return (
    <div className="max-w-7xl mx-auto flex ">
      <CustomToast></CustomToast>
      <div>
        {isUserRollPending ? (
          <div className="h-full flex items-center justify-center">
            <CustomLoading size={32}></CustomLoading>
          </div>
        ) : userRollData ? (
          <AdminDashboardNav></AdminDashboardNav>
        ) : user ? (
          <UserDashboardNav></UserDashboardNav>
        ) : (
          ""
        )}
      </div>
      <div className="flex-grow max-w-5xl mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
