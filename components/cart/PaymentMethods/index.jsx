import Image from "next/image";
import Visa from "../../../public/images/payment/visa.webp";
import MasterCard from "../../../public/images/payment/mastercard.webp";
import Paypal from "../../../public/images/payment/paypal.webp";
import { MdSecurity } from "react-icons/md";

export default function PaymentMethods() {
  return (
    <div className="flex gap-4 flex-col border-2 border-[#f4f4f4] p-2 rounded-md">
      <h2 className="font-bold text-primary text-xl">Payment Methods</h2>
      <div className="flex items-center gap-4">
        <Image width={50} height={50} src={Visa} alt="" />
        <Image width={50} height={50} src={MasterCard} alt="" />
        <Image width={50} height={50} src={Paypal} alt="" />
      </div>
      <div>
        <h2 className="border-t-2 font-bold text-primary text-lg border-[#f4f4f4] pt-2">
          Buyer Protection
        </h2>
        <div className=" flex gap-2">
          <MdSecurity size={30} className="text-primary" />

          <p className="font-medium text-base">
            Get full refund if the item is not as described or if it is not
            delievered.
          </p>
        </div>
      </div>
    </div>
  );
}
