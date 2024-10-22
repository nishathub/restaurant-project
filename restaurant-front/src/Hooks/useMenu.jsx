import { useEffect, useState } from "react";

const useMenu = () => {
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [isFetchMenuLoading, setFetchMenuLoading] = useState(true);
  const [errorMenuFetchMessage, setErrorMenuFetchMessage] = useState("");

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        setAllMenuItems(data);
        setFetchMenuLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFetchMenuLoading(false);
        setErrorMenuFetchMessage("error loading data");
      });
  }, []);

  const getCategoryItems = (categoryName) => {
   return allMenuItems.filter(item => item.category === categoryName);
  }

  return {
    allMenuItems,
    isFetchMenuLoading,
    errorMenuFetchMessage,
    saladItems: getCategoryItems('salad'),
    pizzaItems: getCategoryItems('pizza'),
    soupItems: getCategoryItems('soup'),
    dessertItems: getCategoryItems('dessert'),
    drinksItems: getCategoryItems('drinks'),
    offeredItems: getCategoryItems('offered'),
  };
};

export default useMenu;
