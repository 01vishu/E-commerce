import connectDB from "../../../utils/connectDB";
import Product from "../../../model/Product";
import APIFeatures from "../../../utils/ApiFeatures";
const handler = async(req, res) => {
    if (req.method === "POST") {
        try {
            const newProduct = await Product.create(req.body);
            await newProduct.save();
            res.status(201).json({
                status: "success",
                data: newProduct,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    } else if (req.method === "GET") {
        try {
            const features = new APIFeatures(Product.find(), req.query)
                .search()
                .filter()
                .sort()
                .limitFields()
                .paginate();
            const products = await features.query;
            res.status(200).json({
                status: "success",
                result: products.length,
                data: products,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    } else {
        res.status(403).json({
            status: "fail",
            message: "Please use diffrent method",
        });
    }
};
export default connectDB(handler);