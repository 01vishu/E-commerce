import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: ObjectId,
            ref: "Product",
        },
        name: String,
        image: String,
        weight: Number,
        flavour: String,
        qty: Number,
        price: Number,
    }, ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
        type: ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;