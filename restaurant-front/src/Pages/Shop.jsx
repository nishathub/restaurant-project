import { Helmet } from "react-helmet-async";
import Banner from "../Component/Shared/Banner/Banner";
import PageCover from "../Component/Shared/Cover/PageCover";
import dessertImage from "../../src/assets/menuCategory-images/menu-dessert.jpg";

const Shop = () => {
  return (
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <PageCover pageName="our shop" image={dessertImage}></PageCover>
    </div>
  );
};

export default Shop;
