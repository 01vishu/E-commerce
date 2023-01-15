import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Rating } from "@mui/material";
import parse from 'html-react-parser'; 

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../src/features/cart/cartSlice";
import { useState } from "react";
const ProductInfo = ({ productData, variant }) => {
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const variantSlug = Object.entries(variant).map(([key, value]) => ({
    [key]: value,
  }));
  const flavourOption = variantSlug.map((flavour) => {
    const key = Object.keys(flavour);
    const value = Object.keys(flavour[key]);
    return (
      <button
        className={
          productData.flavour == Object.keys(flavour)
            ? "secondary-bg text-sm text-white font-medium py-2 px-4 border border-[#8D735F]"
            : "text-sm font-medium py-2 px-4 border border-[#88888]"
        }
        key={flavour[key][value[0]].slug}
        onClick={() => {
          router.push(`/shop/${flavour[key][value[0]].slug}`), setQty(1);
        }}
      >
        {key.toString().toLocaleUpperCase()}
      </button>
    );
  });
  const weightOption = Object.keys(variant[productData.flavour]).map(
    (weight, index) => {
      const slug = variant[productData.flavour][weight].slug;
      return (
        <button
          className={
            productData.weight == weight
              ? `secondary-bg  w-8 h-8 flex items-center text-sm font-medium text-white justify-center rounded-full border border-[#8D735F]`
              : `primary-bg w-8 h-8 flex items-center text-sm justify-center rounded-full border`
          }
          key={index}
          onClick={() => {
            router.push(`/shop/${slug}`), setQty(1);
          }}
        >
          {weight}
        </button>
      );
    }
  );
  const handleAddToCart = () => {
    const {
      name,
      slug,
      price,
      priceDiscount,
      _id,
      imageCover,
      availableQuantity,
      avgRating,
      brand,
      flavour,
      weight,
    } = productData;

    if (availableQuantity >= 1) {
      dispatch(
        addToCart({
          name,
          slug,
          price,
          priceDiscount,
          _id,
          qty,
          availableQuantity,
          avgRating,
          imageCover,
          brand,
          flavour,
          weight,
        })
      );
    }
  };
  return (
    <div className="flex-1">
      <div className=" gap-2 flex flex-col py-4 border-b xl:w-3/4 border-[#88888]">
        <h2 className="secondary font-sans text-xl sm:text-2xl">
          {productData.name} ({productData.flavour}/{productData.weight})
        </h2>
        <div className="flex gap-4 items-center">
          <span className="text-xs">by {productData?.brand}</span>
          <div className="flex items-center gap-2">
            <Rating
              readOnly
              color="#8888"
              value={productData?.avgRating}
              size="small"
              sx={{ color: "#8d735f" }}
            />
            <span className="font-light">
              (
              {!productData?.reviews?.length
                ? "No Review Yet"
                : productData?.reviews?.length}
              )
            </span>
          </div>
        </div>
        <div>
          {productData.availableQuantity &&
          productData.availableQuantity !== 0 ? (
            <div className="flex items-center  gap-2">
              <>
                <span className="secondary font-bold sm:text-xl">
                  ₹ {productData.priceDiscount}
                </span>
                <span className="text-primary line-through font-light sm:text-xl">
                  ₹ {productData.price}
                </span>
              </>
            </div>
          ) : (
            <p className="secondary font-sans ">Out Of Stock</p>
          )}
          {productData.availableQuantity <= 10 && (
            <span className="secondary font-thin">
              Only {productData.availableQuantity} stocks are left
            </span>
          )}
        </div>
        <div className="font-sans text-primary text-xs line-clamp-2">
          {parse(productData.description.substring(0, 200))}
        </div>
      </div>
      <div className="gap-2 flex flex-col py-4 border-b xl:w-3/4 border-[#88888]">
        <span className="text-lg">Options</span>
        <div className="flex items-start flex-col justify-between flex-wrap gap-4">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs">Flavour *</span>
            <div className="flex gap-2 items-center flex-wrap">
              {flavourOption}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs">Weight *</span>
            <div className="flex flex-wrap gap-4 ">{weightOption}</div>
          </div>
        </div>
      </div>
      <div className="gap-2 flex flex-col xl:w-3/4 py-4 border-b border-[#88888]">
        <div className="flex flex-col gap-4">
          <span>Action</span>
          <div className="flex items-center justify-between">
            {productData.availableQuantity >= 1 && (
              <div className="border-2 border-[#f4f4f4] rounded-full py-1 px-4 flex items-center justify-center gap-4 w-fit ">
                <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
                  -
                </button>
                <p>{qty}</p>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  disabled={qty >= productData?.availableQuantity}
                >
                  +
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-4">
              {productData.availableQuantity >= 1 && (
                <button
                  onClick={handleAddToCart}
                  className="border border-[#88888] p-3 rounded-full flex items-center justify-center primary-bg hover:secondary-bg hover:text-white cursor-pointer"
                >
                  <MdOutlineAddShoppingCart size={20} />
                </button>
              )}
              <button className="border border-[#88888] p-3 rounded-full flex items-center justify-center primary-bg hover:secondary-bg hover:text-white cursor-pointer">
                <AiOutlineHeart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
