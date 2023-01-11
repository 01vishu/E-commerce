import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product = (product) => {
  const productData = product.productData;
  return (
    <Link href={`shop/${productData.slug}`}>
      <div className="flex gap-2 border-[#F4F4F4] border-2">
        <div className="primary-bg max-w-[100px] justify-center flex flex-1  items-center m-1">
          <Image
            src={productData.imageCover}
            alt="product "
            width={100}
            height={100}
            className="mix-blend-multiply"
          />
        </div>
        <div className="flex flex-[2] flex-col">
          <h2 className="font-sans line-clamp-1">{productData.name}</h2>
          <span className="text-sm">by {productData.brand}</span>
          <Rating readOnly value={2} size="small" />
          <span className="text-sm secondary font-bold">
            ₹ {productData.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Product;
