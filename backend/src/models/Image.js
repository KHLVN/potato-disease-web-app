import mongoose from "mongoose";

// 1- create a schema
// 2- create model based off of that schema

const imageSchema = new mongoose.Schema(
    {
        filename: { type: String, required: true },       // original file name
        path: { type: String, required: true },           // storage path or cloud URL
        mimetype: { type: String, required: true },       // format of image file e.g., 'image/jpeg'
    }, 
    { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema)

export default Image