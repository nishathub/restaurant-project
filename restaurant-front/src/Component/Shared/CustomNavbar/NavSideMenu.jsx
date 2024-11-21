import { Link, NavLink } from "react-router-dom";

const NavSideMenu = ({navMenuRef, isMenuActive, navLinks, user, userRollData}) => {
    return (
        <div
          ref={navMenuRef}
          className={`absolute p-4 space-y-4 lg:hidden overflow-y-auto ${
            isMenuActive
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
          } duration-300 top-[68px] left-0 w-[200px] h-[calc(100vh-68px)] bg-base-100 items-start`}
        >
          <div className="flex flex-col gap-2 w-fit text-gray-200">
            {navLinks}
            {userRollData ? (
              <NavLink
                className="cinzel-regular"
                to={"/dashboard/adminDashboardHome"}
              >
                Dashboard
              </NavLink>
            ) : user ? (
              <NavLink
                className="cinzel-regular"
                to={"/dashboard/userDashboardHome"}
              >
                Dashboard
              </NavLink>
            ) : (
              <Link to={"/login"}>
                <button className="bg-gray-300 text-black px-2 py-1 rounded-md hover:bg-base-100 hover:text-gray-100 duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
    );
};

export default NavSideMenu;