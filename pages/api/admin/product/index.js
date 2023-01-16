import connectDB from "../../../../utils/connectDB";
import Product from "../../../../model/Product";
import { getToken } from "next-auth/jwt";
import User from "../../../../model/User";

const handler = async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_PRIVATE_KEY,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const user = await User.findById(token.sub);
  if (user.role === "admin") {
    if (req.method === "POST") {
      try {
        let {
          name,
          brand,
          category,
          subCategories,
          flavour,
          weight,
          availableQuantity,
          price,
          priceDiscount,
          imageCover,
          images,
          descriptionImages,
          description,
        } = req.body;
        const newProduct = await Product.create({
          name,
          brand,
          category,
          subCategories,
          flavour,
          weight,
          availableQuantity: Number(availableQuantity),
          price: Number(price),
          priceDiscount: Number(priceDiscount),
          imageCover,
          images,
          descriptionImages,
          description,
        });
        res.status(201).json({
          status: "success",
          data: newProduct,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.status(403).json({
      status: "fail",
      message: "You don't have permission to use this route!",
    });
  }
};
export default connectDB(handler);
