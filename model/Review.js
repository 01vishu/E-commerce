import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can not be empty!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    product: {
        type: ObjectId,
        ref: "Product",
        required: [true, "Review must belongs to product!"],
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: [true, "Review must be belongs to a user"],
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: "user",
        select: "name image",
    });
    next();
});
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;