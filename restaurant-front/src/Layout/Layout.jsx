import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Component/Shared/Footer";
import "./restaurant-style.css";
import CustomToast from "../Component/Shared/CustomToast/CustomToast";
import CustomNavbar from "../Component/Shared/CustomNavbar";

const Layout = () => {
    function ScrollToTop() {
        const { pathname } = useLocation();
    
        useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
    
        return null;
      }
  return (
    <div>
      <CustomToast></CustomToast>
      <div className="flex flex-col min-h-screen lora-regular bg-[rgb(250,250,250)]">
        <CustomNavbar></CustomNavbar>
        <div className="flex-grow">
            <ScrollToTop></ScrollToTop>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
