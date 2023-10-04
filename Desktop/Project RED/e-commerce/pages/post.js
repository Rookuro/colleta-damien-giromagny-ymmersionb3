import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/post.module.css';
import Chainlink from './/../public/lien.png';
// import FileUploader from './FileUploader';
// import { writeFile } from "fs/promises";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    descriptionV2: '',
    price: 0,
    isPromotion: false,
    urlImage: [],
    urlProduct: '',
    tagProduct: 0
  });
  const [selectedImageNames, setSelectedImageNames] = useState([]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
  
    // Stockez les noms des images sélectionnées
    const imageNames = selectedFiles.map((file) => file.name);
  
    // Ajoutez les fichiers et noms au tableau formData.images
    setFormData({
      ...formData,
      images: [...formData.images, ...selectedFiles],
      urlImage: [...formData.urlImage, ...imageNames]
    });
  
    const previews = formData.images.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  
    setSelectedImageNames(formData.urlImage);
  }
  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Assurez-vous que formData.urlImage est un tableau
    const urlImage = Array.isArray(formData.urlImage) ? formData.urlImage.join(',') : '';
    // const urlImage = selectedImageNames.join(',');
  
    const dataToSend = {
      ...formData,
      urlImage,
    };
  
    try {
      const response = await axios.post('http://localhost:5046/api/products', dataToSend);
      console.log('Produit ajouté avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  };
  

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
    <>
      <div>
        <h1 className={styles.title}>
          Ajouter un nouveau produit
        </h1>
        <div className={styles.form_block}>
          <form className={styles.form} onSubmit={(e) => { handleSubmit(e); onSubmit(e); }}  encType="multipart/form-data">
            <div className={styles.high_main_block}>
              <div className={styles.first_left_block}>
              <div>
              <input type="file" multiple onChange={handleFileChange} />
              {imagePreviews.length > 0 && (
                <div>
                  <p>Fichiers sélectionnés :</p>
                  <ul>
                    {imagePreviews.map((preview, index) => (
                      <li key={index}>
                        <img src={preview} alt={`Preview ${index}`} width="100" />
                        <p>{formData.urlImage[index]}</p>
                      </li>
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
              </div>
              <div className={styles.first_right_block}>
                <div className={styles.high_right_block}>
                  <div className={styles.name_block}>
                    <label className={styles.label}>
                      Nom du produit
                      <input
                        className={styles.input_box}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={styles.price_block}>
                    <label className={styles.label}>
                      Prix du produit
                      <input
                        className={styles.input_box}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className={styles.label}>
                    Description
                    <textarea className={styles.description_block}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <label className={styles.label}>
                    Description Complémentaire
                    <textarea className={styles.description_block}
                      name="descriptionV2"
                      value={formData.descriptionV2}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.main_low_block}>
              <div className={styles.first_low_block}>
                <label for="pet-select" className={styles.label}>Ajouter Tag(s)</label>
                <select className={styles.input_box} id="pet-select" onChange={handleChange}>
                  <option value={formData.tagProduct = 0} onChange={handleChange}>processor</option>
                  <option value={formData.tagProduct = 1} onChange={handleChange}>motherboard</option>
                </select>
              </div>
              <div className={styles.second_low_block}>
                <label className={styles.label}>
                  URL Stripe

                  <textarea
                    className={styles.input_box}
                    name="urlProduct"
                    value={formData.urlProduct}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className={styles.add_product}>
                <button className={styles.add_button} type="submit">Ajouter</button>
              </div>
          </form>
        </div>
      </div> 
    </>
  );
}

export default ProductForm;