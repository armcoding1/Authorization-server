import app from "./app.js";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

async function startServer() {
    const PORT = process.env.PORT;
    const MOGNO_URL = process.env.MONGO_URL;
    await mongoose.connect(MOGNO_URL);
    console.log("Mongo database is connected");
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
};

startServer();