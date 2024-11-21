import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { CgMenuMotion } from "react-icons/cg";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { RestaurantContext } from "../../../ContextProvider/ContextProvider";
import CustomLoading from "../../../Component/Shared/CustomLoading/CustomLoading";
import savouryumLogo from "../../../../src/assets/restaurant-logo.png";
import useCart from "../../../Hooks/useCart";
import useUserRoll from "../../../Hooks/useUserRoll";
import NavCartBox from "./NavCartBox";
import NavSideMenu from "./NavSideMenu";
import NavProfileBox from "./NavProfileBox";

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
        <NavSideMenu
          navMenuRef={navMenuRef}
          isMenuActive={isMenuActive}
          navLinks={navLinks}
          user={user}
          userRollData={userRollData}
        ></NavSideMenu>
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
                  <div className="hidden md:flex items-center gap-1 relative">
                    <div
                      title="Admin"
                      className={`text-xl ${
                        userRollData
                          ? "text-green-300 absolute -right-4 -top-3"
                          : "hidden"
                      }`}
                    >
                      <MdOutlineSecurity />
                    </div>
                    <h2 className={`text-gray-100`}>
                      {user?.displayName?.length < 10
                        ? user.displayName
                        : user.displayName?.slice(0, 10) + ".."}
                    </h2>
                  </div>
                  {/* CART  */}
                  <div>
                    <NavCartBox
                      cartItems={userCartItems}
                      isCartOpen={isCartOpen}
                      setCartOpen={setCartOpen}
                      cartBoxRef={cartBoxRef}
                    ></NavCartBox>
                  </div>
                  {/* Profile  */}
                  <NavProfileBox
                    profileBoxRef={profileBoxRef}
                    isProfileActive={isProfileActive}
                    setProfileActive={setProfileActive}
                    user={user}
                    userRollData={userRollData}
                    altUserPhoto={altUserPhoto}
                    handleLogOut={handleLogOut}
                  ></NavProfileBox>
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
