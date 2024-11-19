import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { CgMenuMotion } from "react-icons/cg";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { RestaurantContext } from "../../ContextProvider/ContextProvider";
import CustomLoading from "./CustomLoading/CustomLoading";
import savouryumLogo from "../../../src/assets/restaurant-logo.png";
import useCart from "../../Hooks/useCart";
import useUserRoll from "../../Hooks/useUserRoll";

const CustomNavbar = () => {
  const [navBgColor, setNavBgColor] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setNavBgColor(true);
    } else {
      setNavBgColor(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, userLoading, logOutUser, customAlert } =
    useContext(RestaurantContext);
  const { isCartItemsLoading, cartItemsLoadingError, userCartItems } =
    useCart();
  const { isUserRollPending, userRollData } = useUserRoll();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);
  const [isMenuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const cartBoxRef = useRef();
  const navMenuRef = useRef();
  const profileBoxRef = useRef();

  const altUserPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

  // hide absolute boxes when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartBoxRef.current && !cartBoxRef.current.contains(e.target)) {
        setCartOpen(false);
      }
      if (profileBoxRef.current && !profileBoxRef.current.contains(e.target)) {
        setProfileActive(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(e.target)) {
        setMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOutUser().then(() => {
      customAlert("Logged out");
      setProfileActive(false);

      setTimeout(() => {
        navigate("/login");
      }, 800);
    });
  };
  //   SMALL DEVICE NAV-CARD STYLE
  const navLinks = (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 cinzel-regular">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/menu"}>Menu</NavLink>
      <NavLink to={"/shop"}>Shop</NavLink>
    </div>
  );

  return (
    <div
      className={`${
        navBgColor ? "bg-black" : "bg-black/50"
      } h-20 lg:h-24 w-full fixed z-10`}
    >
      <div className="navbar max-w-7xl mx-auto md:px-4 px-1 flex justify-between items-center h-full my-auto">
        {/* ABSOLUTE MENU  */}
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
                <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-md hover:bg-base-100 hover:text-gray-100 duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
        {/* LEFT  */}
        <div className="flex gap-2 items-center w-60">
          {/* NAV-ICON FOR SMALL DEVICE  */}
          <div className="lg:hidden pt-1">
            <button
              onClick={() => setMenuActive(!isMenuActive)}
              className="text-3xl text-gray-100"
            >
              {isMenuActive ? <CgMenuMotion /> : <IoMenu />}
            </button>
          </div>
          <Link className="w-8 lg:w-12 rounded-full" to={"/"}>
            <img
              className=""
              src={savouryumLogo}
              alt="Savouryum-logo"
              title="Savouryum"
            />
          </Link>
          <Link to={"/"}>
            <div className="">
              <h2 className="text-xl first-letter:text-2xl text-gray-100 uppercase tracking-wide cinzel-semibold">
                savouryum
              </h2>
              <p className="text-gray-100 text-xs tracking-[6px] uppercase cinzel-regular">
                Restaurant
              </p>
            </div>
          </Link>
        </div>
        {/* MIDDLE  */}
        <div className="hidden lg:flex justify-center items-center gap-2 text-gray-100  tracking-wider">
          {navLinks}
        </div>
        {/* RIGHT  */}
        <div className="justify-end w-60">
          {userLoading ? (
            <CustomLoading></CustomLoading>
          ) : (
            <div>
              {!user ? (
                <Link className="hidden lg:inline-block" to={"/login"}>
                  <button className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-100 duration-300">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-1">
                    <h2
                      title="Admin"
                      className={`text-xl ${
                        userRollData ? "text-green-500" : "hidden"
                      }`}
                    >
                      <MdOutlineSecurity />
                    </h2>
                    <h2 className={`text-gray-100`}>
                      {user?.displayName?.length < 10
                        ? user.displayName
                        : user.displayName?.slice(0, 10) + ".."}
                    </h2>
                  </div>
                  {/* CART  */}
                  <div ref={cartBoxRef} className="relative">
                    {/* ABSOLUTE BADGE */}
                    <div className="absolute -top-2 -right-2 bg-gray-700 text-sm text-white px-2 rounded-full">
                      {isCartItemsLoading ? (
                        <CustomLoading size={12}></CustomLoading>
                      ) : (
                        <span>{userCartItems?.length}</span>
                      )}
                    </div>
                    {/* ABSOLUTE CART-BOX */}
                    <div className=" absolute top-16 right-0 w-60 md:w-80 rounded-md bg-base-100">
                      {isCartOpen && (
                        <div className="p-4 space-y-3">
                          <span className="font-bold text-gray-100 md:text-lg">
                            {userCartItems?.length} Items
                          </span>
                          <div className="max-h-52 overflow-auto space-y-2">
                            {userCartItems?.map((item) => (
                              <div
                                key={item._id}
                                className="flex gap-4 items-center justify-between py-2 border-b border-gray-400 text-gray-200"
                              >
                                <div className="">
                                  <h4>{item?.name}</h4>
                                  <p>
                                    {item?.quantity} *{" "}
                                    <span className="">${item?.price}</span>{" "}
                                  </p>
                                </div>
                                <div>
                                  <img
                                    className="w-12 h-8 object-cover"
                                    src={item?.image}
                                    alt="menu-image"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="w-full">
                            <Link to={"/dashboard/cart"}>
                              <button className="bg-gray-200 text-gray-800 font-bold p-1 rounded-md hover:bg-base-100 hover:text-gray-100 duration-300 w-full">
                                View cart
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <button onClick={() => setCartOpen(!isCartOpen)}>
                      <p className="hover:text-gray-300 text-xl p-2 text-white duration-300 rounded-full">
                        <MdOutlineShoppingCart />
                      </p>
                    </button>
                  </div>
                  {/* Profile  */}
                  <div ref={profileBoxRef} className="relative">
                    {/* ABSOLUTE PROFILE CARD  */}
                    <div className="absolute top-16 right-0">
                      {isProfileActive && (
                        <div className="mt-1 p-4 bg-base-100 rounded-sm w-72 md:w-80 space-y-3 ">
                          <div>
                            <div className="w-20 rounded-full mx-auto p-2">
                              <img
                                className="rounded-full"
                                alt="User-Photo"
                                src={user?.photoURL}
                                onError={(e) => {
                                  e.target.src = altUserPhoto;
                                }}
                              />
                            </div>
                          </div>
                          <div className="md:text-lg text-gray-100 ">
                            {user.displayName}
                          </div>
                          <div
                            className={`${
                              userRollData ? "text-green-400 text-sm" : "hidden"
                            } text-center`}
                          >
                            <div className="flex items-center gap-2 mx-auto">
                              <p>
                                <MdOutlineSecurity />
                              </p>
                              <p>{userRollData}</p>
                            </div>
                          </div>
                          <div className=" text-gray-300">{user.email}</div>
                          <div>
                            {userRollData ? (
                              <Link
                                to={"/dashboard/adminDashboardHome"}
                                className="btn btn-sm btn-accent w-full"
                              >
                                Admin Dashboard
                              </Link>
                            ) : (
                              <Link
                                to={"/dashboard/userDashboardHome"}
                                className="btn btn-sm btn-accent w-full"
                              >
                                My Dashboard
                              </Link>
                            )}
                          </div>
                          <div className="" onClick={handleLogOut}>
                            <a
                              onClick={handleLogOut}
                              className="btn btn-sm btn-error w-full"
                            >
                              Logout
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setProfileActive(!isProfileActive)}
                      className="w-10  rounded-full"
                    >
                      <img
                        className="rounded-full"
                        alt="User-Photo"
                        src={user?.photoURL}
                        onError={(e) => {
                          e.target.src = altUserPhoto;
                        }}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
