import React from "react";
import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";

const BtnSlider = ({ direction, moveSlide }) => {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      {direction === "next" ? <CgPushChevronRight /> : <CgPushChevronLeft />}
    </button>
  );
};

export default BtnSlider;
