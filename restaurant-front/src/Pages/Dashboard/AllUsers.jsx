import { MdDelete, MdOutlineSecurity } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import useUserRoll from "../../Hooks/useUserRoll";

const AllUsers = () => {
  const { customAlert } = useSavourYumContext();
  const { isUserRollPending, userRollData } = useUserRoll();
  const [userActionLoading, setUserActionLoading] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [isUserRollModalActive, setMakeUserRollModalActive] = useState(false);
  const [isDeleteItemModalActive, setDeleteItemModalActive] = useState(false);

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
  const handleDeleteButtonClick = (_id) => {
    if (!isUserRollPending && userRollData === "Admin") {
      setClickedUserId(_id);
      setDeleteItemModalActive(true);
    } else if (!isUserRollPending && userRollData !== "Admin") {
      return customAlert("Only Admin Can Delete Item");
    }
  };
  const handleDeleteUser = async () => {
    setUserActionLoading(true);
    try {
      if (!isUserRollPending && userRollData === "Admin") {
        const deleteItem = await axiosProtected.delete(
          `/allUsers/${clickedUserId}`
        );
        if (deleteItem.data.deletedCount) {
          customAlert("User Deleted");
        }
        allUserRefetch();
        setDeleteItemModalActive(false);
      } else if (!isUserRollPending && userRollData !== "Admin") {
        customAlert("Admin Access Only");
      }
    } catch (error) {
      console.log(error);
      customAlert("Deleting Failed, try again");
    } finally {
      setUserActionLoading(false);
    }
  };

  return (
    <div className="px-4 py-12">
      {/* ABSOLUTE MODAL Start */}
      <div
        className={`absolute bg-gray-800/70 flex inset-0 z-20 text-gray-800 lora-regular duration-500 ${
          isUserRollModalActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-md relative">
          <button
            onClick={() => setMakeUserRollModalActive(false)}
            className="absolute right-0 top-0 bg-red-700 hover:bg-red-800 px-4 py-2 text-gray-100"
          >
            X
          </button>
          <h4 className="cinzel-bold mb-4">Select a roll</h4>
          <button
            onClick={(e) => handleMakeUserRoll(e.target.innerText)}
            className="btn w-32 text-gray-100"
          >
            Admin
          </button>
          <button
            onClick={(e) => handleMakeUserRoll(e.target.innerText)}
            className="btn w-32 text-gray-100"
          >
            Moderator
          </button>
          <button
            onClick={(e) => handleMakeUserRoll(e.target.innerText)}
            className="btn w-32 text-gray-100"
          >
            Editor
          </button>
        </div>
      </div>
      {/* ABSOLUTE MODAL END  */}
      {/* ABSOLUTE MODAL to DELETE Item Start */}
      <div
        className={`absolute bg-gray-800/70 flex inset-0 z-20 text-gray-800 lora-regular duration-500 ${
          isDeleteItemModalActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-md relative">
          <button
            onClick={() => setDeleteItemModalActive(false)}
            className="absolute right-0 top-0 bg-red-700 hover:bg-red-800 px-4 py-2 text-gray-100"
          >
            X
          </button>
          <h4 className="cinzel-semibold mb-4">Are you sure?</h4>
          <div className="flex gap-6">
            <button
              className="btn btn-error text-gray-100"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
            <button
              className="btn text-gray-100"
              onClick={() => setDeleteItemModalActive(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* ABSOLUTE MODAL to DELETE Item END  */}

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
        <div className="bg-[rgb(250,250,250)] text-gray-800 p-4 rounded-md space-y-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between items-start lg:items-center">
            <h4 className="text-lg lg:text-2xl cinzel-semibold">
              Total Users: {allUsersData?.length}
            </h4>
            <div
              className={`${
                userRollData ? "text-green-700 text-sm" : "hidden"
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
          <div className="max-h-[320px lg:max-h-[400px] overflow-auto">
            <table className="table text-center">
              {/* head */}
              <thead className="sticky top-0 bg-gray-800 text-gray-100 z-10">
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
                          className="text-green-700 hover:text-orange-700 cursor-pointer"
                          onClick={() => handleUserButtonClick(item._id)}
                        >
                          {item.userRoll}
                        </p>
                      ) : (
                        <button
                          title="Change"
                          onClick={() => handleUserButtonClick(item._id)}
                          className="text-2xl text-gray-800"
                        >
                          <FaUsers></FaUsers>
                        </button>
                      )}
                    </td>

                    <td>
                      <button
                        title="Delete"
                        onClick={() => handleDeleteButtonClick(item._id)}
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
