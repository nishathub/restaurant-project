import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RestaurantContext } from "../ContextProvider/ContextProvider";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";

const PrivateRoutes = ({ children }) => {
  const { userLoading, user, customAlert } = useContext(RestaurantContext);
  const location = useLocation();
  const attemptURL = location.pathname;

  if (userLoading) {
    return (
      <div className="absolute bg-white/40 inset-0 flex items-center justify-center ">
        <CustomLoading size={32}></CustomLoading>
      </div>
    );
  } else if (!user) {
    customAlert("Log in to visit this page");
    return <Navigate state={attemptURL} to={"/login"}></Navigate>;
  }

  return <div>{children}</div>;
};

export default PrivateRoutes;
