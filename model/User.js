import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name must have minimum 3 characters!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exist!"],
        validate: [validator.isEmail, "Please provide a valid email!"],
        lowercase: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        maxLength: [10, "Please provide a valid phone number"],
        trim: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    address: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        city: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    wishlist: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
        },
    }, ],
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    password: {
        type: String,
        minLength: [8, "Password must have 8 characters"],
        validate: [
            validator.isStrongPassword,
            "Password is not strong, Please try again!",
        ],
        required: [true, "Password is required!"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        minLength: [8, "Password must have 8 characters"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Password is not same!",
        },
        required: [true, "Password is required!"],
        select: false,
    },
    image: String,
});
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
UserSchema.methods.checkPassword = async function(
    inputPassword,
    userPassword
) {
    return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;