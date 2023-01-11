import connectDB from "../../../utils/connectDB";
import Order from "../../../model/Order";
const handler = async(req, res) => {
    if (req.method === "POST") {
        try {
            const {
                user,
                products,
                shippingAddress,
                paymentMethod,
                total,
                totalBeforeDiscount,
                couponApplied,
            } = req.body;
            const newOrder = await Order.create({
                user,
                products,
                shippingAddress,
                paymentMethod,
                total,
                totalBeforeDiscount,
                couponApplied,
            });
            return res.status(201).json({ status: "success", orderId: newOrder._id });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
export default connectDB(handler);