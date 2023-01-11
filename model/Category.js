import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category is required!"],
        minLength: [2, "Category must have atleast 2 letter!"],
    },
    slug: {
        type: String,
        unique: [true, "Category must have unique slug!"],
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
categorySchema.pre("save", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
    });
    next();
});
const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;