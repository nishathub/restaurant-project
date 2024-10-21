import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import banner1 from "../../../assets/banner-images/banner-pizza.jpg";
import banner2 from "../../../assets/banner-images/background-home-top.jpg";
import banner3 from "../../../assets/banner-images/banner-soup.jpg";

const Banner = () => {
  const [imgSource, setImageSource] = useState(banner1);
  const [bannerText, setBannerText] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setImageSource(banner1);
      setBannerText(`BEST PIZZA IN TOWN`);
    } else if (location.pathname === "/menu") {
      setImageSource(banner2);
      setBannerText(`SAVOR EVERY BITES`);
    } else if (location.pathname === "/shop") {
      setImageSource(banner3);
      setBannerText(`TASTE MATTERS`);
    }
  }, [location]);
  return (
    <div
      className="h-[500px] lg:h-[700px]"
      style={{
        backgroundImage: `url(${imgSource})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto h-full relative ">
        {/* ABSOLUTE <DIV></DIV> */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white">
          <h6 className="text-xl font-bold bg-red-700 p-2 rounded-md mb-4 w-fit cinzel-bold">HALAL & HYGIENIC</h6>
          <h4 className="text-4xl lg:text-7xl font-bold mb-8 max-w-60 lg:max-w-md cinzel-thick">{bannerText}</h4>
          <Link className="bg-red-700 hover:bg-red-800 py-3 px-6 rounded-md cinzel-semibold" to={"/menu"}>Our Menu</Link>
        </div>
      </div>
      {/* BG-IMAGE  */}
      <div>{/* <img src={imgSource} alt="banner-image"/> */}</div>
    </div>
  );
};

export default Banner;
