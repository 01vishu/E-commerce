import React from "react";
import AddReview from "./AddReview";
import ReviewTable from "./ReviewTable";
const Reviews = ({ product }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse items-center ">
        <p className="font-medium text-lg">Average Rating</p>
        <p className="secondary font-bold text-2xl">{3.4}</p>
      </div>
      <AddReview productId={product._id} />
      <ReviewTable />
    </div>
  );
};

export default Reviews;
