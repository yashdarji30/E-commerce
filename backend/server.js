import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",authRoutes); 

app.listen(5000, () => {
console.log("sservernniing" + PORT);

connectDB();
})   