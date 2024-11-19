import {
  FaCalendarCheck,
  FaShoppingCart,
  FaStar,
  FaWallet,
} from "react-icons/fa";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useCart from "../../Hooks/useCart";
import usePaymentHistory from "../../Hooks/usePaymentHistory";

const UserDashboardHome = () => {
  const { user } = useSavourYumContext();
  const { userCartItems } = useCart();
  const { paymentHistoryData } = usePaymentHistory();
  const altUserPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
  return (
    <div className="px-4 py-12 text-gray-800">
      <div>
        <h2 className="text-2xl text-gray-800">
          Welcome {user?.displayName && user?.displayName} !
        </h2>
      </div>
      <div className="h-96 md:h-72 grid md:grid-cols-2 mt-12">
        <div className="flex flex-col gap-2 lg:gap-6 lg:items-center justify-center text-gray-100 bg-gray-800 px-12">
          <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user?.photoURL || altUserPhoto}
              alt="user-image"
            />
          </div>
          <h4 className="text-lg lg:text-xl cinzel-semibold">
            {user?.displayName}
          </h4>
        </div>
        <div className="flex flex-col gap-2 lg:gap-6 justify-center bg-[rgb(255,255,255)] px-12">
          <h4 className="text-xl lg:text-2xl">My Activities</h4>
          <ul>
            <li className="flex items-center gap-2">
              <span>
                <FaShoppingCart></FaShoppingCart>
              </span>{" "}
              <p>Cart: {userCartItems?.length}</p>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FaStar></FaStar>
              </span>{" "}
              <p>Reviews: </p>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FaCalendarCheck></FaCalendarCheck>
              </span>{" "}
              <p>Bookings: </p>
            </li>
            <li className="flex items-center gap-2">
              <span>
                <FaWallet></FaWallet>
              </span>{" "}
              <p>Payments: {paymentHistoryData?.length}</p>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default UserDashboardHome;
