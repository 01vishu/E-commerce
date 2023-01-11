import React, { useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Rating } from "@mui/material";
import axios from "axios";
const AddReview = ({ productId }) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const handleReview = async () => {
    const { data } = await axios.post(`/api/product/${productId}/review`, {
      product: productId,
      rating,
      review,
    });
    setReview("");
    setRating("");
    console.log(data);
  };
  return (
    <>
      {session ? (
        <div className="flex  px-1 flex-col gap-2">
          <label htmlFor="review">Review:</label>
          <textarea
            cols="80"
            rows="3"
            name="review"
            value={review}
            id="review"
            placeholder="Write Your Review"
            onChange={(e) => setReview(e.target.value)}
            className="border-[#88888] border rounded-sm p-4 placeholder:px-2 placeholder:py-1 focus:outline-[#8D735F] focus:p-4"
          />
          <Rating
            defaultValue={0}
            value={Number(rating)}
            onChange={(e) => setRating(e.target.value)}
            style={{ color: "#8D735F", fontSize: "2rem" }}
          />
          <button
            className="primary-bg py-2 px-4 w-fit font-sans border border-[#88888] hover:text-white hover:secondary-bg"
            onClick={handleReview}
          >
            Submit
          </button>
        </div>
      ) : (
        <button
          className="primary-bg py-2 px-4 font-sans border border-[#88888] hover:text-white hover:secondary-bg"
          onClick={() => router.push("/auth/login")}
        >
          Login For Review
        </button>
      )}
    </>
  );
};

export default AddReview;
