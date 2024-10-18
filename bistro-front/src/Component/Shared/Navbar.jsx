import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { CgMenuMotion } from "react-icons/cg";

import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { RestaurantContext } from "../../ContextProvider/ContextProvider";
import CustomLoading from "./CustomLoading/CustomLoading";

const CustomNavbar = () => {
  const {
    loading,
    user,
    isAdmin,
    logOutUser,
    cartItems,
    cartDisplayLoading,
    allProducts,
    foundProducts,
    setFoundProduct,
    customAlert,
  } = useContext(RestaurantContext);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);
  const [isMenuActive, setMenuActive] = useState(false);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchBoxRef = useRef();
  const cartBoxRef = useRef();
  const navMenuRef = useRef();
  const profileBoxRef = useRef();
  const categoryNavRef = useRef();
  const brandNavRef = useRef();
  const altUserPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

  const handleSearchInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const foundItems = allProducts.filter((product) =>
      product.name.toLowerCase().includes(inputValue)
    );
    setFoundProduct(foundItems);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      setShowSearchItems(true);
    } else {
      setShowSearchItems(false);
    }
  }, [searchInput]);

  // hide searchBox on location change
  useEffect(() => {
    setShowSearchItems(false);
  }, [location]);

  // hide absolute boxes when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearchItems(false);
      }
      if (cartBoxRef.current && !cartBoxRef.current.contains(e.target)) {
        setCartOpen(false);
      }
      if (profileBoxRef.current && !profileBoxRef.current.contains(e.target)) {
        setProfileActive(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(e.target)) {
        setMenuActive(false);
      }
      if (window.innerWidth >= 960) {
        if (
          categoryNavRef.current &&
          !categoryNavRef.current.contains(e.target)
        ) {
          setCategoryOpen(false);
        }
        if (brandNavRef.current && !brandNavRef.current.contains(e.target)) {
          setBrandsOpen(false);
        }
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
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isBrandsOpen, setBrandsOpen] = useState(false);
  const specificationStyle = {
    maxHeight: isCategoryOpen ? "100vh" : "0px",
    overflow: "hidden",
    transition: "max-height 0.7s ease-in-out",
  };
  const displayStyle = {
    maxHeight: isBrandsOpen ? "100vh" : "0px",
    overflow: "hidden",
    transition: "max-height 0.7s ease-in-out",
  };

  const navLinks = isAdmin ? (
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
            N-Tech
          </h2>
        </Link>
      </div>
     
    </>
  ) : (
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
            N-Tech
          </h2>
        </Link>
      </div>
     
    </>
  );

  return (
    <div
      className={`bg-[rgba(224,224,224,0.95)] h-[64px] lg:h-20 fixed w-full z-10 custom-login-register`}
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
        <div className="flex gap-2 items-center ">
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
            <h2 className="hidden lg:inline-block font-semibold text-xl text-gray-900">
              N-Tech
            </h2>
          </Link>
        </div>
        {/* RIGHT  */}
        <div className="">
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
                        isAdmin ? "text-orange-900" : "hidden"
                      }`}
                    >
                      <MdOutlineSecurity />
                    </h2>
                    <h2 className="md:text-lg text-gray-900 font-semibold hidden lg:block">
                      {user?.displayName ? user.displayName : ""}
                    </h2>
                    <h2
                      className={`md:text-lg text-gray-900 font-semibold lg:hidden`}
                    >
                      {user?.displayName?.length < 10
                        ? user.displayName
                        : user.displayName?.slice(0, 10) + ".."}
                    </h2>
                  </div>
                  {/* CART  */}
                  <div ref={cartBoxRef} className="relative">
                    {/* ABSOLUTE BADGE */}
                    <p className="absolute -top-2 -right-2 bg-black text-sm text-white px-2 rounded-full">
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
                      <p className="text-black text-xl p-2 hover:text-white hover:bg-black/70 duration-300 rounded-full">
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
