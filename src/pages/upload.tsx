import React, { useState } from "react";
import axios from "axios";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } 
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.url); // Save the uploaded image URL
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Image to Cloudinary</h1>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <button type="submit">Upload</button>
      </form>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default Upload;
