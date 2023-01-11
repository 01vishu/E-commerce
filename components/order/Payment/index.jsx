import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./StripePayment";

const Payment = ({ order, stripeClientId }) => {
  const stripePromise = loadStripe(stripeClientId);
  return (
    <div className="border-2 flex flex-col gap-2 justify-center border-[#f4f4f4] p-2">
      {/* <span className="text-primary text-lg">Payment</span> */}

      {order.paymentMethod == "credit_card" && (
        <Elements stripe={stripePromise}>
          <StripePayment
            stripeClientId={stripeClientId}
            total={order.total}
            orderId={order._id}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
