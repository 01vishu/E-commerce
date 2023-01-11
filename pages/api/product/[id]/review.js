import connectDB from "../../../../utils/connectDB";
import Product from "../../../../model/Product";
import Review from "../../../../model/Review";
import { getToken } from "next-auth/jwt";
const handler = async(req, res) => {
    try {
        const token = await getToken({
            req,
            secret: process.env.JWT_PRIVATE_KEY,
            secureCookie: process.env.NODE_ENV === "production",
        });
        if (!token)
            return res.status(401).json({ message: "You are not logged in!" });
        if (req.method === "POST") {
            const review = {
                user: token.sub,
                rating: req.body.rating,
                review: req.body.review,
                product: req.body.product,
            };
            const product = await Product.findById(req.query.id);
            if (!product)
                return res.status(404).json({ message: "Product Not Found!" });
            const addReview = await Review.create(review);
            console.log(addReview);

            await Product.findByIdAndUpdate({ _id: product._id }, { $push: { reviews: addReview._id } });
            res.status(201).json({
                review: addReview,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};
export default connectDB(handler);