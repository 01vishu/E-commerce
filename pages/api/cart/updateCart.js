import connectDB from "../../../utils/connectDB";
import Product from "../../../model/Product";
const handler = async(req, res) => {
    if (req.method === "POST") {
        const promise = req.body.products.map(async(product) => {
            let dbProduct = await Product.findById(product._id);
            let priceDiscount = dbProduct.priceDiscount;
            let price = dbProduct.price;
            let availableQuantity = dbProduct.availableQuantity;
            return {
                ...product,
                price,
                priceDiscount,
                availableQuantity,
            };
        });
        const data = await Promise.all(promise);
        // console.log(data);
        res.status(200).json(data);
    }
};
export default connectDB(handler);