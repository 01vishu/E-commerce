import connectDB from "../../../utils/connectDB";
import Product from "../../../model/Product";
import User from "../../../model/User";
import Cart from "../../../model/Cart";
const handler = async(req, res) => {
    if (req.method === "POST") {
        const { cart, userId } = req.body;
        let products = [];
        let user = await User.findById(userId);
        let existingCart = await Cart.findOne({ user: user._id });
        if (existingCart) {
            await existingCart.deleteOne();
        }
        for (let i = 0; i < cart.length; i++) {
            let dbProduct = await Product.findById(cart[i]._id);
            let tempProduct = {};
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.image = dbProduct.imageCover;
            tempProduct.weight = dbProduct.weight;
            tempProduct.flavour = dbProduct.flavour;
            tempProduct.price = dbProduct.priceDiscount;
            tempProduct.qty = cart[i].qty;
            products.push(tempProduct);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].qty;
        }
        await new Cart({
            products,
            cartTotal: cartTotal.toFixed(2),
            user: user._id,
        }).save();
        res.status(201).json({ message: "Cart saved in to DB" });
    }
};
export default connectDB(handler);