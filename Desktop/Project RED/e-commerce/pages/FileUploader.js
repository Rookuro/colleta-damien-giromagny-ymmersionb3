import React, { useState } from "react";

export default function ImageUploader() {
  const [files, setFiles] = useState([]);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  }

  function onSubmit(event) {
    event.preventDefault();

    if (files.length === 0) {
      alert("Veuillez sélectionner des fichiers");
      return;
    }

    const body = new FormData();

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      body.append('file', element);
    }

    fetch("/api/upload", {
      method: "POST",
      body
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {files.length > 0 && (
        <div>
          <p>Fichiers sélectionnés :</p>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
