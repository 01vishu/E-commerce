import connectDB from "../../../../utils/connectDB";
import Product from "../../../../model/Product";
import { getToken } from "next-auth/jwt";
import User from "../../../../model/User";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
        let imageCoverUrl;
        let imagesUrl = [];
        let descriptionImagesUrl = [];
        if (imageCover) {
          let result = await cloudinary.v2.uploader.upload(imageCover, {
            overwrite: true,
            folder: "products",
          });
          imageCoverUrl = result.secure_url;
        }
        if (images) {
          for (let index = 0; index < images.length; index++) {
            let result = await cloudinary.v2.uploader.upload(images[index], {
              overwrite: true,
              folder: "products",
            });
            imagesUrl.push(result.secure_url);
          }
        }
        if (descriptionImages) {
          for (let index = 0; index < descriptionImages.length; index++) {
            let result = await cloudinary.v2.uploader.upload(
              descriptionImages[index],
              {
                overwrite: true,
                folder: "products",
              }
            );
            descriptionImagesUrl.push(result.secure_url);
          }
        }
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
          imageCover: imageCoverUrl,
          images: imagesUrl,
          descriptionImages: descriptionImagesUrl,
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
