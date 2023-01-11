import React, { useState } from "react";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
const ProductList = (product) => {
  const [tab, setTab] = useState("");
  const toggleTab = (value) => {
    setTab(value);
  };
  const tabButton = (button, name) => {
    return (
      <button
        className="link link-underline link-underline-black"
        onClick={() => toggleTab(button)}
      >
        {name}
      </button>
    );
  };
  return (
    <div>
      <div className="flex my-8 flex-col items-center justify-center gap-4">
        <h2 className="font-medium secondary my-4 text-3xl md:text-4xl">
          New Arrival
        </h2>
      </div>
      <div className={`flex items-center gap-4 flex-wrap justify-center `}>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loopFillGroupWithBlank={true}
          breakpoints={{
            450: {
              slidesPerView: 2,
            },
            630: {
              slidesPerView: 3,
            },
            920: {
              slidesPerView: 4,
            },
            1232: {
              slidesPerView: 5,
            },
            1520: {
              slidesPerView: 6,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {product.product.map((product, index) => (
            <SwiperSlide key={index}>
              <Product product={product} key={product._id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
