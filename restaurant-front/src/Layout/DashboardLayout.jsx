import { Outlet } from "react-router-dom";
import AdminDashboardNav from "../Component/Shared/DashboardMenu/AdminDashboardNav";

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 flex">
      <div>
        <AdminDashboardNav></AdminDashboardNav>
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
