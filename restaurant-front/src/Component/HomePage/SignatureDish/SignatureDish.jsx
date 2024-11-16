import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";
import CustomLoading from "../../Shared/CustomLoading/CustomLoading";

const SignatureDish = () => {
  const { allMenuItems, isFetchMenuLoading, errorMenuFetchMessage } = useMenu();
  const signatureItem = isFetchMenuLoading
    ? {}
    : allMenuItems.find((item) => item.category === "signature");
  const [scrollY, setScrollY] = useState(0);
  // Parallax Effect of Signature bg
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const backgroundPositionY = scrollY * -0.05;
  if (isFetchMenuLoading) {
    return (
      <div className="flex items-center justify-center">
        <CustomLoading size={32}></CustomLoading>
      </div>
    );
  }
  if (errorMenuFetchMessage) {
    return <p className="text-red-500 text-center">{errorMenuFetchMessage}</p>;
  }
  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${signatureItem?.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: `center ${backgroundPositionY}px`,
      }}
    >
      <div className=" h-full w-full bg-black/60 pb-12 pt-2">
        <section className="mb-12">
          <div className="max-w-7xl mx-auto text-center w-fit">
            {/* SUBHEADING  */}
            <div className="p-2 lg:p-4">
              <p className="text-lg lg:text-xl text-red-500 capitalize italic">
                Check it out
              </p>
            </div>
            {/* HEADING  */}
            <div className="py-2 px-4 border-y border-gray-100">
              <h4 className="text-2xl lg:text-4xl uppercase text-gray-100 cinzel-regular">
                Signature Dish
              </h4>
            </div>
          </div>
        </section>
        <div className="max-w-3xl lg:max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-center">
          <div>
            <img
              className="rounded-md"
              src={signatureItem?.image}
              alt="signature-dish"
            />
          </div>
          <div className="space-y-2 lg:space-y-4 text-gray-200">
            <p className="text-xl cinzel-semibold">${signatureItem?.price}</p>
            <h4 className="text-2xl lg:text-4xl cinzel-bold">
              {signatureItem?.name}
            </h4>
            <p className="md:text-lg">{signatureItem?.recipe}</p>
            <p className="md:text-lg italic">{signatureItem?.specialty}</p>
            <Link to={"/"}>
              <button className="p-2 lg:p-4 mt-2 lg:mt-4 hover:bg-red-700 border-b-4 border-red-700 rounded-md duration-300 text-gray-200 cinzel-regular">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureDish;
