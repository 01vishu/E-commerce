import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../src/features/cart/cartSlice";
import OrderSummury from "./OrderSummery";
import PaymentMethods from "./PaymentMethods";
import axios from "axios";
const CartItemsList = () => {
  const cartItem = useSelector(selectCart);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-[2] flex-col flex gap-4">
        {cartItem?.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <OrderSummury />
        <PaymentMethods />
      </div>
    </div>
  );
};

export default CartItemsList;
