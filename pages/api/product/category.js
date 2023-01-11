import connectDB from "../../../utils/connectDB";
import Category from "../../../model/Category";

const handler = async(req, res) => {
    if (req.methos === "POST") {
        try {
            const category = await Category.create(req.body);
            res.status(201).json({
                status: "success",
                data: category,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
};
export default connectDB(handler);