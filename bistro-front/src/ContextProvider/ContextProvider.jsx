import React, { createContext, useState } from "react";
export const RestaurantContext = createContext();
const ContextProvider = ({ children }) => {
  const loading = false;
  const user = {displayName : 'User-Name'};
  const isAdmin = true;
  const logOutUser = null;
  const cartItems = [];
  const cartDisplayLoading = false;
  const allProducts = [2, 3, 4];
  const [foundProducts, setFoundProduct] = useState([]);
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
    foundProducts,
    setFoundProduct,
    customAlert,
  };
  return (
    <RestaurantContext.Provider value={contextData}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default ContextProvider;
