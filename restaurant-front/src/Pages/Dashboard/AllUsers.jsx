import { MdDelete, MdOutlineSecurity } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import useCart from "../../Hooks/useCart";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUsers } from "react-icons/fa";
import useUserRoll from "../../Hooks/useUserRoll";

const AllUsers = () => {
  const { customAlert } = useSavourYumContext();
  const { isUserRollPending, userRollData } = useUserRoll();
  const [userActionLoading, setUserActionLoading] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [isUserRollModalActive, setMakeUserRollModalActive] = useState(false);
  const altUserPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
  const axiosProtected = useAxiosHookProtected();
  const {
    refetch: allUserRefetch,
    isPending: isAllUserPending,
    error: isAllUserLoadingError,
    data: allUsersData,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosProtected.get("allUsers");
      return response.data;
    },
  });

  const handleUserButtonClick = (_id) => {
    if (!isUserRollPending && userRollData === "Admin") {
      setClickedUserId(_id);
      setMakeUserRollModalActive(true);
    } else if (!isUserRollPending && userRollData !== "Admin") {
      return customAlert("Only Admin Can Change Roll");
    }
  };
  const handleMakeUserRoll = async (roll) => {
    try {
      setUserActionLoading(true);
      const updateInfo = { userRoll: roll };
      const response = await axiosProtected.patch(
        `/allUsers/${clickedUserId}`,
        updateInfo
      );
      if (response.data.modifiedCount) {
        customAlert("Updated Successfully");
        allUserRefetch();
      }
      setMakeUserRollModalActive(false);
    } catch (error) {
      console.log(error);
      customAlert("Failed to update userRoll");
    } finally {
      setUserActionLoading(false);
    }
  };
  const handleDeleteUser = async (id) => {
    setUserActionLoading(true);
    try {
      const deleteItem = await axiosProtected.delete(`/allUsers/${id}`);
      if (deleteItem.data.deletedCount) {
        customAlert("Item Deleted");
      }
      allUserRefetch();
    } catch (error) {
      console.log(error);
      customAlert("Deleting Failed, try again");
    } finally {
      setUserActionLoading(false);
    }
  };

  return (
    <div className="px-4 pt-8">
      {/* ABSOLUTE MODAL Start */}
      <div
        className={`absolute bg-gray-500/30 flex inset-0 z-10 text-gray-800 lora-regular duration-500 ${
          isUserRollModalActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-300 rounded-md relative">
          <button
            onClick={() => setMakeUserRollModalActive(false)}
            className="absolute right-0 top-0 btn btn-error btn-sm"
          >
            X
          </button>
          <h4 className="cinzel-semibold mb-4">Select a roll</h4>
          <button
            onClick={(e) => handleMakeUserRoll(e.target.innerText)}
            className="btn w-32"
          >
            Admin
          </button>
          <button
            onClick={(e) => handleMakeUserRoll(e.target.innerText)}
            className="btn w-32"
          >
            Moderator
          </button>
          <button
            onClick={(e) => handleMakeUserRoll(e.target.innerText)}
            className="btn w-32"
          >
            Editor
          </button>
        </div>
      </div>
      {/* ABSOLUTE MODAL END  */}

      <div className="mb-12">
        <SectionTitle
          heading={"Manage All Users"}
          subHeading={"Count Matters"}
        ></SectionTitle>
      </div>
      {isAllUserPending || userActionLoading ? (
        <div className="flex justify-center items-center inset-0">
          <CustomLoading size={32}></CustomLoading>
        </div>
      ) : isAllUserLoadingError ? (
        <p className="text-red-700 text-2xl text-center">Error Loading Users</p>
      ) : (
        <div className="bg-gray-700 text-gray-200 p-4 rounded-md space-y-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between items-end lg:items-center">
            <h4 className="text-2xl cinzel-semibold">
              Total Users: {allUsersData?.length}
            </h4>
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
          </div>
          <div className="max-h-[400px] overflow-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll</th>
                  <th>Action</th>
                </tr>
              </thead>
              {allUsersData?.map((item, index) => (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item?.userPhotoURL}
                              alt="menu-item-image"
                              onError={(e) => {
                                e.target.src = altUserPhoto;
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="">{item.userName}</p>
                    </td>
                    <td>{item.userEmail}</td>

                    <td>
                      {item?.userRoll ? (
                        <p
                          className="text-green-400 hover:text-orange-400 cursor-pointer"
                          onClick={() => handleUserButtonClick(item._id)}
                        >
                          {item.userRoll}
                        </p>
                      ) : (
                        <button
                          onClick={() => handleUserButtonClick(item._id)}
                          className="text-2xl text-gray-400"
                        >
                          <FaUsers></FaUsers>
                        </button>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => handleDeleteUser(item._id)}
                        className="text-2xl text-red-700"
                      >
                        <MdDelete></MdDelete>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
