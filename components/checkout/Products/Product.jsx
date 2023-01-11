import React from "react";

const Product = ({ item }) => {
  return (
    <div className="flex flex-col items-center border-2 rounded-md border-[#f4f4f4] p-2">
      <img src={item.image} className="w-40" />
      <div className="border-t-2 border-[#f4f4f4] py-1">
        <p className="font-sans text-xs text-primary">
          ({item.flavour}/{item.weight})
        </p>
      </div>
      <div className="border-t-2 border-[#f4f4f4] py-1">
        <p className="font-sans text-sm">{item.name.substring(0, 25)}...</p>
      </div>
      <div className="border-t-2 flex justify-around w-full border-[#f4f4f4] py-1">
        <p className="secondary font-bold">₹ {item.price.toLocaleString()}</p>
        <p className="font-bold">x{item.qty}(.Qty)</p>
      </div>
    </div>
  );
};

export default Product;
