export function classifyImage(req, res) {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const imagePath = req.file.path;

        // TODO: Lapag MOdel dito

        // result dito const classifyResult = { disease: chuchu, confidence: 0 };

        // save to db
        const image = new Image({
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            disease: req.body.disease,
        });


    } catch (error) {
        
    }
}