import connectDB from "../../../../utils/connectDB";
import Product from "../../../../model/Product";
import { getToken } from "next-auth/jwt";
import User from "../../../../model/User";
const handler = async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_PRIVATE_KEY,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const user = await User.findById(token.sub);
  if (user.role === "admin") {
    if (req.method === "DELETE") {
      try {
        await Product.findByIdAndDelete(req.query.id);
        return res.status(200).json({
          message: "Product has been deleted!",
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
export default connectDB(handler);
