import { MdDelete, MdOutlineSecurity } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { FaEdit } from "react-icons/fa";
import useUserRoll from "../../Hooks/useUserRoll";
import useMenu from "../../Hooks/useMenu";

const ManageItems = () => {
  const { customAlert } = useSavourYumContext();
  const { isUserRollPending, userRollData } = useUserRoll();
  const {
    allMenuItems,
    isFetchMenuLoading,
    errorMenuFetchMessage,
    setAllMenuRefetch,
  } = useMenu();
  const [userActionLoading, setItemActionLoading] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [isEditItemModalActive, setEditItemModalActive] = useState(false);
  const [isDeleteItemModalActive, setDeleteItemModalActive] = useState(false);
  const axiosProtected = useAxiosHookProtected();

  const handleItemEditButtonClick = (_id) => {
    if (!isUserRollPending && userRollData === "Admin") {
      setClickedItemId(_id);
      setEditItemModalActive(true);
    } else if (!isUserRollPending && userRollData !== "Admin") {
      return customAlert("Only Admin Can Edit Item");
    }
  };
  const handleMakeUserRoll = async (roll) => {
    try {
      setItemActionLoading(true);
      const updateInfo = { userRoll: roll };
      const response = await axiosProtected.patch(
        `/allUsers/${clickedItemId}`,
        updateInfo
      );
      if (response.data.modifiedCount) {
        customAlert("Updated Successfully");
        allUserRefetch();
      }
      setEditItemModalActive(false);
    } catch (error) {
      console.log(error);
      customAlert("Failed to update userRoll");
    } finally {
      setItemActionLoading(false);
    }
  };
  const handleDeleteButtonClick = (_id) => {
    if (!isUserRollPending && userRollData === "Admin") {
      setClickedItemId(_id);
      setDeleteItemModalActive(true);
    } else if (!isUserRollPending && userRollData !== "Admin") {
      return customAlert("Only Admin Can Delete Item");
    }
  };
  const handleDeleteItem = async () => {
    setItemActionLoading(true);
    try {
      if (!isUserRollPending && userRollData === "Admin") {
        const deleteItem = await axiosProtected.delete(
          `/allMenu/${clickedItemId}`
        );
        if (deleteItem.data.deletedCount) {
          customAlert("Item Deleted");
        }
        setAllMenuRefetch(true);
      } else if (!isUserRollPending && userRollData !== "Admin") {
        customAlert("Admin Access Only");
      }
    } catch (error) {
      console.log(error);
      customAlert("Error Deleting Item!!");
    } finally {
      setItemActionLoading(false);
      setDeleteItemModalActive(false);
    }
  };

  return (
    <div className="px-4 pt-8">
      {/* ABSOLUTE MODAL to Edit Item Start */}
      <div
        className={`absolute bg-gray-500/30 flex inset-0 z-10 text-gray-800 lora-regular duration-500 ${
          isEditItemModalActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-300 rounded-md relative">
          <button
            onClick={() => setEditItemModalActive(false)}
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
      {/* ABSOLUTE MODAL to Edit Item END  */}
      {/* ABSOLUTE MODAL to DELETE Item Start */}
      <div
        className={`absolute bg-gray-500/30 flex inset-0 z-10 text-gray-800 lora-regular duration-500 ${
          isDeleteItemModalActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-300 rounded-md relative">
          <button
            onClick={() => setDeleteItemModalActive(false)}
            className="absolute right-0 top-0 btn btn-error btn-sm"
          >
            X
          </button>
          <h4 className="cinzel-semibold mb-4">Are you sure?</h4>
          <div className="flex gap-6">
            <button className="btn btn-error" onClick={handleDeleteItem}>
              Delete
            </button>
            <button
              className="btn"
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
          heading={"Manage Menu Items"}
          subHeading={"Keep Up to date"}
        ></SectionTitle>
      </div>
      {isFetchMenuLoading || userActionLoading ? (
        <div className="flex justify-center items-center inset-0">
          <CustomLoading size={32}></CustomLoading>
        </div>
      ) : errorMenuFetchMessage ? (
        <p className="text-red-700 text-2xl text-center">Error Loading Menu</p>
      ) : (
        <div className="bg-gray-700 text-gray-200 p-4 rounded-md space-y-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between items-end lg:items-center">
            <h4 className="text-2xl cinzel-semibold">
              Total Menu Items: {allMenuItems?.length}
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
            <table className="table text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              {allMenuItems?.map((item, index) => (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              className=""
                              src={item?.image}
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
                      <p className="">{item.name}</p>
                    </td>
                    <td>${item.price}</td>

                    <td>
                      <button>
                        <p className="text-lg">
                          <FaEdit />
                        </p>
                      </button>
                    </td>

                    <td>
                      <button
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

export default ManageItems;