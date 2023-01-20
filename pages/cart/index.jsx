import React, { useEffect } from "react";
import CartItemsList from "../../components/cart/CartItemsList";
import { getSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { selectCart, updateCart } from "../../src/features/cart/cartSlice";
import CartEmpty from "../../components/cart/Empty";
import mongoose from "mongoose";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCart);

  useEffect(() => {
    const update = () => {
      return (dispatch) => {
        axios
          .post(`/api/cart/updateCart`, {
            products: cartItem,
          })
          .then((response) => {
            dispatch(updateCart(response.data));
          })
          .catch((error) => {
            console.error(error);
          });
      };
    };
    if (cartItem.length > 0) dispatch(update());
  }, []);
  return (
    <section className="">
      {cartItem.length !== 0 ? (
        <div className="flex-[2] flex flex-col gap-2">
          <CartItemsList />
        </div>
      ) : (
        <CartEmpty />
      )}
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  return {
    props: {},
  };
}

export default Cart;
