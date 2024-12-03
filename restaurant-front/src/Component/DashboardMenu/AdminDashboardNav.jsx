import { MdHome, MdMenuBook, MdRestaurant } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaEnvelope, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import savouryumLogo from "../../../src/assets/restaurant-logo.png";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useEffect, useState } from "react";

const AdminDashboardNav = () => {
  const [isDashboardExpand, setDashboardExpand] = useState(true);
  const activeNavStyle = { color: "orange" };
  // Nav menu responsive action
  useEffect(() => {
    const handleResizeWindow = () => {
      if (window.innerWidth > 1024) {
        setDashboardExpand(true);
      } else {
        setDashboardExpand(false);
      }
    };
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  return (
    <div
      className={`${
        isDashboardExpand ? "w-64 px-4 pt-8 lg:pb-8" : "w-0 pt-8 lg:pb-8"
      } duration-300 min-h-[100vh] overflow-auto bg-gray-900/95 text-gray-100`}
    >
      {/* HEADING  */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 p-2 w-full font-semibold">
          <button
            className="absolute z-10 -right-10 top-2 bg-black rounded-full"
            onClick={() => setDashboardExpand(!isDashboardExpand)}
          >
            {isDashboardExpand ? (
              <p title="Minimize" className="text-3xl">
                <IoIosArrowDropleftCircle />
              </p>
            ) : (
              <p title="Expand" className="text-3xl">
                <IoIosArrowDroprightCircle />
              </p>
            )}
          </button>
          <button title="Menu" className="flex items-center gap-2">
            <div
              className={`w-8 rounded-full ${
                isDashboardExpand
                  ? "inline-block lg:hidden"
                  : "lg:hidden inline-block"
              }`}
            >
              <img
                className=""
                src={savouryumLogo}
                alt="Savouryum-logo"
                title="Savouryum"
              />
            </div>

            <div className={`${isDashboardExpand ? "" : "hidden"}`}>
              <h2 className="text-xl first-letter:text-2xl text-gray-200 uppercase tracking-wide cinzel-semibold">
                savouryum
              </h2>
              <p className="text-gray-200 text-xs tracking-[6px] uppercase cinzel-regular">
                Restaurant
              </p>
            </div>
          </button>
        </div>
      </div>
      {/* DASHBOARD NAV BUTTONS  */}
      <div className="p-2 space-y-6 mr-auto lora-regular border-b pb-8">
        <NavLink
          to={"/dashboard/adminDashboardHome"}
          title="Admin Home"
          className="flex items-center gap-4"
        >
          <p className="text-3xl">
            <FaHome />
          </p>
          <p className={`${isDashboardExpand ? "" : "hidden"}`}>Admin Home</p>
        </NavLink>
        <NavLink
          to={"/dashboard/addItem"}
          title="Add Items"
          className="flex items-center gap-4"
        >
          <p className="text-3xl">
            <MdRestaurant />
          </p>
          <p className={`${isDashboardExpand ? "" : "hidden"}`}>Add Items</p>
        </NavLink>
        <NavLink
          to={"/dashboard/manageItems"}
          title="Manage Items"
          className="flex items-center gap-4"
        >
          <p className="text-3xl">
            <MdMenuBook />
          </p>
          <p className={`${isDashboardExpand ? "" : "hidden"}`}>Manage Items</p>
        </NavLink>
        <button title="Manage Bookings" className="flex items-center gap-4">
          <p className="text-3xl">
            <BsFillBookmarkStarFill />
          </p>
          <p className={`${isDashboardExpand ? "" : "hidden"}`}>
            Manage Bookings
          </p>
        </button>
        <NavLink
          to={"/dashboard/allUsers"}
          title="Users"
          className="flex items-center gap-4"
        >
          <p className="text-3xl">
            <FaUsers />
          </p>
          <p className={`${isDashboardExpand ? "" : "hidden"}`}>All Users</p>
        </NavLink>
      </div>
      <div className="p-2 space-y-6 mr-auto lora-regular pt-8">
        <Link to={"/"} title="Home" className="flex items-center gap-4">
          <p className="text-3xl">
            <MdHome />
          </p>
          <p className={`${isDashboardExpand ? "" : "hidden"}`}>Back to Home</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardNav;
