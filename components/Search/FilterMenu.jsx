import { useState, useEffect, useRef } from "react";

const FilterMenu = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  priceCap,
  brand,
  category,
  subCategory,
  flavour,
  weight,
}) => {
  console.log(weight);
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + "%";
    progressRef.current.style.right = step - (maxValue / max) * step + "%";
  }, [minValue, maxValue, max, step]);

  return (
    <div className="mx-4 z-10 max-w-[200px] flex flex-col gap-6">
      <span className="text-2xl font-semibold">Filter:</span>
      <div className=" flex flex-col gap-4">
        <span className="font-medium">PRICE (₹)</span>
        <div className="">
          <div className="slider relative h-1 rounded-md primary-bg">
            <div
              className="progress absolute h-1 secondary-bg rounded "
              ref={progressRef}
            ></div>
          </div>

          <div className="range-input relative  ">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
            />

            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex justify-between items-center gap-2">
            <div className="rounded-full">
              <input
                onChange={(e) => setMinValue(e.target.value)}
                type="number"
                value={minValue}
                readOnly
                className="primary-bg rounded-full w-20 text-center px-2 py-1 focus:outline-none"
              />
            </div>
            <div className=" font-semibold text-lg"> - </div>
            <div className=" ">
              <input
                onChange={(e) => setMaxValue(e.target.value)}
                type="number"
                value={maxValue}
                readOnly
                className="primary-bg rounded-full w-20 text-center px-2 py-1 focus:outline-none"
              />
            </div>
          </div>
          <button className="px-6 py-2 bg-black text-white">Filter</button>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t-2 pt-2 border-[#f4f4f4]">
        <span className="font-semibold">WEIGHT OPTIONS</span>
        <div className="flex flex-wrap gap-4">
          {weight.map((w, i) => {
            return (
              <span
                key={i}
                className="primary-bg w-8 h-8 flex items-center text-sm justify-center rounded-full"
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t-2 pt-2 border-[#f4f4f4]">
        <span className="font-semibold">FLAVOUR OPTIONS</span>
        <div className="flex flex-col gap-2">
          {flavour.map((f, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="font-sans">{f}</span>
                <span className="font-light">(25)</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t-2 pt-2 border-[#f4f4f4]">
        <span className="font-semibold">Brand</span>
        <div className="flex flex-col gap-2">
          {brand.map((f, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="font-sans">{f}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t-2 pt-2 border-[#f4f4f4]">
        <span className="font-semibold">Category</span>
        <div className="flex flex-col gap-2">
          {category.map((f, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="font-sans">{f}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t-2 pt-2 border-[#f4f4f4]">
        <span className="font-semibold">Sub Category</span>
        <div className="flex flex-col gap-2">
          {subCategory.map((f, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="font-sans">{f}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
