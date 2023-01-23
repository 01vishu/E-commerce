import React from "react";
import Product from "./Product";
import Total from "./Total";
const OrderStatus = ({ order }) => {
  return (
    <div className="border-2 flex flex-[2] flex-col gap-4 border-[#f4f4f4] p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm items-center">
          Order ID: <p className="font-semibold">{order._id}</p>
        </div>
        <div>
          Payment Status:{" "}
          <b
            className={`${
              order.paymentMethod == "cash" ? "secondary" : "text-green-600"
            }`}
          >
            {order.paymentMethod == "cash"
              ? order.isPaid == true
                ? "PAID"
                : "Cash on delivery"
              : order.isPaid == true
              ? "PAID"
              : "UNPAID"}
          </b>
        </div>
        <div className="flex gap-2">
          Order Status:{" "}
          <p
            className={`${
              order.status == "Cancelled"
                ? "text-red-700"
                : order.status == "Not Processed"
                ? "text-orange-400"
                : order.status == "Processing"
                ? "text-gray-600"
                : order.status == "Dispatched"
                ? "text-yellow-500"
                : order.status == "Completed"
                ? "text-green-700"
                : ""
            } font-medium`}
          >
            {order.status}
          </p>
        </div>
      </div>
      <div className="border-t-2 border-[#f4f4f4] py-2 flex flex-col gap-4 ">
        {order.products.map((product, index) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      <Total order={order} />
    </div>
  );
};

export default OrderStatus;
