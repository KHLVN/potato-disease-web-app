// import { getAllApps, createPost, updatePost, deletePost } from "../controllers/appControllers.js";
import express from "express";
import multer from "multer";
import { uploadImage, classifyImage, getResults } from "../controllers/imageController.js";

const router = express.Router();

// router.get("/potato", getAllApps);
// router.get("/images", getAllImages);
// router.post("/", createPost);
// router.put("/:id", updatePost);
// router.delete("/:id", deletePost)

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})

const upload = multer({ storage });

//Routes

router.post("/upload", upload.single("image"), uploadImage);
router.post("/classify/:imageId", classifyImage);
router.get("/results", getResults);

export default router;