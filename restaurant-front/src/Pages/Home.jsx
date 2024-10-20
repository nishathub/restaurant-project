import React from 'react';
import Banner from '../Component/Shared/Banner/Banner';
import Category from '../Component/HomePage/Category/Category';
import SectionTitle from '../Component/Shared/SectionTitle/SectionTitle';
import PopularMenu from '../Component/HomePage/PopularMenu/PopularMenu';
import Testimonials from '../Component/HomePage/Testimonials/Testimonials';
import SignatureDish from '../Component/HomePage/SignatureDish/SignatureDish';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SectionTitle heading={'Order Online'} subHeading={'From 12PM to 12AM'}></SectionTitle>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <SignatureDish></SignatureDish>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;