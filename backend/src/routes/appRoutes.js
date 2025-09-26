import express from "express";
import { getAllApps, createPost, updatePost, deletePost } from "../controllers/appControllers.js";

const router = express.Router();

router.get("/", getAllApps);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost)

export default router

