import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar";
import Footer from "../Component/Shared/Footer";
import "./restaurant-style.css";
import CustomToast from "../Component/Shared/CustomToast/CustomToast";

const Layout = () => {
  return (
    <div>
      <CustomToast></CustomToast>
      <div className="flex flex-col min-h-screen lora-regular">
        <Navbar></Navbar>
        <div className="flex-grow">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
