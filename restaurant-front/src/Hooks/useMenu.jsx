import { useEffect, useState } from "react";

const useMenu = () => {
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [isFetchMenuLoading, setFetchMenuLoading] = useState(true);
  const [isAllMenuRefetch, setAllMenuRefetch] = useState(false);
  const [errorMenuFetchMessage, setErrorMenuFetchMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/allMenu")
      .then((res) => res.json())
      .then((data) => {
        setAllMenuItems(data);
      })
      .catch((err) => {
        console.log("from useMenu catch block", err);
        setErrorMenuFetchMessage("error loading data");
      })
      .finally(() => {
        setAllMenuRefetch(false);
        setFetchMenuLoading(false);
      });
  }, [isAllMenuRefetch]);

  const getCategoryItems = (categoryName) => {
    return allMenuItems.filter((item) => item.category === categoryName);
  };

  return {
    allMenuItems,
    isFetchMenuLoading,
    errorMenuFetchMessage,
    setAllMenuRefetch,
    saladItems: getCategoryItems("salad"),
    pizzaItems: getCategoryItems("pizza"),
    soupItems: getCategoryItems("soup"),
    dessertItems: getCategoryItems("dessert"),
    drinksItems: getCategoryItems("drinks"),
    offeredItems: getCategoryItems("offered"),
  };
};

export default useMenu;
