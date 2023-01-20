import Link from "next/link";
import React from "react";
import Product from "./Product";

const ProductList = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <Link href={`/shop/${item.slug}`} key={item._id}>
          <Product data={item} key={item._id} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
