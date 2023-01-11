import React from "react";

const Customer = ({ customer }) => {
  return (
    <div className="p-4 border-2 flex flex-col gap-4 border-[#f4f4f4]">
      <div className="flex flex-col gap-2">
        <h2 className="text-center font-semibold secondary text-xl ">
          Your Order
        </h2>
        <div className="flex items-start gap-4">
          <img
            src={customer.image}
            alt={customer.name}
            className="rounded-full w-20"
          />
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="font-medium text-sm">{customer.email}</p>
            <p className="font-medium text-sm">
              {customer.phoneNumber || customer.address.phoneNumber}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Billing Address</h3>
          <div className="flex flex-col gap-1">
            <p>
              {customer.address.firstName} {customer.address.lastName}
            </p>
            <p>{customer.address.phoneNumber}</p>
            <p>{customer.address.address1}</p>
            <p>{customer.address?.address2}</p>
            <p>{customer.address?.city}</p>
            <p>
              {customer.address?.state} {customer.address.pinCode}
            </p>
            <p>{customer.address?.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
