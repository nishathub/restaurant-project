import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { CgMenuMotion } from "react-icons/cg";

import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { RestaurantContext } from "../../ContextProvider/ContextProvider";
import CustomLoading from "./CustomLoading/CustomLoading";

const CustomNavbar = () => {
  const [navBg, setNavBg] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    loading,
    user,
    isAdmin,
    logOutUser,
    cartItems,
    cartDisplayLoading,
    customAlert,
  } = useContext(RestaurantContext);
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

      setTimeout(() => {
        navigate("/login");
      }, 800);
    });
  };
  //   SMALL DEVICE NAV-CARD STYLE
  const navLinks = (
    <>
      <div className="flex lg:hidden gap-2 items-center">
        <Link to={"/"}>
          <img
            className="w-8 md:w-12 rounded-full"
            src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg"
            alt="company-logo"
            title="N-Tech"
          />
        </Link>
        <Link to={"/"}>
          <h2 className="lg:hidden font-semibold text-lg text-gray-100">
            Restaurant
          </h2>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/menu"}>Menu</NavLink>
        <NavLink to={"/shop"}>Shop</NavLink>
      </div>
    </>
  );

  return (
    <div
      className={`${navBg ? 'bg-black' : 'bg-black/30'} h-[64px] lg:h-20 fixed w-full z-10`}
    >
      <div className="navbar max-w-7xl mx-auto md:px-4 px-1 flex justify-between items-center h-full my-auto">
        {/* ABSOLUTE MENU  */}
        <div
          ref={navMenuRef}
          className={`absolute p-4 space-y-4 lg:hidden overflow-y-auto ${
            isMenuActive
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
          } duration-300 top-[64px] left-0 w-[200px] h-[calc(100vh-64px)] bg-base-100 items-start`}
        >
          <div className="flex flex-col gap-4 w-fit">{navLinks}</div>
        </div>
        {/* LEFT  */}
        <div className="flex gap-2 items-center w-60">
          {/* NAV-ICON FOR SMALL DEVICE  */}
          <div className="lg:hidden pt-1">
            <button
              onClick={() => setMenuActive(!isMenuActive)}
              className="text-3xl text-gray-900"
            >
              {isMenuActive ? <CgMenuMotion /> : <IoMenu />}
            </button>
          </div>
          <Link to={"/"}>
            <img
              className="w-8 md:w-12 rounded-full"
              src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg"
              alt="company-logo"
              title="N-Tech"
            />
          </Link>
          <Link to={"/"}>
            <h2 className="hidden lg:inline-block font-semibold text-xl text-gray-200">
              Restaurant
            </h2>
          </Link>
        </div>
        {/* MIDDLE  */}
        <div className="font-bold hidden lg:flex justify-center items-center gap-2 text-gray-200 tracking-wide">
          {navLinks}
        </div>
        {/* RIGHT  */}
        <div className="justify-end w-60">
          {loading ? (
            <CustomLoading></CustomLoading>
          ) : (
            <div>
              {!user ? (
                <Link to={"/login"}>
                  <button className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 duration-300">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-1">
                    <h2
                      title="Admin"
                      className={`text-xl ${
                        isAdmin ? "text-orange-400" : "hidden"
                      }`}
                    >
                      <MdOutlineSecurity />
                    </h2>
                    <h2 className="md:text-lg text-gray-200 font-semibold hidden lg:block">
                      {user?.displayName ? user.displayName : ""}
                    </h2>
                    <h2
                      className={`md:text-lg text-gray-200 font-semibold lg:hidden`}
                    >
                      {user?.displayName?.length < 10
                        ? user.displayName
                        : user.displayName?.slice(0, 10) + ".."}
                    </h2>
                  </div>
                  {/* CART  */}
                  <div ref={cartBoxRef} className="relative">
                    {/* ABSOLUTE BADGE */}
                    <p className="absolute -top-2 -right-2 bg-gray-700 text-sm text-white px-2 rounded-full">
                      {cartDisplayLoading ? (
                        <CustomLoading size={12}></CustomLoading>
                      ) : (
                        cartItems.length
                      )}
                    </p>
                    {/* ABSOLUTE CART-BOX */}
                    <div className=" absolute top-16 right-0 w-52 md:w-80 rounded-md bg-base-100">
                      {isCartOpen && (
                        <div className="p-4 space-y-3">
                          <span className="font-bold text-gray-200 md:text-lg">
                            {cartItems.length} Items
                          </span>
                          <div>
                            {cartItems.map((item) => (
                              <h4 key={item._id}>{item.name}</h4>
                            ))}
                          </div>
                          <div className="w-full">
                            <Link to={"/cart"}>
                              <button className="bg-gray-200 text-gray-800 font-bold p-1 rounded-md hover:bg-base-100 hover:text-gray-200 duration-300 w-full">
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
                        <ul className="mt-1 p-4 bg-base-100 rounded-sm w-52 md:w-80 space-y-3 ">
                          <li>
                            <div className="w-20 rounded-full mx-auto p-2">
                              <img
                                className="rounded-full"
                                alt="User-Photo"
                                src={user?.photoURL || altUserPhoto}
                                onError={(e) => {
                                  e.target.src = altUserPhoto;
                                }}
                              />
                            </div>
                          </li>
                          <li className="md:text-lg text-gray-200 ">
                            {user.displayName}
                          </li>
                          <li
                            className={`${
                              isAdmin ? "text-orange-400 text-sm" : "hidden"
                            } text-center`}
                          >
                            <div className="flex items-center gap-2 mx-auto">
                              <p>
                                <MdOutlineSecurity />
                              </p>
                              <p>Admin</p>
                            </div>
                          </li>
                          <li className="md:text-lg text-[#3BBFE3]">
                            {user.email}
                          </li>

                          <li className={`${isAdmin ? "" : "hidden"}`}>
                            <Link
                              to={"/admin-dashboard"}
                              className="btn btn-sm btn-accent w-full"
                            >
                              Admin Dashboard
                            </Link>
                          </li>
                          <li className="" onClick={handleLogOut}>
                            <a className="btn btn-sm btn-error w-full">
                              Logout
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                    <button
                      onClick={() => setProfileActive(!isProfileActive)}
                      className="w-10  rounded-full"
                    >
                      <img
                        className="rounded-full"
                        alt="User-Photo"
                        src={user?.photoURL || altUserPhoto}
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
