import connectDB from "../../../../utils/connectDB";
import Coupon from "../../../../model/Coupon";
import User from "../../../../model/User";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_PRIVATE_KEY,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const user = await User.findById(token.sub);
  if (user.role === "admin") {
    if (req.method === "POST") {
      try {
        await Coupon.create({
          coupon: req.body.coupon,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          discount: req.body.discount,
        });
        return res.status(201).json({
          message: `${req.body.coupon} is created`,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
    if (req.method === "DELETE") {
      try {
        await Coupon.deleteOne({ _id: req.query.id });
        res.status(200).json({
          message: `Coupon has been Deleted`,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
};
export default connectDB(handler);
