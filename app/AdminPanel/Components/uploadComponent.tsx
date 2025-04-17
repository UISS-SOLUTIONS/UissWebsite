"use client";
import React, { useState } from "react";

const UploadForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) return alert("No image selected");

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "UissWebsite"); // replace with your preset

    const res = await fetch("https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Uploaded image URL:", data.secure_url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="file" accept="image/*" onChange={handleFileInput} />

      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded" />
      )}

      <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
        Submit Form
      </button>
    </form>
  );
};

export default UploadForm;
