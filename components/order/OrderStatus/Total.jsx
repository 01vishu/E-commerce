import React from "react";

const Total = ({ order }) => {
  return (
    <div>
      {order.totalBeforeDiscount && (
        <div className="flex  justify-between">
          <p className="font-sans text-sm sm:text-base">SubTotal:</p>
          <p className="font-sans text-sm sm:text-base">
            ₹ {order.totalBeforeDiscount.toLocaleString()}
          </p>
        </div>
      )}
      {order.couponApplied != "" && (
        <div className="flex justify-between">
          <p className="font-sans text-sm sm:text-base">
            Coupon Applied{" "}
            <p className="secondary font-sans text-sm sm:text-base">
              ({order.couponApplied})
            </p>
          </p>
          <p className="font-sans text-sm sm:text-base">
            {"₹ -"}
            {(order.totalBeforeDiscount - order.total).toLocaleString()}
          </p>
        </div>
      )}
      <div className="flex justify-between">
        <p className="font-sans text-sm sm:text-base">Shipping:</p>
        <p className=" font-sans text-sm sm:text-base">
          {order.shippingPrice == 0
            ? "FREE"
            : `₹ ${order.shippingPrice.toLocaleString()}`}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="font-sans text-sm sm:text-base">Tax:</p>
        <p className=" font-sans text-sm sm:text-base">₹ {order.taxPrice}</p>
      </div>
      <div className="flex my-2 py-2 border-t-2 border-[#f4f4f4] justify-between">
        <p className="font-medium text-lg">Total To Pay:</p>
        <p className="secondary font-bold text-xl">
          ₹ {order.total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Total;
