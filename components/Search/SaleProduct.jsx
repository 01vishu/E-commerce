import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";

const SaleProduct = () => {
  return (
    <div>
      <div className=" border-2 flex-[2] flex gap-2 border-[#f4f4f4] ">
        <div className="m-1 flex  items-center justify-center primary-bg">
          <Image
            src={
              "https://cdn.nutrabay.com/wp-content/uploads/2020/09/NB-NUT-1010-03-01-247x247.jpg"
            }
            width={100}
            height={100}
            alt=""
            className="mix-blend-multiply"
          />
        </div>
        <div className="m-1 flex-[2]">
          <h2 className="secondary font-sans text-sm line-clamp-1">
            Optimum Nutrition Whey Protien (Chocolate/3.3)
          </h2>
          <span className="font-light text-xs line-clamp-1">
            by Optimum Nutrition
          </span>
          <Rating readOnly value={4} size="small" />
          <span className="font-bold secondary">₹3,444</span>
        </div>
      </div>
    </div>
  );
};

export default SaleProduct;
