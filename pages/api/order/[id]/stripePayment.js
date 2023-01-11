import connectDB from "../../../../utils/connectDB";
import Order from "../../../../model/Order";
import Product from "../../../../model/Product";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async(req, res) => {
    if (req.method === "POST") {
        try {
            const { amount, id } = req.body;
            const orderId = req.query.id;
            const payment = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "INR",
                description: "Vishu's E-commerce Store",
                payment_method: id,
                confirm: true,
            });
            const order = await Order.findById(orderId);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: payment.id,
                    status: payment.status,
                    email: payment.email,
                };
                await order.save();
                for (let index = 0; index < order.products.length; index++) {
                    const product = await Product.findById({
                        _id: order.products[index].product,
                    });
                    const updateQty = await Product.findByIdAndUpdate(product._id, {
                        availableQuantity: product.availableQuantity - order.products[index].qty,
                    });
                }
                res.json({
                    success: true,
                });
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
export default connectDB(handler);