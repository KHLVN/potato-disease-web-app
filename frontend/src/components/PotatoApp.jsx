import React, { useState, useEffect } from "react";

function PotatoApp() {
  const [tab, setTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [results, setResults] = useState([]);

  // Fetch history when switching to history tab
  useEffect(() => {
    if (tab === "history") {
      const fetchResults = async () => {
        const res = await fetch("/api/images/results");
        const data = await res.json();
        setResults(data);
      };
      fetchResults();
    }
  }, [tab]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    // Upload
    const uploadRes = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    });
    const uploaded = await uploadRes.json();

    // Classify
    const classifyRes = await fetch(`/api/images/classify/${uploaded._id}`, {
      method: "POST",
    });
    const classification = await classifyRes.json();

    setResult(classification);
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            tab === "upload" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("upload")}
        >
          Upload
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "history" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("history")}
        >
          History
        </button>
      </div>

      {/* Upload Tab */}
      {tab === "upload" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Potato Disease Classifier</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Upload & Classify
          </button>

          {result && (
            <div className="mt-6 border p-4 rounded">
              <p><strong>Disease:</strong> {result.disease}</p>
              <p><strong>Confidence:</strong> {(result.probability * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Classification History</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Image</th>
                <th className="border px-2 py-1">Disease</th>
                <th className="border px-2 py-1">Confidence</th>
                <th className="border px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res._id}>
                  <td className="border px-2 py-1">
                    <img
                      src={`/${res.image.path}`}
                      alt="potato"
                      className="h-12"
                    />
                  </td>
                  <td className="border px-2 py-1">{res.disease}</td>
                  <td className="border px-2 py-1">
                    {(res.probability_score * 100).toFixed(2)}%
                  </td>
                  <td className="border px-2 py-1">
                    {new Date(res.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PotatoApp;
