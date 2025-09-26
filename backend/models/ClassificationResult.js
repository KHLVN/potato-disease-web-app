import mongoose from "mongoose";

const classResultSchema = new mongoose.Schema(
    {
        result_ID: { type: String, required: true, unique: true },  // unique result identifier
        probability_score: { type: Number, required: true },        // e.g., 0.85 for 85%
    }, 
    { timestamps: true }); // adds createdAt & updatedAt automatically

const ClassificationResult = mongoose.model("ClassificationResult", classResultSchema)

export default ClassificationResult

