/* eslint-disable @next/next/no-img-element */
import React from "react";

const Product = ({ product }) => {
  return (
    <div className="border flex font-sans gap-4 border-[#88888] p-1">
      <div className=" primary-bg flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          width={150}
          className="mix-blend-multiply"
        />
      </div>
      <div>
        <p className="line-clamp-1">{product.name}</p>
        <p>
          {product.flavour}/{product.weight}
        </p>
        <p className="flex items-center gap-2">
          <b className="secondary">₹ {product.price.toLocaleString()}</b>
          <b>
            {" x"}
            {product.qty}
          </b>
        </p>
      </div>
    </div>
  );
};

export default Product;
