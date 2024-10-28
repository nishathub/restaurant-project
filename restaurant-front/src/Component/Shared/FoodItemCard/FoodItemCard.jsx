import axios from "axios";
import { useContext } from "react";
import { RestaurantContext } from "../../../ContextProvider/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosHook from "../../../Hooks/axiosHook";

const FoodItemCard = ({ item }) => {
  const {_id, price, image, name, recipe } = item;
  const {user, setAddCartLoading, customAlert, restaurantAPI} = useContext(RestaurantContext);
  const navigate = useNavigate();
  const location = useLocation();
  const attemptURL = location?.pathname;
  const axiosHook = useAxiosHook();


  const handleAddToCart = async (item) => {
    if (!user) {
      customAlert("Log in to add item");
      return navigate("/login", { state: attemptURL });
    }
    const userMail = user.email;
  
    setAddCartLoading(true);
    try {
      // Fetch cart items to check if the item already exists
      const response = await axiosHook.get(`/allCartItems/${user?.email}`);
  
      const cartItems = response.data;
      const itemExists = cartItems.some(
        (cartItem) => cartItem.menuId === _id && cartItem.email === userMail
      );
  
      if (itemExists) {
        customAlert("Item already in the cart");
      } else {
        // Item not in the cart, proceed to add it
        const addResponse = await axiosHook.post(`/allCartItems`, {
          menuId: _id,
          name: name,
          price: price,
          image: image,
          email: userMail,
          quantity: 1,
        });
  
        if (addResponse.data.insertedId) {
          customAlert("Item Added to the Cart");
        }
      }
    } catch (error) {
      console.error(error);
      customAlert(`Error: ${error.message}`);
    } finally {
      setAddCartLoading(false);
    }
  };
  
  return (
    <div className="w-96 rounded-md overflow-hidden hover:shadow-xl duration-300">
      <div className="relative w-full h-60">
        <p className="absolute top-0 right-0 lora-regular text-lg bg-gray-800 text-gray-200 py-2 px-4 rounded-bl-md rounded-tr-md">${price}</p>
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="food-image"
        />
      </div>
      <div className="h-60 p-8 flex flex-col gap-2 items-center justify-center lg:gap-4 text-center bg-gray-300 text-gray-800">
        <h4 className="text-lg lg:text-xl font-semibold">{name}</h4>
        <p className="text-sm lora-regular">{recipe.length > 80 ? recipe.slice(0, 80) : recipe}...</p>
        <button onClick={()=>handleAddToCart(item)} className="p-4 hover:bg-red-700 border-b-4 border-red-700 rounded-md duration-300 cinzel-regular text-gray-800 hover:text-gray-100">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodItemCard;
