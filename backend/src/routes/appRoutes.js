// import { getAllApps, createPost, updatePost, deletePost } from "../controllers/appControllers.js";
import express from "express";
import multer from "multer";
import path from "path";
import { uploadImage, getResults } from "../controllers/imageController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve("uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})

const upload = multer({ storage });

//Routes
router.post("/upload", upload.single("image"), (req, res, next) => {
  console.log("Multer parsed:", req.file);
  next();
}, uploadImage);
router.get("/results", getResults);

export default router;