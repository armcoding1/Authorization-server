import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const id = user._id;

    if (!user && (await user.correctPassword(password, user.password))) {

        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        res.cookie("jwt", token, { httpOnly: true });
        res.json({ user: id });
    };
};