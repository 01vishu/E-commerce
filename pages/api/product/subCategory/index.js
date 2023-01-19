import connectDB from "../../../../utils/connectDB";
import SubCategory from "../../../../model/SubCategory";
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
        await SubCategory.create({ name: req.body.name });
        return res.status(201).json({
          message: `${req.body.name} is created`,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
    if (req.method === "DELETE") {
      try {
        await SubCategory.deleteOne({ _id: req.query.id });
        res.status(200).json({
          message: `Sub Category has been Deleted`,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
};
export default connectDB(handler);
