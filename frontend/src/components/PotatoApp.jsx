import React, { useState } from "react";

function PotatoApp() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setResult(data); // Show classification result
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Potato Disease Classifier</h1>

      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Preview */}
      {preview && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Preview:</h3>
          <img
            src={preview}
            alt="preview"
            style={{ width: "250px", border: "2px solid #ccc", borderRadius: "8px" }}
          />
        </div>
      )}

      {/* Upload button */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleUpload}>Upload & Classify</button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Classification Result</h3>
          <p><strong>Disease:</strong> {result.disease}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
        </div>
      )}
    </div>
  );
}

export default PotatoApp;
