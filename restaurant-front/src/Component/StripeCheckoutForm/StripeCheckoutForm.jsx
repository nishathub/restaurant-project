import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import useCart from "../../Hooks/useCart";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import CustomLoading from "../Shared/CustomLoading/CustomLoading";

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeErrorMessage, setStripeErrorMessage] = useState(null);
  const [clientSecretKey, setClientSecretKey] = useState(null);
  const [stripeTransactionLoading, setStripeTransactionLoading] =
    useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const axiosProtected = useAxiosHookProtected();
  const { user, customAlert } = useSavourYumContext();
  const { userCartItems } = useCart();
  const cartTotalPrice = userCartItems?.reduce((total, current) => {
    return (total += current.price);
  }, 0);

  useEffect(() => {
    const postStripeIntent = async () => {
      try {
        const result = await axiosProtected.post("/create-payment-intent", {
          price: cartTotalPrice,
        });
        console.log(result);
        setClientSecretKey(result.data.clientSecret);
      } catch (error) {
        console.log("error from stripe catch block", error);
      }
    };
    postStripeIntent();
  }, [axiosProtected, cartTotalPrice]);

  const handleStripeFormSubmit = async (event) => {
    event.preventDefault();
    setStripeErrorMessage("");

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    try {
      setStripeTransactionLoading(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
      if (error) {
        console.log("payment error", error);
        setStripeErrorMessage(error.message);
      } else {
        console.log("payment successful", paymentMethod);
      }
      // confirm payment
      const { paymentIntent, error: confirmPaymentError } =
        await stripe.confirmCardPayment(clientSecretKey, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "anonymous",
            },
          },
        });
      if (confirmPaymentError) {
        console.log("stripe payment error : ", confirmPaymentError);
        customAlert("Transaction Error!!")
      } else {
        console.log("stripe payment success : ", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          console.log("transaction Id : ", paymentIntent.id);
          setTransactionId(paymentIntent.id);
          customAlert("Payment Successful")
        }
      }
    } catch (error) {
      console.error("stripe payment error catch block", error);
      setStripeErrorMessage("An error occurred while processing the payment");
    } finally {
      setStripeTransactionLoading(false);
    }
  };
  return (
    <div>
      <form className="text-center" onSubmit={handleStripeFormSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !elements || !clientSecretKey}
          className="mt-8 px-16 py-2 rounded-md bg-green-700 hover:bg-green-800 disabled:bg-gray-500"
        >
          Pay
        </button>
        <div className="mt-4">
          {stripeErrorMessage && (
            <p className="text-red-700">{stripeErrorMessage}</p>
          )}
        </div>
        <div className="mt-4">
          {transactionId && (
            <p className="text-green-700">
              Payment Successful!! <br />
              Transaction Id :{" "}
              <span className="font-bold">{transactionId}</span>
            </p>
          )}
        </div>
      </form>
      {stripeTransactionLoading && (
        <div className="mt-12 inset-0 flex justify-center items-center">
          <CustomLoading size={32}></CustomLoading>
        </div>
      )}
    </div>
  );
};
export default StripeCheckoutForm;
