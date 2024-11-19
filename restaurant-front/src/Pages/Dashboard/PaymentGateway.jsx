import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "../../Component/StripeCheckoutForm/StripeCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const PaymentGateway = () => {
  return (
    <div className="px-4 py-12">
      <div className="mb-12">
        <SectionTitle
          heading={"Payment"}
          subHeading={"Pay First"}
        ></SectionTitle>
      </div>
      <div className="max-w-2xl mx-auto mt-20">
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm></StripeCheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentGateway;
