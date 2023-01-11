import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "../../src/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col rounded-md justify-between  border-[#F4F4F4] border-2">
      <Link href={`shop/${item.slug}`}>
        <div className="flex flex-1 gap-2">
          <div className="primary-bg max-w-[80px] justify-center flex  items-center m-1">
            <Image
              src={item.imageCover}
              alt="product "
              width={80}
              height={80}
              className="mix-blend-multiply"
            />
          </div>
          <div className="flex flex-[2] flex-col">
            <h2 className="font-sans text-sm md:text-base line-clamp-2">
              {item.name}({item.flavour}/{item.weight})
            </h2>
            <span className="text-xs text-primary">by {item.brand}</span>
            <Rating
              readOnly
              value={item?.avgRating}
              size="small"
              sx={{ color: "#8D735F" }}
            />
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm secondary font-bold">
                ₹ {(item.priceDiscount * item.qty).toLocaleString()}
              </span>
              <span className="text-primary line-through font-light text-sm">
                ₹ {(item.price * item.qty).toLocaleString()}
              </span>
              <span className="text-primary font-light text-sm">
                You Saved ₹{" "}
                {(
                  (item.price - item.priceDiscount) *
                  item.qty
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex gap-4 border-t-2 items-center justify-between border-[#f4f4f4] w-full py-2 px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Qty</span>
          <div className="border-2 border-[#f4f4f4] rounded-full py-1 px-2 sm:px-4 flex items-center justify-center gap-4 w-fit ">
            <button
              onClick={() => dispatch(decrementQty(item))}
              disabled={item.qty <= 1}
            >
              -
            </button>
            <p>{item.qty}</p>
            <button
              onClick={() => dispatch(incrementQty(item))}
              disabled={item.availableQuantity <= item.qty}
            >
              +
            </button>
          </div>
          <button onClick={() => dispatch(removeFromCart(item))}>
            <MdDelete size={20} className={"secondary"} />
          </button>
        </div>
        {/* <span className="secondary font-bold">₹ 4,333</span> */}
      </div>
    </div>
  );
};

export default CartItem;
