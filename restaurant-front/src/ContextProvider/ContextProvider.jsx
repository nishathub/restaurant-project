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
import useAxiosHookPublic from "../Hooks/useAxiosHookPublic";
export const RestaurantContext = createContext();
const ContextProvider = ({ children }) => {
  const axiosPublic = useAxiosHookPublic();
  // BACKEND API
  const restaurantAPI = import.meta.env.VITE_SAVOURYUM_API;
  // FIREBASE AUTH STATE
  const [userLoading, setUserLoading] = useState(true);
  const isAdmin = true;
  const [user, setUser] = useState(null);
  // CUSTOM ALERT
  const [isToastActive, setToastActive] = useState(false);
  const [toastText, setToastText] = useState("");
  // CART
  const [addCartLoading, setAddCartLoading] = useState(false);
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
      if (currentUser) {
        const userEmail = currentUser.email;
        axiosPublic
          .post("/jwt", {userEmail})
          .then((res) => {
            if(res.data.token){
              localStorage.setItem('ACCESS_TOKEN_JWT', res.data.token)
            }
          })
          .catch((err) => console.log(err))
      } else {
        localStorage.removeItem('ACCESS_TOKEN_JWT');
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
