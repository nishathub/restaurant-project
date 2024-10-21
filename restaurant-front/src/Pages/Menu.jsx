import { Helmet } from "react-helmet-async";
import PageCover from "../Component/Shared/Cover/PageCover";
import Category from "../Component/HomePage/Category/Category";
import SectionCover from "../Component/Shared/Cover/SectionCover";
import { useEffect, useState } from "react";
import SectionTitle from "../Component/Shared/SectionTitle/SectionTitle";
import MenuCategory from "../Component/Menu/MenuCategory/MenuCategory";

const Menu = () => {
  const [saladItems, setSaladItems] = useState([]);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [soupItems, setSoupItems] = useState([]);
  const [dessertItems, setDessertItems] = useState([]);
  const [drinksItems, setDrinksItems] = useState([]);
  const [offeredItems, setOfferedItems] = useState([]);
  useEffect(() => {
    try {
      fetch("menu.json")
        .then((res) => res.json())
        .then((data) => {
          const salad = data.filter((item) => item.category === "salad");
          const pizza = data.filter((item) => item.category === "pizza");
          const soup = data.filter((item) => item.category === "soup");
          const dessert = data.filter((item) => item.category === "dessert");
          const drinks = data.filter((item) => item.category === "drinks");
          const offered = data.filter((item) => item.category === "offered");
          setDessertItems(dessert);
          setPizzaItems(pizza);
          setSaladItems(salad);
          setSoupItems(soup);
          setDrinksItems(drinks);
          setOfferedItems(offered);
        });
    } catch (error) {
      console.log("error loading menu :", error);
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <PageCover pageName="Our Menu"></PageCover>
      <SectionTitle
        heading={"Today's Offer"}
        subHeading={"Try your luck"}
      ></SectionTitle>
      <MenuCategory categoryItem={offeredItems}></MenuCategory>
      <SectionCover
        SectionName="Soups"
        details="Warm your soul with our hearty soups! Whether you crave creamy indulgence or a light broth, our selection of soups is the perfect start to your meal or a comforting choice on its own."
      ></SectionCover>
      <MenuCategory categoryItem={soupItems}></MenuCategory>
      <SectionCover
        SectionName="Pizza"
        details="Experience a slice of heaven! Our pizzas are hand-tossed, stone-baked, and topped with premium ingredients. From classic favorites to gourmet combinations, each bite is a celebration of flavor."
      ></SectionCover>
      <MenuCategory categoryItem={pizzaItems}></MenuCategory>
      <SectionCover
        SectionName="salad"
        details="Fresh, crisp, and full of flavor! Our salads are crafted from the finest seasonal ingredients, offering a perfect balance of healthy and delicious. Ideal as a light meal or the perfect complement to any dish."
      ></SectionCover>
      <MenuCategory categoryItem={saladItems}></MenuCategory>
      <SectionCover
        SectionName="Dessert"
        details="Indulge in sweetness! From decadent cakes to refreshing sorbets, our desserts are the perfect way to end your meal on a high note. Treat yourself to a little luxury with every bite."
      ></SectionCover>
      <MenuCategory categoryItem={dessertItems}></MenuCategory>
      <SectionCover
        SectionName="Drinks"
        details="Indulge in sweetness! From decadent cakes to refreshing sorbets, our desserts are the perfect way to end your meal on a high note. Treat yourself to a little luxury with every bite."
      ></SectionCover>
      <MenuCategory categoryItem={drinksItems}></MenuCategory>
    </div>
  );
};

export default Menu;
