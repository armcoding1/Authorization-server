import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please enter a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (pass) {
                return pass === this.password
            },
            message: "Please confirm your password correctly"
        }
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password);
};

const User = model("User", userSchema);

export default User;