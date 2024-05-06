// import modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// import routes & middlewares
import { verifyToken, checkUser } from "./middleware/verify.js";

// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));

// routes
app.use("*", verifyToken, checkUser);

export default app;