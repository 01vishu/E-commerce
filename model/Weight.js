import mongoose from "mongoose";
import slugify from "slugify";
const weightSchema = new mongoose.Schema({
    name: {
        type: Number,
        required: [true, "Weight is required!"],
    },
    slug: {
        type: String,
        unique: [true, "Weight must have unique slug!"],
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
weightSchema.pre("save", function(next) {
    this.slug = slugify(this.name.toString(), {
        lower: true,
    });
    next();
});
const Weight = mongoose.models.Weight || mongoose.model("Weight", weightSchema);
export default Weight;