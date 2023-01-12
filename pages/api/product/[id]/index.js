import connectDB from "../../../../utils/connectDB";
import Product from "../../../../model/Product";
import Review from "../../../../model/Review";
import User from "../../../../model/User";

const handler = async(req, res) => {
    if (req.method === "GET") {
        try {
            const product = await Product.findOne({ slug: req.query.id }).populate({
                path: "reviews",
                model: Review,
                populate: {
                    path: "user",
                    model: User,
                    select: "name image",
                },
            });

            res.status(200).json({
                status: "success",
                data: product,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: "No Prouduct Found!",
            });
            5;
        }
    }
};
export default connectDB(handler);