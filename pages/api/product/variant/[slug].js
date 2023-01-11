import connectDB from "../../../../utils/connectDB";
import Product from "../../../../model/Product";
const handler = async(req, res) => {
    if (req.method === "GET") {
        let product = await Product.findOne({ slug: req.query.slug });

        let variants = await Product.find({
            name: product.name,
        });
        let flavourWeight = {};
        for (let item of variants) {
            if (Object.keys(flavourWeight).includes(item.flavour)) {
                flavourWeight[item.flavour][item.weight] = { slug: item.slug };
            } else {
                flavourWeight[item.flavour] = {};
                flavourWeight[item.flavour][item.weight] = { slug: item.slug };
            }
        }
        res.status(200).json({
            status: "success",
            data: flavourWeight,
        });
    }
};
export default connectDB(handler);