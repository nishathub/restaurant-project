import {
  MdHome,
  MdMenuBook,
  MdRestaurant,
} from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaEnvelope, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
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
        isDashboardExpand ? "lg:w-60 w-12 px-4 pt-8 pb-8" : "w-12 pt-8 pb-8"
      } duration-300 min-h-[100vh] bg-gray-900 text-gray-100`}
    >
      {/* HEADING  */}
      <div className="mb-8">
        <div className="flex items-center justify-between p-2 w-full text-center font-semibold">
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

            <div
              className={`${
                isDashboardExpand ? "hidden lg:inline-block" : "hidden"
              }`}
            >
              <h2 className="text-xl first-letter:text-2xl text-gray-200 uppercase tracking-wide cinzel-semibold">
                savouryum
              </h2>
              <p className="text-gray-200 text-xs tracking-[6px] uppercase cinzel-regular">
                Restaurant
              </p>
            </div>
          </button>
          <button
            className="hidden lg:inline-block"
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
        </div>
      </div>
      {/* DASHBOARD NAV BUTTONS  */}
      <div className="p-2 space-y-6 mr-auto lora-regular border-b pb-8">
        <Link title="Admin Home" className="flex items-center gap-4">
          <p className="text-3xl">
            <FaHome />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Admin Home
          </p>
        </Link>
        <Link to={'/dashboard/addItem'} title="Add Items" className="flex items-center gap-4">
          <p className="text-3xl">
            <MdRestaurant />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Add Items
          </p>
        </Link>
        <button title="Manage Items" className="flex items-center gap-4">
          <p className="text-3xl">
            <MdMenuBook />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Manage Items
          </p>
        </button>
        <button title="Manage Bookings" className="flex items-center gap-4">
          <p className="text-3xl">
            <BsFillBookmarkStarFill />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Manage Bookings
          </p>
        </button>
        <Link to={'/dashboard/allUsers'} title="Users" className="flex items-center gap-4">
          <p className="text-3xl">
            <FaUsers />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            All Users
          </p>
        </Link>
      </div>
      <div className="p-2 space-y-6 mr-auto lora-regular pt-8">
        <Link to={"/"} title="Home" className="flex items-center gap-4">
          <p className="text-3xl">
            <MdHome />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Home
          </p>
        </Link>
        <Link
          to={"/menu"}
          title="Menu Items"
          className="flex items-center gap-4"
        >
          <p className="text-3xl">
            <BiSolidFoodMenu />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Menu
          </p>
        </Link>
        <Link to={"/shop"} title="Shop" className="flex items-center gap-4">
          <p className="text-3xl">
            <FaShoppingBag />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Shop
          </p>
        </Link>
        <Link title="Contact" className="flex items-center gap-4">
          <p className="text-3xl">
            <FaEnvelope />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Contact
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardNav;
