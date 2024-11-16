import { Helmet } from "react-helmet-async";
import PageCover from "../Component/Shared/Cover/PageCover";
import SectionCover from "../Component/Shared/Cover/SectionCover";
import SectionTitle from "../Component/Shared/SectionTitle/SectionTitle";
import MenuCategory from "../Component/Menu/MenuCategory/MenuCategory";
import useMenu from "../Hooks/useMenu";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";
import pizzaImage from "../../src/assets/menuCategory-images/banner-pizza.jpg";
import soupImage from "../../src/assets/menuCategory-images/banner-soup.jpg";
import saladImage from "../../src/assets/menuCategory-images/menu-salad.jpg";
import dessertImage from "../../src/assets/menuCategory-images/menu-dessert.jpg";
import drinkImage from "../../src/assets/menuCategory-images/menu-drinks.jpg";

const Menu = () => {
  const {
    offeredItems,
    soupItems,
    pizzaItems,
    saladItems,
    dessertItems,
    drinksItems,
    isFetchMenuLoading,
    errorMenuFetchMessage,
  } = useMenu();

  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <PageCover pageName="Our Menu" image={soupImage}></PageCover>
      {errorMenuFetchMessage ? (
        <div className="mt-8">
          <p className="text-red-700 cinzel-regular text-center">
            {errorMenuFetchMessage}!
          </p>
        </div>
      ) : (
        <div>
          <section className="mt-12">
            <SectionTitle
              heading={"Today's Offer"}
              subHeading={"Hurry up"}
            ></SectionTitle>
          </section>
          {isFetchMenuLoading ? (
            <div className="flex items-center justify-center py-8">
              <CustomLoading size={32}></CustomLoading>
            </div>
          ) : (
            <MenuCategory categoryItem={offeredItems}></MenuCategory>
          )}

          <SectionCover
            image={soupImage}
            SectionName="Soups"
            details="Warm your soul with our hearty soups! Whether you crave creamy indulgence or a light broth, our selection of soups is the perfect start to your meal or a comforting choice on its own."
          ></SectionCover>
          {isFetchMenuLoading ? (
            <div className="flex items-center justify-center py-8">
              <CustomLoading size={32}></CustomLoading>
            </div>
          ) : (
            <MenuCategory categoryItem={soupItems}></MenuCategory>
          )}
          <SectionCover
            SectionName="Pizza"
            image={pizzaImage}
            details="Experience a slice of heaven! Our pizzas are hand-tossed, stone-baked, and topped with premium ingredients. From classic favorites to gourmet combinations, each bite is a celebration of flavor."
          ></SectionCover>

          {isFetchMenuLoading ? (
            <div className="flex items-center justify-center py-8">
              <CustomLoading size={32}></CustomLoading>
            </div>
          ) : (
            <MenuCategory categoryItem={pizzaItems}></MenuCategory>
          )}
          <SectionCover
            SectionName="salad"
            image={saladImage}
            details="Fresh, crisp, and full of flavor! Our salads are crafted from the finest seasonal ingredients, offering a perfect balance of healthy and delicious. Ideal as a light meal or the perfect complement to any dish."
          ></SectionCover>
          {isFetchMenuLoading ? (
            <div className="flex items-center justify-center py-8">
              <CustomLoading size={32}></CustomLoading>
            </div>
          ) : (
            <MenuCategory categoryItem={saladItems}></MenuCategory>
          )}
          <SectionCover
            SectionName="Dessert"
            image={dessertImage}
            details="Indulge in sweetness! From decadent cakes to refreshing sorbets, our desserts are the perfect way to end your meal on a high note. Treat yourself to a little luxury with every bite."
          ></SectionCover>
          {isFetchMenuLoading ? (
            <div className="flex items-center justify-center py-8">
              <CustomLoading size={32}></CustomLoading>
            </div>
          ) : (
            <MenuCategory categoryItem={dessertItems}></MenuCategory>
          )}
          <SectionCover
            SectionName="Drinks"
            image={drinkImage}
            details="Indulge in sweetness! From decadent cakes to refreshing sorbets, our desserts are the perfect way to end your meal on a high note. Treat yourself to a little luxury with every bite."
          ></SectionCover>
          {isFetchMenuLoading ? (
            <div className="flex items-center justify-center py-8">
              <CustomLoading size={32}></CustomLoading>
            </div>
          ) : (
            <MenuCategory categoryItem={drinksItems}></MenuCategory>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
