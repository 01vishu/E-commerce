import React from "react";
import Product from "./Product";

const ProductList = (product) => {
  //   console.log(product);
  return (
    <div className="flex flex-col items-center">
      <span className=" font-semibold text-3xl secondary my-4">
        {" "}
        Most Famous
      </span>
      <div className=" grid sm:grid-cols-2 gap-4 lg:grid-cols-3">
        {product.product?.map((item, index) => (
          <Product productData={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
