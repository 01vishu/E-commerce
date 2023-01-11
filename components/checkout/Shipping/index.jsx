import React, { useState } from "react";
import Products from "../Products";
import ShippingAddress from "./ShippingAddress";
import ShippingInput from "./ShippingInput";
const Shipping = ({ cart, visible, setVisible, user }) => {
  return (
    <div className="flex items-center flex-[2] flex-col">
      <h2 className="text-center my-2 text-2xl font-bold secondary">
        Shipping Address
      </h2>
      {visible && <ShippingAddress user={user} />}
      {visible === false && <ShippingInput user={user} />}
      {visible && <Products cart={cart} />}
    </div>
  );
};

export default Shipping;
