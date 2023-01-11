import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCart, selectTotal } from "../../../src/features/cart/cartSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
const OrderSummury = () => {
  const { data: session } = useSession();
  const cart = useSelector(selectCart);
  const router = useRouter();
  const handleCheckout = () => {
    if (session) {
      const res = axios
        .post(`/api/user/cart`, {
          cart,
          userId: session.user._id,
        })
        .then(() => {
          router.push("/checkout");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(res);
    }
  };
  let totalPrice = 0;
  for (let index = 0; index < cart.length; index++) {
    totalPrice += cart[index].priceDiscount * cart[index].qty;
  }
  return (
    <div className="border-2 rounded-md p-2 flex flex-col gap-4 border-[#f4f4f4]">
      <span className="text-xl font-medium">Order Summary</span>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>SubTotal:</span>
          <span className="secondary font-bold">
            ₹ {totalPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span className="secondary font-bold">Free</span>
        </div>
        <div className="flex justify-between border-t-2 border-[#f4f4f4] pt-4">
          <span>Total:</span>
          <span className="secondary font-bold">
            ₹ {totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
      <button
        className="primary-bg p-2 font-sans border border-[#88888] hover:text-white hover:secondary-bg"
        onClick={handleCheckout}
      >
        Continue
      </button>
    </div>
  );
};

export default OrderSummury;
