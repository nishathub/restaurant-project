import React, { createContext, useEffect, useState } from "react";
import auth from "../FirebaseAuth/FirebaseAuth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
export const RestaurantContext = createContext();
const ContextProvider = ({ children }) => {
  // BACKEND API
  const restaurantAPI = import.meta.env.VITE_SAVOURYUM_API;
  // FIREBASE AUTH STATE
  const [userLoading, setUserLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [user, setUser] = useState(null);
  // CUSTOM ALERT
  const [isToastActive, setToastActive] = useState(false);
  const [toastText, setToastText] = useState("");
  // CART
  const [addCartLoading, setAddCartLoading] = useState(false);
  const cartItems = [];
  const cartDisplayLoading = false;
  const allProducts = [2, 3, 4];

  // FIREBASE AUTH
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logOutUser = () => {
    return signOut(auth);
  };
  // Setting Observer for user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === "nishat@mail.com") {
        setIsAdmin(true);
      } else if (currentUser?.email !== "nishat@mail.com") {
        setIsAdmin(false);
      }
      setUserLoading(false);
    });
    return () => unSubscribe();
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
    restaurantAPI,
    userLoading,
    user,
    isAdmin,
    createNewUser,
    signInUser,
    googleSignIn,
    updateUser,
    logOutUser,
    addCartLoading,
    setAddCartLoading,
    cartItems,
    cartDisplayLoading,
    allProducts,
    toastText,
    isToastActive,
    setToastActive,
    customAlert,
  };
  return (
    <RestaurantContext.Provider value={contextData}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default ContextProvider;
