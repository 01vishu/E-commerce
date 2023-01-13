import mongoose from "mongoose";
import slugify from "slugify";
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Brand is required!"],
        minLength: [2, "Brand must have atleast 2 letter!"],
    },
    slug: {
        type: String,
        unique: [true, "Brand must have unique slug!"],
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
brandSchema.pre("save", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
    });
    next();
});
const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;