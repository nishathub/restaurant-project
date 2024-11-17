import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../../../ContextProvider/ContextProvider";
import useMenu from "../../../Hooks/useMenu";
import CustomLoading from "../../Shared/CustomLoading/CustomLoading";

const PopularMenu = () => {
  const {allMenuItems, isFetchMenuLoading} = useMenu(); // custom hook
  const popularItem = isFetchMenuLoading
    ? []
    : allMenuItems.filter((item) => item.category === "popular");

  return (
    <div className="max-w-7xl mx-auto mb-12 px-4">
      <section className="">
        <SectionTitle
          heading={"Fan Favorite Items"}
          subHeading={"Be a Part of the trend now"}
        ></SectionTitle>
      </section>
      {isFetchMenuLoading ? (
        <div className="flex items-center justify-center">
          <CustomLoading size={32}></CustomLoading>
        </div>
      ) : (
        <div className="grid grid-col-1 lg:grid-cols-2 items-center lg:justify-items-center mt-12 md:mt-20">
          {popularItem.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Link to={"/menu"}>
          <button className="p-4 hover:bg-red-700 border-b-4 border-red-700 rounded-md duration-300 cinzel-regular text-gray-800 hover:text-gray-200">
            View Full Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularMenu;
