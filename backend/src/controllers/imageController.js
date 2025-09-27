import Image from "../models/Image.js";
import ClassificationResult from "../models/ClassificationResult.js";

// Upload Image
export async function uploadImage(req, res){
  try {
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
    }); 
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
};

// Classify
export async function classifyImage(req, res) {
  try {
    const { imageId } = req.params;
    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // Para sa Deep Learning MODEL dito
    // const response = await axios.post("http://localhost:5000/predict", {
    //   imagePath: image.path,
    // });

    const { disease, probability } = response.data;

    // Save classification result
    const result = new ClassificationResult({
      image: image._id,
      disease,
      probability_score: probability,
    });

    await result.save();

    res.json({ imageId, disease, probability });
  } catch (err) {
    res.status(500).json({ error: "Classification failed" });
  }
};

// Classification Result
export async function getResults(req, res){
  try {
    const results = await ClassificationResult.find()
      .populate("image")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
};