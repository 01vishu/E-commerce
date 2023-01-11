import React from "react";
import Product from "./Product";

const Products = ({ cart }) => {
  return (
    <div className=" border-2 flex flex-col gap-4 my-4 w-fit border-[#f4f4f4] p-4">
      <h2 className="text-2xl font-semibold">Cart Items:</h2>
      <div className="flex justify-center flex-wrap gap-2">
        {cart.products.map((item, index) => (
          <Product item={item} key={item._id} />
        ))}
      </div>
      <div className="border-t-2 text-lg flex gap-2 items-center py-2 border-[#f4f4f4] ">
        <p className="font-medium">SubTotal:</p>
        <p className="secondary  font-bold">
          ₹ {cart.cartTotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Products;
