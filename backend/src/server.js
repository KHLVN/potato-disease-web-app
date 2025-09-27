import express from 'express';
import appRoutes from "./routes/appRoutes.js";
import { connectDB } from "../src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();

app.use(express.json());

app.use("/api/images", appRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
})