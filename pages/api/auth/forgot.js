import connectDB from "../../../utils/connectDB";
import User from "../../../model/User";
import jwt from "jsonwebtoken";
import { resetPassword } from "../../../emails/resetPassword";
import { sendEmail } from "../../../utils/sendEmail";

const handler = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "The email does not exist!" });
    const resetToken = jwt.sign({ id: user._id },
        process.env.RESET_SECRET_TOKEN, {
            expiresIn: process.env.RESET_TOKEN_EXPIRE_IN,
        }
    );

    const url = `${process.env.URL}/auth/reset/${resetToken}`;
    sendEmail(email, url, "", "Reset Your Password", resetPassword);
    res.json({ message: `Email sent to ${email}` });
};
export default connectDB(handler);