import React, { useState } from "react";
import axios from "axios";

export default function ImageUploader() {
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.concat(files);
    setFiles(newFiles);

    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (files.length === 0) {
      alert("Veuillez sélectionner des fichiers");
      return;
    }

    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('images', element);
    }

    try {
      const response = await axios.post("/api/upload", formData);

      console.log("API Response:", response.data);

      setUploadedImages(response.data.images);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }

  const downloadImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {imagePreviews.length > 0 && (
        <div>
          <p>Fichiers sélectionnés :</p>
          <ul>
            {imagePreviews.map((preview, index) => (
              <li key={index}>
                <img src={preview} alt={`Preview ${index}`} width="100" />
              </li>
            ))}
          </ul>
          <p>Noms des fichiers :</p>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}

          </ul>
        </div>
      )}
      {uploadedImages && uploadedImages.length > 0 && (
        <div>
          <p>Images téléchargées :</p>
          <ul>
            {uploadedImages.map((imageUrl, index) => (
              <li key={index}>
                <button onClick={() => downloadImage(imageUrl)}>Télécharger</button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
