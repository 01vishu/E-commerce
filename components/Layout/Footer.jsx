import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
  BsGoogle,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className="px-4 pt-8 items-start flex flex-wrap gap-6 justify-between">
        <div className="flex flex-col gap-6">
          <span className="text-xl font-medium">About</span>
          <ul className="text-primary text-xs flex flex-col gap-4">
            <li>News & Stories</li>
            <li>History</li>
            <li>Our Studio</li>
            <li>Shop</li>
            <li>Stockists</li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-xl font-medium">Customer Servies</span>
          <ul className="text-primary text-xs flex flex-col gap-4">
            <li>Contect Us</li>
            <li>Trade Service</li>
            <li>Login/Register</li>
            <li>Delevery</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-xl font-medium">New Arrival</span>
          <ul className=" text-primary text-xs flex flex-col gap-4">
            <li>All Items</li>
            <li>Jewellery</li>
            <li>Clothing & Accessories</li>
            <li>Celebrations</li>
          </ul>
        </div>
      </div>
      <div className="flex primary-bg flex-wrap justify-around p-4 mt-4 gap-6">
        <span className="text-xs">
          Copyright © 2023 by Vishu Verma All Rights Reserved
        </span>
        <div className="flex items-center justify-center gap-6 text-primary ">
          <BsFacebook className="cursor-pointer hover:secondary" size={18} />
          <BsGoogle className="cursor-pointer hover:secondary" size={18} />
          <BsInstagram className="cursor-pointer hover:secondary" size={18} />
          <BsPinterest className="cursor-pointer hover:secondary" size={18} />
          <BsTwitter className="cursor-pointer hover:secondary" size={18} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
