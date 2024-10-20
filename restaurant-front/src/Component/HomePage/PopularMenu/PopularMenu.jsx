import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../../../ContextProvider/ContextProvider";

const PopularMenu = () => {
  const { popularItem } = useContext(RestaurantContext);
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <section>
        <SectionTitle
          heading={"Fan Favorite Items"}
          subHeading={"All Prices are Inclusive of VAT & Supplementary Duty"}
        ></SectionTitle>
      </section>
      <div className="grid grid-col-1 xl:grid-cols-2 items-center justify-center gap-8 mt-12 lg:mt-20">
        {popularItem.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to={"/menu"}>
          <button className="p-4 hover:bg-red-700 border-b-4 border-red-700 rounded-md duration-300 text-gray-200">
            View Full Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularMenu;
