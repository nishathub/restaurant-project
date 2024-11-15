import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
// RATING
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./Testimonial.css";
import { FaQuoteLeft } from "react-icons/fa";
const Testimonials = () => {
  const baseURL = import.meta.env.VITE_SAVOURYUM_API;
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    try {
      fetch(`${baseURL}/allReviews`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error loading reviews ", error);
    }
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <section>
        <SectionTitle
          heading={"Testimonials"}
          subHeading={"What our client say"}
        ></SectionTitle>
      </section>
      <div className="m">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Rating
                  style={{ maxWidth: 120 }}
                  value={review.rating}
                  readOnly
                />
                <p className="text-gray-200 text-2xl lg:text-4xl"><FaQuoteLeft /></p>
                <p className="text-justify text-gray-200 mx-20">
                  {review.details}
                </p>
                <h4 className="text-xl lg:text-2xl text-red-500">
                  {review.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
