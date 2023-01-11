import connectDB from "../../../utils/connectDB";
import User from "../../../model/User";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../utils/sendEmail";
import { activateEmail } from "../../../emails/activateEmail";
const handler = async(req, res) => {
    if (req.method === "POST") {
        try {
            const { email, password, passwordConfirm } = req.body;

            const newUser = await User.create({
                email,
                password,
                passwordConfirm,
            });
            // Creating token
            const token = jwt.sign({ id: newUser._id },
                process.env.ACTIVATION_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN,
                }
            );
            // Sending Activation Email
            const url = `${process.env.URL}/activation/${token}`;
            sendEmail(email, url, "", "Activate Your Account", activateEmail);
            //   Creating cookie
            // for client

            const serialised = serialize("jwt", token, {
                httpOnly: true,
                secure: process.env.MODE !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            res.setHeader("Set-Cookie", serialised);

            res.status(201).json({
                status: "success",
                token,
                data: newUser,
                message: "Registration has been successed! Please Verify Your Email!",
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Invalid Email or Password!",
                error,
            });
        }
    }
};
export default connectDB(handler);