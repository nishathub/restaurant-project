import { Outlet } from "react-router-dom";
import AdminDashboardNav from "../Component/Shared/DashboardMenu/AdminDashboardNav";
import CustomToast from "../Component/Shared/CustomToast/CustomToast";
import useSavourYumContext from "../Hooks/useSavourYumContext";
import UserDashboardNav from "../Component/Shared/DashboardMenu/UserDashboardMenu";

const DashboardLayout = () => {
  const { user, isAdmin } = useSavourYumContext();
  return (
    <div className="max-w-7xl mx-auto flex ">
      <CustomToast></CustomToast>
      <div>
        {isAdmin ? (
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
