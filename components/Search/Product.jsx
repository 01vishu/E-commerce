import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";

const Product = ({ data }) => {
  return (
    <div className="flex items-start gap-4">
      <div className=" border-2 border-[#f4f4f4] ">
        <div className="m-1 flex flex-1 items-center justify-center primary-bg">
          <Image
            src={data.imageCover}
            width={150}
            height={150}
            alt=""
            className="mix-blend-multiply"
            priority={false}
          />
        </div>
      </div>
      <div className="flex flex-[2] flex-col gap-1">
        <h2 className="secondary font-sans sm:text-lg text-sm line-clamp-2">
          {data.name} ({data.flavour}/{data.weight})
        </h2>
        <span className="font-light text-xs">by {data.brand}</span>
        <p className="line-clamp-3 small-clamp text-xs text-primary  border-[#f4f4f4] border-t-2 pt-2">
          {data?.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-bold secondary">₹ {data.priceDiscount}</span>
          <Rating readOnly value={4} size="small" />
        </div>
      </div>
    </div>
  );
};

export default Product;
