import Image from "next/image";
import React, { useState } from "react";
import { slider as ProductSlider } from "../../data";
import BtnSlider from "./BtnSlider";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== ProductSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === ProductSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(ProductSlider.length);
    }
  };

  return (
    <div className="container-slider">
      {ProductSlider.map((obj, index) => {
        return (
          <div
            className={`flex items-center w-full primary-bg justify-around ${
              slideIndex === index + 1 ? "slide active-anim" : "slide"
            }`}
            key={obj.id}
          >
            <div className="">
              <Image
                src={obj.img}
                alt="RD"
                width={380}
                height={380}
                className="mix-blend-multiply"
                loading="lazy"
                priority={false}
              />
            </div>
            <div className="flex flex-col gap-2 my-8 px-2 w-fit items-start justify-center overflow-hidden">
              <h1 className="secondary text-start font-semibold text-xl sm:text-3xl lg:text-5xl">
                {obj.title}
              </h1>
              <span className="text-primary font-medium text-start text-sm sm:text-xl lg:2xl:">
                {obj.desc}
              </span>
              <span className="hidden sm:block text-[#444444 ] text-start text-xs">
                {obj.head1}
              </span>
              <span className="hidden sm:block text-[#444444 ] text-start text-xs">
                {obj.head2}
              </span>
              <button className="text-[#8D735F] border-b border-spacing-2  border-[#8D735F] px-1 py-2 text-sm my-4">
                View more
              </button>
            </div>
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
    </div>
  );
};

export default Slider;
