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
import { useNavigate } from "react-router-dom";

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
  const { userCartItems, cartItemsRefetch } = useCart();
  const navigate = useNavigate();

  const cartTotalPrice = userCartItems?.reduce((total, current) => {
    return (total += current.price);
  }, 0);

  useEffect(() => {
    const postStripeIntent = async () => {
      if (cartTotalPrice > 0) {
        try {
          const result = await axiosProtected.post("/create-payment-intent", {
            price: cartTotalPrice,
          });
          setClientSecretKey(result?.data?.clientSecret);
        } catch (error) {
          console.log("error from stripe catch block", error);
        }
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
        customAlert("Transaction Error!!");
      } else {
        if (paymentIntent.status === "succeeded") {
          setTransactionId(paymentIntent.id);
          customAlert("Payment Successful");
          // post payment history to the database:
          const userPaymentDetails = {
            paymentId: paymentIntent.id,
            userEmail: user?.email,
            date: new Date(),
            cartItemsIds: userCartItems.map((item) => item._id),
            menuItemsIds: userCartItems.map((item) => item.menuId),
            price: cartTotalPrice,
            status: "processing",
          };
          try {
            const postToPaymentHistory = await axiosProtected.post(
              "/userPaymentHistory",
              userPaymentDetails
            );
            if (postToPaymentHistory?.data?.paymentResult?.insertedId) {
              console.log("payment history posted to the database");
            }
            if (postToPaymentHistory?.data?.emptyCartItems?.deletedCount) {
              console.log("cartItems are removed");
              cartItemsRefetch();
            }
            setTimeout(() => {
              navigate("/dashboard/paymentHistory");
            }, 1000);
          } catch (error) {
            console.error("error posting payment history ", error);
          }
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
        <div className="border border-gray-400 p-1">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "gray",
                    border: "",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          disabled={!stripe || !elements || !clientSecretKey}
          className="mt-8 px-16 py-2 rounded-md text-gray-100 bg-green-700 hover:bg-green-800 disabled:bg-gray-500"
        >
          Pay
        </button>
        <div className="mt-4">
          {stripeErrorMessage && (
            <p className="text-red-700">{stripeErrorMessage}</p>
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
