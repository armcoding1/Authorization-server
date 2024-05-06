import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;
    const user = await User.create({ username, email, password, passwordConfirm });
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ user: id });
};