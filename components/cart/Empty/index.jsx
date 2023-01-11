import React from "react";
import { BsCart3 } from "react-icons/bs";
import { useRouter } from "next/router";
const CartEmpty = () => {
  const router = useRouter();
  return (
    <div className="flex gap-4 items-center flex-col justify-center w-full h-[50vh]">
      <BsCart3 style={{ color: "#f4f4f4", fontSize: "5rem" }} />
      <p className="font-sans text-primary text-2xl">Your Cart Is Empty</p>
      <button
        className="px-4 py-3  bg-black text-white"
        onClick={() => router.push("/shop")}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CartEmpty;
