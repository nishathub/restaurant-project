import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    try {
      fetch("reviews.json")
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
      <div className="">

      total reviews : {reviews.length}
      </div>
    </div>
  );
};

export default Testimonials;
