import mongoose from "mongoose";
import slugify from "slugify";
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "SubCategory is required!"],
        minLength: [2, "SubCategory must have atleast 2 letter!"],
    },
    slug: {
        type: String,
        unique: [true, "SubCategory must have unique slug!"],
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
subCategorySchema.pre("save", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
    });
    next();
});
const SubCategory =
    mongoose.models.SubCategory ||
    mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;