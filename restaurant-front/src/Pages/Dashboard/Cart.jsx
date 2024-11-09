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
  const handleDeleteCartItem = async (id) => {
    setCartItemDeleteLoading(true);
    try {
      const deleteItem = await axiosHook.delete(`/allCartItems/${id}`);
      if (deleteItem.data.deletedCount) {
        customAlert("Item Deleted");
      }
      cartItemsRefetch();
    } catch (error) {
      console.log(error);
    } finally {
      setCartItemDeleteLoading(false);
    }
  };

  return (
    <div className="px-4 pt-8">
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
        <div className="bg-gray-700 text-gray-200 p-4 rounded-md space-y-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between items-end lg:items-center">
            <h4 className="text-2xl cinzel-semibold">
              Total Items: {userCartItems?.length}
            </h4>
            <h4 className="text-2xl cinzel-semibold">
              Total Price: ${totalCartPrice}
            </h4>
            {userCartItems?.length ? (
              <Link to={"/dashboard/paymentGateway"}>
                <button className="btn btn-accent">Pay</button>
              </Link>
            ) : (
              <button disabled className="btn btn-accent">
                Pay
              </button>
            )}
          </div>
          <div className="max-h-[400px] overflow-auto">
            <table className="table">
              {/* head */}
              <thead>
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
                        onClick={() => handleDeleteCartItem(item._id)}
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
