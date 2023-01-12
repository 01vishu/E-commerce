import React from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
const Card = () => {
  return (
    <div className=" flex items-center flex-wrap justify-around w-full max-w-[300px] border-2 gap-8 border-[#f4f4f4] p-4 rounded-lg">
      <div className="flex flex-col gap-2">
        <p className="text-primary font-sans">Today&apos;s Earning</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">₹ 55,232</p>
          <p className="text-green-500 text-sm">+15%</p>
        </div>
      </div>
      <div className="secondary hover:secondary-bg p-2 cursor-pointer rounded-lg">
        <HiOutlineCurrencyRupee size={30} />
      </div>
    </div>
  );
};

export default Card;
