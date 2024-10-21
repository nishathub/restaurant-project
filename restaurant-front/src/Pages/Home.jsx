import React, { Suspense } from "react";
import Banner from "../Component/Shared/Banner/Banner";
import Category from "../Component/HomePage/Category/Category";
import PopularMenu from "../Component/HomePage/PopularMenu/PopularMenu";
import Testimonials from "../Component/HomePage/Testimonials/Testimonials";
// import SignatureDish from "../Component/HomePage/SignatureDish/SignatureDish";
const SignatureDish = React.lazy(() => import("../Component/HomePage/SignatureDish/SignatureDish"));

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <Suspense fallback={<div>Loading Suspense...</div>}>
        <SignatureDish></SignatureDish>
      </Suspense>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
