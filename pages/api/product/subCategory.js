import connectDB from "../../../utils/connectDB";
import SubCategory from "../../../model/SubCategory";

const handler = async(req, res) => {
    if (req.methos === "POST") {
        try {
            const subCategory = await SubCategory.create(req.body);
            res.status(201).json({
                status: "success",
                data: subCategory,
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