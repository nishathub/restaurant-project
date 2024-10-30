import { Outlet } from "react-router-dom";
import AdminDashboardNav from "../Component/Shared/DashboardMenu/AdminDashboardNav";
import CustomToast from "../Component/Shared/CustomToast/CustomToast";

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto flex ">
      <CustomToast></CustomToast>
      <div>
        <AdminDashboardNav></AdminDashboardNav>
      </div>
      <div className="flex-grow max-w-5xl mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
