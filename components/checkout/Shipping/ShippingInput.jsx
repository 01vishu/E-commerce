import axios from "axios";
import React from "react";
import { useState } from "react";
import { countries } from "../../../data/countries";
import { useRouter } from "next/router";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  pinCode: "",
  address1: "",
  address2: "",
  country: "",
};
const ShippingInput = ({ user, visible, setVisible }) => {
  const router = useRouter();
  const [shipping, setShipping] = useState(initialValues);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    pinCode,
    address1,
    address2,
    country,
  } = shipping;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/user/saveAddress`, {
        address: shipping,
        userId: user._id,
      });
      router.reload("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        <form className="flex flex-col items-center gap-2">
          <div className="flex gap-2 flex-wrap w-full  justify-center">
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6  border-2 border-[#f4f4f4]"
              name="firstName"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="lastName"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              value={phoneNumber}
              placeholder="Phone Number"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="phoneNumber"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={state}
              placeholder="State"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="state"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={city}
              placeholder="City"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="city"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              value={pinCode}
              placeholder="Pin Code"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="pinCode"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={address1}
              placeholder="Address 1"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="address1"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={address2}
              placeholder="Address 2"
              className="px-2 py-1 placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              name="address2"
              onChange={handleChange}
            />
            <select
              name="country"
              id="country"
              value={country}
              onChange={handleChange}
              required
              className="px-2 py-1 invalid:text-primary placeholder:text-sm w-full sm:w-2/6 border-2 border-[#f4f4f4]"
              placeholder="Country"
            >
              <option value={""} hidden disabled selected>
                Country
              </option>
              {countries.map((country, index) => {
                return (
                  <option value={country.name} key={index}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="primary-bg p-2 font-sans border border-[#88888] hover:text-white hover:secondary-bg"
            onClick={handleOnSubmit}
          >
            Save Address
          </button>
        </form>
      }
    </>
  );
};
export default ShippingInput;
