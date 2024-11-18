import { Outlet } from "react-router-dom";
import CustomToast from "../Component/Shared/CustomToast/CustomToast";
import useSavourYumContext from "../Hooks/useSavourYumContext";
import useUserRoll from "../Hooks/useUserRoll";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";
import AdminDashboardNav from "../Component/DashboardMenu/AdminDashboardNav";
import UserDashboardNav from "../Component/DashboardMenu/UserDashboardNav";

const DashboardLayout = () => {
  const { user } = useSavourYumContext();
  const { userRollData, isUserRollPending } = useUserRoll();

  return (
    <div className=" bg-[rgb(230,230,230)]">
      <CustomToast></CustomToast>
      <div className=" mx-auto flex">
        <div className="absolute z-20">
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
        <div className="flex-grow max-w-5xl ml-12 lg:ml-0 mx-auto min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
