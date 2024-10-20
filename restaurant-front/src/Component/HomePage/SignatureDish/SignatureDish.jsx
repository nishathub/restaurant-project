import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";
import CustomLoading from "../../Shared/CustomLoading/CustomLoading";

const SignatureDish = () => {
  const [allMenuItems, isFetchMenuLoading] = useMenu();
  const signatureItem = !isFetchMenuLoading && allMenuItems.find((item) => item.category === "signature");
  const { name, recipe, price, specialty, image } = signatureItem;
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
if(isFetchMenuLoading){
  return <div className="flex items-center justify-center"><CustomLoading size={32}></CustomLoading></div>
}
  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: `center ${backgroundPositionY}px`,
      }}
    >
      <div className=" h-full w-full bg-black/60 pb-12 pt-2">
        <section>
          <SectionTitle
            heading={"Signature Dish"}
            subHeading={"check it out"}
          ></SectionTitle>
        </section>
        <div className="max-w-3xl lg:max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-center">
          <div>
            <img className="rounded-md" src={image} alt="signature-dish" />
          </div>
          <div className="space-y-2 lg:space-y-4 text-gray-200">
            <p className="text-xl cinzel-semibold">${price}</p>
            <h4 className="text-2xl lg:text-4xl cinzel-bold">{name}</h4>
            <p className="md:text-lg">{recipe}</p>
            <p className="md:text-lg italic">{specialty}</p>
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
