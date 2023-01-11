import React from "react";
import SaleProduct from "./SaleProduct";

const SaleProductList = () => {
  return (
    <div className="mx-4 flex-col flex gap-4">
      <span className="font-medium">SALE PROUDUCTS</span>
      <SaleProduct />
    </div>
  );
};

export default SaleProductList;
