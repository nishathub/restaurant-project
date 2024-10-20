import React, { createContext, useEffect, useState } from "react";
export const RestaurantContext = createContext();
const ContextProvider = ({ children }) => {
  const loading = false;
  const user = { displayName: "User-Name" };
  const isAdmin = true;
  const logOutUser = null;
  const cartItems = [];
  const cartDisplayLoading = false;
  const allProducts = [2, 3, 4];
  const [popularItem, setPopularItem] = useState([]);
  const [signatureItem, setSignatureItem] = useState({});
  useEffect(() => {
    try {
      fetch("menu.json")
        .then((res) => res.json())
        .then((data) => {
          const popularData = data.filter(
            (item) => item.category === "popular"
          );
          const signatureItem = data.find(
            (item) => item.category === "signature"
          );
          setSignatureItem(signatureItem);
          setPopularItem(popularData);
        })
        .catch((err) => console.log(err, "error from try block"));
    } catch (error) {
      console.log("error from menu fetch catch block ", error);
    }
  }, []);

  // CUSTOM ALERT (SIMILAR TO TOAST)
  const customAlert = (alertText) => {
    setToastText(alertText);
    setToastActive(true);
    setTimeout(() => {
      setToastActive(false);
    }, 1500);
  };

  const contextData = {
    loading,
    user,
    isAdmin,
    logOutUser,
    cartItems,
    cartDisplayLoading,
    allProducts,
    popularItem,
    signatureItem,
    customAlert,
  };
  return (
    <RestaurantContext.Provider value={contextData}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default ContextProvider;
