import connectDB from "../../../../utils/connectDB";
import { getToken } from "next-auth/jwt";
import Product from "../../../../model/Product";
import User from "../../../../model/User";
const handler = async(req, res) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_PRIVATE_KEY,
        secureCookie: process.env.NODE_ENV === "production",
    });
    const user = await User.findById(token.sub);
    if (user.role === "admin") {} else {
        res.status(403).json({
            status: "fail",
            message: "You don't have permission to use this route!",
        });
    }
};