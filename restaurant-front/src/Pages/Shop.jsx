import { Helmet } from "react-helmet-async";
import Banner from "../Component/Shared/Banner/Banner";
import PageCover from "../Component/Shared/Cover/PageCover";
import dessertImage from "../../src/assets/menuCategory-images/menu-dessert.jpg";
import CustomTab from "../Component/Shared/CustomTab/CustomTab";
import { useEffect, useState } from "react";
import useMenu from "../Hooks/useMenu";
import FoodItemCard from "../Component/Shared/FoodItemCard/FoodItemCard";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";

const Shop = () => {
  const {
    allMenuItems,
    soupItems,
    pizzaItems,
    saladItems,
    dessertItems,
    drinksItems,
    isFetchMenuLoading,
  } = useMenu();

  const [displayMenuItems, setDisplayMenuItems] = useState(allMenuItems);
  // Update displayMenuItems whenever allMenuItems changes
  useEffect(() => {
    setDisplayMenuItems(allMenuItems);
  }, [allMenuItems]);

  return (
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <PageCover pageName="our shop" image={dessertImage}></PageCover>
      <div className="max-w-7xl mx-auto px-6 my-20 cinzel-regular">
        <div className="mb-20 w-fit mx-auto">
          <CustomTab setDisplayMenuItems={setDisplayMenuItems}>
            <button item={allMenuItems}>All</button>
            <button item={saladItems}>Salad</button>
            <button item={pizzaItems}>Pizza</button>
            <button item={soupItems}>Soup</button>
            <button item={dessertItems}>Dessert</button>
            <button item={drinksItems}>Drinks</button>
          </CustomTab>
        </div>
        {isFetchMenuLoading ? (
          <div className="flex items-center justify-center">
            <CustomLoading size={32}></CustomLoading>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {displayMenuItems.map((item) => (
              <FoodItemCard key={item._id} item={item}></FoodItemCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
