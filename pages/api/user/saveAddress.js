import connectDB from "../../../utils/connectDB";
import User from "../../../model/User";

const handler = async(req, res) => {
    if (req.method === "PATCH") {
        const { address, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) throw new Error("No User Found!");
        await user.updateOne({
            address,
        });
        res.json({
            address: user.address,
        });
    }
};
export default connectDB(handler);