import React, { Suspense } from "react";
import Banner from "../Component/Shared/Banner/Banner";
import Category from "../Component/HomePage/Category/Category";
import Testimonials from "../Component/HomePage/Testimonials/Testimonials";

const PopularMenu = React.lazy(() =>
  import("../Component/HomePage/PopularMenu/PopularMenu")
);
const SignatureDish = React.lazy(() =>
  import("../Component/HomePage/SignatureDish/SignatureDish")
);

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <Suspense fallback={<div>Loading Suspense...</div>}>
        <PopularMenu></PopularMenu>
      </Suspense>
      <Suspense fallback={<div>Loading Suspense...</div>}>
        <SignatureDish></SignatureDish>
      </Suspense>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
