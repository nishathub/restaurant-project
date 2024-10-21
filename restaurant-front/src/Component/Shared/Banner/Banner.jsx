import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import banner1 from "../../../assets/menuCategory-images/banner-pizza.jpg";

const Banner = () => {
  return (
    <div
      className="h-[450px] lg:h-[700px]"
      style={{
        backgroundImage: `url(${banner1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto h-full relative ">
        {/* ABSOLUTE <DIV></DIV> */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white">
          <h6 className="md:text-xl font-bold bg-red-700 p-2 rounded-md mb-4 w-fit cinzel-bold">HALAL & HYGIENIC</h6>
          <h4 className="text-4xl lg:text-7xl font-bold mb-8 max-w-60 lg:max-w-md cinzel-thick">TASTE MATTERS</h4>
          <Link className="bg-red-700 hover:bg-red-800 py-2 md:py-3 px-6 rounded-md cinzel-semibold" to={"/menu"}>Our Menu</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
