import mongoose from "mongoose";
import slugify from "slugify";
const flavourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Flavour is required!"],
        minLength: [2, "Flavour must have atleast 2 letter!"],
    },
    slug: {
        type: String,
        unique: [true, "Flavour must have unique slug!"],
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
flavourSchema.pre("save", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
    });
    next();
});
const Flavour =
    mongoose.models.Flavour || mongoose.model("Flavour", flavourSchema);
export default Flavour;