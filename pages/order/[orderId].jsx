import mongoose from "mongoose";
import React from "react";
import Customer from "../../components/order/Customer";
import OrderStatus from "../../components/order/OrderStatus";
import Payment from "../../components/order/Payment";
import Order from "../../model/Order";
import User from "../../model/User";
const OrderPage = ({ order, stripeClientId }) => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <OrderStatus order={order} />
      <div className="flex-1 flex flex-col gap-4">
        <Customer customer={order?.user} />
        {order.isPaid === false && (
          <Payment order={order} stripeClientId={stripeClientId} />
        )}
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  const orderId = context.query.orderId;
  const order = await Order.findById(orderId).populate({
    path: "user",
    model: User,
  });
  const stripeClientId = process.env.STRIPE_CLIENT_ID;
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      stripeClientId,
    },
  };
}
export default OrderPage;
