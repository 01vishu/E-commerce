/* eslint-disable @next/next/no-img-element */
import React from "react";
import { paymentMethods as pm } from "../../../data/paymentMethods";
const Payment = ({ paymentMethods, setPaymentMethods }) => {
  return (
    <div className=" border-2 border-[#f4f4f4] p-4 h-fit">
      <h2 className="text-primary text-2xl">Payment Method</h2>
      {pm.map((payment, index) => {
        return (
          <label
            htmlFor={payment.id}
            key={payment.id}
            onClick={() => setPaymentMethods(payment.id)}
            className="flex items-center gap-4 my-2"
          >
            <input
              type="radio"
              name="payment"
              id={payment.id}

              // checked={paymentMethods == payment.id}
            />
            <img
              src={`../../../images/checkout/${payment.id}.webp`}
              alt={payment.name}
              width={50}
            />
            <div className="">
              <span className="font-medium">Pay with {payment.name}</span>
              <p className="flex text-primary gap-2 flex-wrap text-sm">
                {payment.images.length > 0
                  ? payment.images.map((img, i) => (
                      // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
                      <img
                        src={`../../../images/payment/${img}.webp`}
                        alt=""
                        width={30}
                        key={i}
                      />
                    ))
                  : payment.description}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default Payment;
