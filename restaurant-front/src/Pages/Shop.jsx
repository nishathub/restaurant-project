import { Helmet } from "react-helmet-async";
import Banner from "../Component/Shared/Banner/Banner";
import PageCover from "../Component/Shared/Cover/PageCover";

const Shop = () => {
  return (
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <PageCover pageName="our shop" ></PageCover>
    </div>
  );
};

export default Shop;
