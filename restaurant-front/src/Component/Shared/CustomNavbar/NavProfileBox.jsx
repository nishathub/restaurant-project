import React from "react";
import { MdOutlineSecurity } from "react-icons/md";
import { Link } from "react-router-dom";

const NavProfileBox = ({profileBoxRef, isProfileActive, setProfileActive, user, userRollData, altUserPhoto, handleLogOut}) => {
  return (
    <div ref={profileBoxRef} className="relative">
      {/* ABSOLUTE PROFILE CARD  */}
      <div className="absolute top-16 right-0">
        {isProfileActive && (
          <div className="mt-1 p-4 bg-base-100 rounded-sm w-72 md:w-80 space-y-3 ">
            <div>
              <div className="w-16 rounded-full">
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
            <div className="md:text-lg text-gray-100 ">{user?.displayName}</div>
            <div
              className={`${
                userRollData ? "text-green-300 text-sm" : "hidden"
              } text-center`}
            >
              <div className="flex items-center gap-2 mx-auto">
                <p>
                  <MdOutlineSecurity />
                </p>
                <p>{userRollData}</p>
              </div>
            </div>
            <div className=" text-gray-300">{user?.email}</div>
            <div>
              {userRollData ? (
                <Link
                  to={"/dashboard/adminDashboardHome"}
                  className="bg-gray-300 text-black text-center px-2 py-1 block rounded-sm hover:bg-base-100 hover:text-gray-100 duration-300"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to={"/dashboard/userDashboardHome"}
                  className="bg-gray-300 text-black text-center px-2 py-1 block rounded-sm hover:bg-base-100 hover:text-gray-100 duration-300"
                >
                  My Dashboard
                </Link>
              )}
            </div>
            <div>
              <button
                onClick={handleLogOut}
                className="bg-red-700 text-gray-100 text-center px-2 py-1 w-full block rounded-sm hover:bg-red-800 duration-300"
              >
                Logout
              </button>
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
  );
};

export default NavProfileBox;
