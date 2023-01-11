import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../src/features/cart/cartSlice";
import Spiner from "../../spiner";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    padding: "2rem",
    base: {
      iconColor: "#8d735f",
      color: "#888888",
      lineHeight: "40px",
      fontWeight: 300,
      fontSize: "15px",

      "::placeholder": {
        color: "#888888",
      },
    },

    invalid: {
      iconColor: "#fd010169",
      color: "#fd010169",
    },
  },
};
const StripePayment = ({ total, orderId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(`/api/order/${orderId}/stripePayment`, {
          amount: total,
          id,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(clearCart());
          window.location.reload(false);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    } else {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Spiner loading={loading} />}
      <form onSubmit={handleOnSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button className="primary-bg p-2 font-sans w-full hover:text-white hover:secondary-bg">
          Pay
        </button>
        {error && <span className="secondary font-sans text-sm">{error}</span>}
      </form>
    </>
  );
};

export default StripePayment;
