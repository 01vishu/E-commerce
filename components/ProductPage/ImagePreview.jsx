import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

// import required modules
import { FreeMode } from "swiper";
const ImagePreview = ({ product }) => {
  const [activeImg, setActiveImg] = useState(product?.imageCover);
  return (
    <div className="flex  flex-1 flex-col">
      <div className="m-1 flex sm:min-w-xs items-center   justify-center primary-bg">
        <Image
          src={activeImg}
          alt={""}
          width={500}
          height={500}
          className="mix-blend-multiply"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex max-w-sm lg:max-w-md  justify-center items-center ">
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            breakpoints={{
              375: {
                slidesPerView: 4,
              },

              1024: {
                slidesPerView: 5,
              },
            }}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
          >
            {product?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className={` m-1 p-1 border-2 border-[#f4f4f4] flex max-w-[80px] max-h-20 cursor-pointer items-center justify-center ${
                    activeImg === image && "border-[#8d735f] border"
                  }`}
                  key={index}
                  onClick={() => setActiveImg(image)}
                >
                  <Image src={image} alt={""} width={80} height={80} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
