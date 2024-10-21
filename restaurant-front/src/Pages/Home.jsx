import React from "react";
import Banner from "../Component/Shared/Banner/Banner";
import Category from "../Component/HomePage/Category/Category";
import PopularMenu from "../Component/HomePage/PopularMenu/PopularMenu";
import Testimonials from "../Component/HomePage/Testimonials/Testimonials";
import SignatureDish from "../Component/HomePage/SignatureDish/SignatureDish";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <SignatureDish></SignatureDish>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
