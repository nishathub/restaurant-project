import soup from "../../../assets/category-images/category-soup.png";
import burger from "../../../assets/category-images/category-burger.png";
import pizza from "../../../assets/category-images/category-pizza.png";
import salad from "../../../assets/category-images/category-salad.png";
import dessert from "../../../assets/category-images/category-dessert.png";
import "./CategoryStyle.css";

import { Link } from "react-router-dom";
const Category = () => {
  return (
    <div className="py-12 bg-red-700">
      <div className="marquee-container mb-6">
        <p className="marquee capitalize text-2xl text-gray-200">
        <span className="text-3xl lg:text-5xl">🛵</span> Free delivery everyday Gulshan : 0150 111 8888 (12pm - 1am), Uttara :
          0150 111 8888 (12pm - 11pm), Mirpur : 0150 111 8888 (12pm - 11pm),
          Bashundhara : 0150 111 8888 (12pm - 10pm), Banani : 0170 999 0777
          (12pm - 12am), Dhanmondi : 0150 111 8888 (12pm - 12am) , Khilgaon :
          0150 111 8888 (12pm - 10pm)
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row flex-wrap gap-12 lg:gap-20 justify-center items-center">
        <Link to={"/"} className="">
          <img className="w-28 lg:w-32 lg:mb-4" src={pizza} alt="soup-photo" />
          <h6 className="text-center text-lg lg:text-2xl text-gray-200 font-bold">
            PIZZA
          </h6>
        </Link>
        <Link to={"/"} className="">
          <img className="w-28 lg:w-32 lg:mb-4" src={burger} alt="soup-photo" />
          <h6 className="text-center text-lg lg:text-2xl text-gray-200 font-bold">
            BURGER
          </h6>
        </Link>
        <Link to={"/"} className="">
          <img className="w-28 lg:w-32 lg:mb-4" src={soup} alt="soup-photo" />
          <h6 className="text-center text-lg lg:text-2xl text-gray-200 font-bold">
            SOUP
          </h6>
        </Link>
        <Link to={"/"} className="">
          <img className="w-28 lg:w-32 lg:mb-4" src={salad} alt="soup-photo" />
          <h6 className="text-center text-lg lg:text-2xl text-gray-200 font-bold">
            SALAD
          </h6>
        </Link>
        <Link to={"/"} className="">
          <img
            className="w-28 lg:w-32 lg:mb-4"
            src={dessert}
            alt="soup-photo"
          />
          <h6 className="text-center text-lg lg:text-2xl text-gray-200 font-bold">
            DESERT
          </h6>
        </Link>
      </div>
    </div>
  );
};

export default Category;
