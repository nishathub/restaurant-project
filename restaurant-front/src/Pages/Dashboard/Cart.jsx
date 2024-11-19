import { MdDelete } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import useCart from "../../Hooks/useCart";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { Link } from "react-router-dom";

const Cart = () => {
  const { customAlert } = useSavourYumContext();
  const [isCartItemDeleteLoading, setCartItemDeleteLoading] = useState(false);
  const [isDeleteItemModalActive, setDeleteItemModalActive] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(null);

  const axiosHook = useAxiosHookProtected();
  const {
    cartItemsRefetch,
    isCartItemsLoading,
    cartItemsLoadingError,
    userCartItems,
  } = useCart();
  const totalCartPrice = userCartItems?.reduce((total, current) => {
    return total + current.price;
  }, 0);
  const handleDeleteButtonClick = (_id) => {
    setClickedItemId(_id);
    setDeleteItemModalActive(true);
  };
  const handleDeleteCartItem = async () => {
    setCartItemDeleteLoading(true);
    try {
      const deleteItem = await axiosHook.delete(
        `/allCartItems/${clickedItemId}`
      );
      if (deleteItem.data.deletedCount) {
        customAlert("Item Deleted");
      }
      cartItemsRefetch();
    } catch (error) {
      console.log(error);
    } finally {
      setCartItemDeleteLoading(false);
      setDeleteItemModalActive(false);
    }
  };

  return (
    <div className="px-4 py-12">
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
              onClick={handleDeleteCartItem}
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
          heading={"Happy Shopping"}
          subHeading={"My Cart"}
        ></SectionTitle>
      </div>
      {isCartItemsLoading || isCartItemDeleteLoading ? (
        <div className="flex justify-center items-center inset-0">
          <CustomLoading size={32}></CustomLoading>
        </div>
      ) : cartItemsLoadingError ? (
        <p className="text-red-700 text-2xl text-center">
          Error Loading Cart Items
        </p>
      ) : (
        <div className="bg-[rgb(250,250,250)] text-gray-800 p-4 rounded-md space-y-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between items-start lg:items-center">
            <h4 className="text-lg lg:text-2xl cinzel-semibold">
              Total Items: {userCartItems?.length}
            </h4>
            <h4 className="text-lg lg:text-2xl cinzel-semibold">
              Total Price: ${totalCartPrice.toFixed(2)}
            </h4>
            {userCartItems?.length ? (
              <Link to={"/dashboard/paymentGateway"}>
                <button className="px-4 py-2 bg-gray-800 text-gray-100 hover:bg-gray-700 rounded-md ">
                  Pay
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 bg-gray-800 text-gray-100 hover:bg-gray-700 rounded-md "
              >
                Pay
              </button>
            )}
          </div>
          <div className="max-h-[320px] md:max-h-[400px] overflow-auto">
            {" "}
            <table className="table">
              {/* head */}
              <thead className="sticky top-0 bg-gray-800 text-gray-100 z-10">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {userCartItems?.map((item, index) => (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt="menu-item-image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="">{item.name}</p>
                    </td>
                    <td>${item.price}</td>
                    <th>
                      <button
                        onClick={() => handleDeleteButtonClick(item._id)}
                        className="text-2xl text-red-700"
                      >
                        <MdDelete></MdDelete>
                      </button>
                    </th>
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

export default Cart;
