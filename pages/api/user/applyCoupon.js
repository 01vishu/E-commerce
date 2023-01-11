import connectDB from "../../../utils/connectDB";
import Coupon from "../../../model/Coupon";
import Cart from "../../../model/Cart";

const handler = async(req, res) => {
    if (req.method === "POST") {
        const { coupon, userId } = req.body;
        const getCoupon = await Coupon.findOne({ coupon });
        if (!getCoupon)
            return res.status(404).json({
                status: "fail",
                message: "Invaild Coupon!",
            });

        const dateParts = getCoupon.endDate.split("-");
        const endDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        if (endDate < Date.now()) {
            return res
                .status(400)
                .json({ status: "fail", message: "This Coupon has been Expired!" });
        }
        const { cartTotal } = await Cart.findOne({ user: userId });
        let totalAfterDiscount = cartTotal - (cartTotal * getCoupon.discount) / 100;
        await Cart.findOneAndUpdate({ user: userId }, { totalAfterDiscount });
        res.status(200).json({
            status: "success",
            totalAfterDiscount: totalAfterDiscount.toFixed(2),
            discount: getCoupon.discount,
        });
    }
};
export default connectDB(handler);