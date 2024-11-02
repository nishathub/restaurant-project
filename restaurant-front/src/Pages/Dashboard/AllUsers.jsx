import { MdDelete, MdOutlineSecurity } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import useCart from "../../Hooks/useCart";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const {isAdmin, customAlert } = useSavourYumContext();
  const [isUserDeleteLoading, setUserDeleteLoading] = useState(false);
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
  console.log(allUsersData);

  const handleDeleteUser = async (id) => {
    setUserDeleteLoading(true);
    try {
      const deleteItem = await axiosProtected.delete(`/allUsers/${id}`);
      if (deleteItem.data.deletedCount) {
        customAlert("Item Deleted");
      }
      allUserRefetch();
    } catch (error) {
      console.log(error);
    } finally {
      setUserDeleteLoading(false);
    }
  };

  return (
    <div className="px-4 pt-8">
      <div className="mb-12">
        <SectionTitle
          heading={"Manage All Users"}
          subHeading={"Count Matters"}
        ></SectionTitle>
      </div>
      {isAllUserPending || isUserDeleteLoading ? (
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
                isAdmin ? "text-green-400 text-sm" : "hidden"
              } text-center`}
            >
              <div className="flex items-center gap-2 mx-auto">
                <p>
                  <MdOutlineSecurity />
                </p>
                <p>Admin</p>
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
                      <button className="text-2xl text-gray-400">
                        <FaUsers></FaUsers>
                      </button>
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
