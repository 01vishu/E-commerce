import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import Link from "next/link";

const Product = (product) => {
  const productData = product.product;
  return (
    <Link href={`/shop/${productData.slug}`}>
      <div className="border-2 p-2 rounded  border-[#F4F4F4]">
        <div className="primary-bg relative flex items-center justify-center">
          <Image
            src={productData.imageCover}
            width={250}
            height={250}
            alt={"productData"}
            className="mix-blend-multiply"
          />
          <div className="secondary-bg absolute text-sm top-0 right-0 py-1 px-2 rounded">
            New
          </div>
        </div>

        <div className="flex p-2 flex-col gap-1">
          <h2 className="line-clamp-2 font-sans text-sm sm:text-base max-w-[200px]">
            {productData.name} ({productData.flavour}/{productData.weight})
          </h2>
          <span className="text-[#747474] text-xs">by {productData.brand}</span>
          <div className="flex items-center justify-between">
            <span className="secondary font-bold">₹{productData.price}</span>
            <div className="flex items-center ">
              <Rating readOnly value={productData?.rating} size="small" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
