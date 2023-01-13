import cloudinary from "cloudinary";
import connectDB from "../../../utils/connectDB";
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async(req, res) => {
    try {
        const formData = new FormData();
        formData.append("file", req.body.image);
        formData.append("upload_preset", "daexeuoqi");
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            resource_type: "auto",
        });
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
export default connectDB(handler);