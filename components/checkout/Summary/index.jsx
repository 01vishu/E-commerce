import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
const Summary = ({
  paymentMethods,
  totalAfterDiscount,
  setTotalAfterDiscount,
  cart,
  user,
  visible,
}) => {
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [couponApply, setCouponApply] = useState("");
  const [error, setError] = useState("");
  const [orderError, setOrderError] = useState("");

  const handleCoupon = async () => {
    try {
      const { data } = await axios.post(`/api/user/applyCoupon`, {
        coupon,
        userId: user._id,
      });
      if (data.status == "success") {
        setTotalAfterDiscount(data.totalAfterDiscount);
        setCouponApply(`Coupon Applied ${data.discount}% off on this order!`);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "fail") {
        setError(error.response.data.message);
        return;
      }
    }
  };
  const handlePlaceOrder = async () => {
    try {
      if (paymentMethods == "") {
        setOrderError("Please Choose a Payment Method!");
        return;
      }
      if (!user.address || visible == false) {
        setOrderError("Please Add an address!");
        return;
      }
      const { data } = await axios.post(`/api/order/create`, {
        user: user._id,
        products: cart.products,
        shippingAddress: user.address,
        paymentMethod: paymentMethods,
        total:
          totalAfterDiscount != "" ? cart.totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });

      router.push(`/order/${data.orderId}`);
    } catch (error) {
      setOrderError(error.message);
    }
  };
  return (
    <div className="my-2 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <div>
        <input
          type="text"
          className="border-2 w-full border-[#f4f4f4] p-2 placeholder:text-sm"
          placeholder="Coupon"
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value), setError(""), setCouponApply("");
          }}
        />
        <button
          onClick={handleCoupon}
          className="p-2 text-white bg-black font-sans w-full my-2 text-sm"
        >
          Apply Coupon
        </button>
        <p className="font-sans secondary">
          {couponApply ? couponApply : error}
        </p>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Total:</p>
          <p className="secondary font-bold">
            ₹{" "}
            {totalAfterDiscount != ""
              ? cart.totalAfterDiscount?.toLocaleString()
              : cart.cartTotal?.toLocaleString()}
          </p>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="primary-bg p-2 font-sans w-full hover:text-white hover:secondary-bg"
      >
        Place Order
      </button>
      <p className="font-sans secondary">{orderError}</p>
    </div>
  );
};

export default Summary;
