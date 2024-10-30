import { MdDashboard, MdDevices } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { TbBrandBunpo } from "react-icons/tb";
import { Link } from "react-router-dom";
import savouryumLogo from "../../../../src/assets/restaurant-logo.png";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useState } from "react";

const AdminDashboardNav = () => {
  const [isDashboardExpand, setDashboardExpand] = useState(true);
  const activeNavStyle = { color: "orange" };
  return (
    <div
      className={`${
        isDashboardExpand ? "lg:w-60 w-12 px-4 py-8" : "w-12 py-8"
      } duration-300 h-[100vh] bg-gray-900 text-gray-100`}
    >
      {/* HEADING  */}
      <div className="mb-8">
        <div className="flex items-center justify-between p-2 w-full text-center font-semibold">
          <button title="Menu" className="flex items-center gap-2">
            <div
              className={`w-8 rounded-full ${
                isDashboardExpand ? "hidden" : "lg:hidden inline-block"
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
              className={`${isDashboardExpand ? "" : "hidden"}`}
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
      <div className="p-2 space-y-4 w-48 mr-auto lora-regular border-b pb-8">
        <Link title="Add a Product" className="flex items-center gap-2">
          <p className="text-3xl">
            <IoIosAddCircle />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"      
            }`}
          >
            Admin Home
          </p>
        </Link>
        <Link title="Add a Product" className="flex items-center gap-2">
          <p className="text-3xl">
            <IoIosAddCircle />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Add Items
          </p>
        </Link>
        <button title="Product-List" className="flex items-center gap-2">
          <p className="text-3xl">
            <MdDevices />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Manage Items
          </p>
        </button>
        <button title="Categories" className="flex items-center gap-2">
          <p className="text-3xl">
            <MdCategory />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Manage Bookings
          </p>
        </button>
        <button title="Brands" className="flex items-center gap-2">
          <p className="text-3xl">
            <TbBrandBunpo />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            All Users
          </p>
        </button>
      </div>
      <div className="p-2 space-y-4 w-48 mr-auto lora-regular pt-8">
        <Link to={'/'} title="Home" className="flex items-center gap-2">
          <p className="text-3xl">
            <IoIosAddCircle />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"      
            }`}
          >
            Home
          </p>
        </Link>
        <Link to={'/menu'} title="Menu Items" className="flex items-center gap-2">
          <p className="text-3xl">
            <IoIosAddCircle />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Menu
          </p>
        </Link>
        <Link to={'/shop'} title="Shop" className="flex items-center gap-2">
          <p className="text-3xl">
            <MdDevices />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Shop
          </p>
        </Link>
        <Link title="Contact" className="flex items-center gap-2">
          <p className="text-3xl">
            <MdCategory />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Contact
          </p>
        </Link>
        <button title="Brands" className="flex items-center gap-2">
          <p className="text-3xl">
            <TbBrandBunpo />
          </p>
          <p
            className={`${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            All Users
          </p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardNav;
