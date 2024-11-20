import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const NavCartBox = ({ cartItems, isCartOpen, setCartOpen, cartBoxRef }) => {
  return (
    <div ref={cartBoxRef} className="relative">
      {/* ABSOLUTE BADGE  */}
      <div className="absolute -top-2 -right-2 bg-gray-700 text-sm text-white px-2 rounded-full">
        <span>{cartItems?.length}</span>
      </div>
      {/* ABSOLUTE CART BOX  */}
      {isCartOpen && (
        <div className="absolute top-16 right-0 w-60 md:w-80 rounded-md bg-base-100 p-4">
          <span className="font-bold text-gray-100 md:text-lg">
            {cartItems?.length} Items
          </span>
          <div className="max-h-52 overflow-auto space-y-2">
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center justify-between py-2 border-b border-gray-400 text-gray-200"
              >
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    {item.quantity} * ${item.price}
                  </p>
                </div>
                <img
                  className="w-12 h-8 object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>
            ))}
          </div>
          <Link to="/dashboard/cart">
            <button className="bg-gray-300 text-black px-2 py-1 w-full rounded-sm hover:bg-base-100 hover:text-gray-100 duration-300">
              View cart
            </button>
          </Link>
        </div>
      )}
      {/* CART ICON  */}
      <button onClick={() => setCartOpen(!isCartOpen)}>
        <p className="hover:text-gray-300 text-xl p-2 text-white duration-300 rounded-full">
          <MdOutlineShoppingCart />
        </p>
      </button>
    </div>
  );
};

export default NavCartBox;
