import { Helmet } from "react-helmet-async";
import Banner from "../Component/Shared/Banner/Banner";
import PageCover from "../Component/Shared/Cover/PageCover";
import dessertImage from "../../src/assets/menuCategory-images/menu-dessert.jpg";
import CustomTab from "../Component/Shared/CustomTab/CustomTab";

const Shop = () => {

  return (
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <PageCover pageName="our shop" image={dessertImage}></PageCover>
      <CustomTab>
        <button>Salad</button>
        <button>Pizza</button>
      </CustomTab>
    </div>
  );
};

export default Shop;
