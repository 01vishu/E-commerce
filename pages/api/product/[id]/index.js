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
    } else if (req.method === "PATCH") {
        try {
            if (req.user.role === "admin") {
                const product = await Product.findByIdAndUpdate(
                    req.query.id,
                    req.body, {
                        new: true,
                        runValidators: true,
                    }
                );
                res.status(200).json({
                    status: "success",
                    data: product,
                });
            } else {
                return res.status(403).json({
                    status: "fail",
                    message: "You do not have permission to perform this action.",
                });
            }
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await protect(req, res);

            if (req.user.role === "admin") {
                await Product.findByIdAndDelete(req.query.id);
                res.status(204).json({
                    status: "success",
                });
            } else {
                return res.status(403).json({
                    status: "fail",
                    message: "You do not have permission to perform this action.",
                });
            }
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }
};
export default connectDB(handler);