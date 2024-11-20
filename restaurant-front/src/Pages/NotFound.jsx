import { Link } from "react-router-dom";
import CustomNavbar from "../Component/Shared/CustomNavbar/CustomNavbar";
import Footer from "../Component/Shared/Footer";

const NotFound = () => {
  return (
    <div className="bg-[#f9f9f9] min-h-screen flex flex-col">
        <CustomNavbar></CustomNavbar>
      <div className="max-w-5xl mx-auto flex-grow flex flex-col gap-2 items-center justify-center text-gray-800">
        <h4 className="text-2xl lg:text-4xl">404 Page Not Found !</h4>
        <p>The page you requested was not found</p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NotFound;
