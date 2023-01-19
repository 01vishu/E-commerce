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
  console.log(product.product.length);
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
        <div className={`flex items-center gap-4 flex-wrap justify-center `}>
          {product.product.map((item, index) => (
            <>
              {product.product.length > 5 ? (
                <SwiperSlide key={index}>
                  <Product product={item} key={item._id} />
                </SwiperSlide>
              ) : (
                <Product product={item} key={item._id} />
              )}
            </>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ProductList;
