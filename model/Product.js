import mongoose from "mongoose";
import slugify from "slugify";

const { ObjectId } = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Proudct must have a name!"],
        minLength: [10, "Product must have more than 10 character!"],
    },
    brand: {
        type: String,
        required: [true, "Product must have brand!"],
        ref: "Brand",
    },
    category: {
        type: String,
        required: [true, "Proudct must have category!"],
        ref: "Category",
    },
    subCategories: [{
        type: String,
        ref: "SubCategory",
    }, ],

    slug: {
        type: String,
        unique: [true, "Product must have unique slug!"],
    },
    flavour: {
        type: String,
        required: [true, "Product must have a flavour!"],
        ref: "Flavour",
        lowercase:true
    },
    weight: {
        type: Number,
        required: [true, "Product must have a weight!"],
        ref: "Weight",
    },
    availableQuantity: {
        type: Number,
        required: [true, "Product must have Quantity"],
    },
    description: {
        type: String,
        required: [true, "Product must have desciption!"],
    },
    price: {
        type: Number,
        required: [true, "Product must have price!"],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(value) {
                return value < this.price;
            },
            message: "Discount price ({VALUE}) should be below than price",
        },
    },
    avgRating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        type: ObjectId,
        ref: "Review",
    }, ],
    imageCover: {
        type: String,
        required: [true, "Product must have a cover image!"],
    },
    images: [String],
    descriptionImages: [String],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    lean: true,
});

ProductSchema.index({
    name: "text",
    description: "text",
    flavour: "text",
    slug: "text",
});

ProductSchema.pre("save", function(next) {
    this.slug = slugify(this.name + "-" + this.flavour + "-" + this.weight, {
        lower: true,
    });
    next();
});

const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;