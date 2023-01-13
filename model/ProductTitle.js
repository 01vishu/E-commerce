import mongoose from "mongoose";
const productTitleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Title is required!"],
        minLength: [2, "Product Title must have atleast 2 letter!"],
        unique: [true, "Product Title Must Be Unique!"],
    },
}, { timestamps: true });

const ProductTitle =
    mongoose.models.ProductTitle ||
    mongoose.model("ProductTitle", productTitleSchema);
export default ProductTitle;