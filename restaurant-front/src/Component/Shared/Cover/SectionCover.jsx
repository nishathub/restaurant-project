import React, { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const SectionCover = ({
  SectionName = "name",
  image = "../../../../src/assets/banner-images/banner-soup.jpg",
  details = "some details  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, ea obcaecati nemo amet ipsam praesentium impedit earum ipsum ratione aliquid facilis itaque. Porro, libero velit dignissimos nisi mollitia laborum cumque, aliquam placeat id quia illum itaque iure labore provident ut rem reiciendis corrupti",
}) => {
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
  const backgroundPositionY = scrollY * -0.1;
  return (
    <div
      className="h-[60vh] flex justify-center items-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: `center ${backgroundPositionY}px`,
      }}
    >
      <div className="h-72 w-[90vw] md:w-[70vw] rounded-md flex flex-col items-center justify-center p-12 bg-white/90 text-gray-800">
        <div className="py-2 px-4 border-y border-gray-800 mb-6">
          <h4 className="text-2xl lg:text-4xl uppercase cinzel-regular">
            {SectionName}
          </h4>
        </div>
        <p className="md:text-lg text-center">{details}</p>
      </div>
    </div>
  );
};

export default SectionCover;
