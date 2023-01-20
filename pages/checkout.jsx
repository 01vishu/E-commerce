import React, { useState } from "react";
import { getSession } from "next-auth/react";
import User from "../model/User";
import Cart from "../model/Cart";
import mongoose from "mongoose";
import Shipping from "../components/checkout/Shipping";
import Payment from "../components/checkout/payment";
import Summary from "../components/checkout/Summary";

const Checkout = ({ cart, user }) => {
  const [paymentMethods, setPaymentMethods] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [visible, setVisible] = useState(user.address ? true : false);

  return (
    <div className="flex md:flex-row flex-col gap-4">
      <Shipping
        cart={cart}
        user={user}
        visible={visible}
        setVisible={setVisible}
      />
      {visible && (
        <div className="flex-1">
          <Payment
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
          />
          <Summary
            paymentMethods={paymentMethods}
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            cart={cart}
            user={user}
            visible={visible}
          />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  const session = await getSession(context);
  const user = await User.findById(session?.user._id);
  const cart = await Cart.findOne({ user: user._id });
  if (!cart && !user) return { redirect: { destination: "/cart" } };
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Checkout;
