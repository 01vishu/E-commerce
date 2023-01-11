import connectDB from "../../../utils/connectDB";
import User from "../../../model/User";
import bcrypt from "bcrypt";
const handler = async(req, res) => {
    if (req.method === "PATCH") {
        const { _id, password } = req.body;
        const user = await User.findById(_id);
        if (!user) return res.json({ message: "User does not exist" });
        const decodedPassword = await bcrypt.hash(password, 12);
        await user.updateOne({
            password: decodedPassword,
        });
        res.json({
            email: user.email,
        });
    }
};
export default connectDB(handler);