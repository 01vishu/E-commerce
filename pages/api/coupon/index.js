import connectDB from "../../../utils/connectDB";
import Coupon from "../../../model/Coupon";

const handler = async(req, res) => {
    if (req.method === "POST") {
        try {
            const { coupon, startDate, endDate, discount } = req.body;
            const getCoupon = await Coupon.findOne({ coupon });
            if (getCoupon)
                return res.status(400).json({
                    message: "This Coupon already exist, Please Try with a diffrent name!",
                });
            await new Coupon({ coupon, startDate, endDate, discount }).save();
            res.status(201).json({
                message: `${coupon} coupon created successfully!`,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
export default connectDB(handler);