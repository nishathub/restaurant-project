import React, { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const PageCover = ({
  pageName = "name",
  image = "../../../../src/assets/banner-images/banner-soup.jpg",
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
  const backgroundPositionY = scrollY * -0.05;
  return (
    <div
      className="h-[30vh] lg:h-[50vh]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: `center ${backgroundPositionY}px`,
      }}
    >
      <div className="w-full h-full px-4 flex justify-center items-center bg-black/50">
        <div className="h-52 w-[80vw] md:w-[60vw] p-4 text-gray-200 flex flex-col items-center justify-end">
          <h4 className={`text-4xl lg:text-6xl mb-2 uppercase cinzel-semibold`}>
            {pageName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
