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
    urlImage: '',
    urlProduct: '',
    tagProduct: 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5046/api/products', formData);
      console.log('Produit ajouté avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  };

  // const [files, setFiles] = useState([]);

  // function handleFileChange(event) {
  //   const selectedFiles = Array.from(event.target.files);
  //   setFiles(selectedFiles);
  // }

  // function onSubmit(event) {
  //   event.preventDefault();

  //   if (files.length === 0) {
  //     alert("Veuillez sélectionner des fichiers");
  //     return;
  //   }

  //   const body = new FormData();

  //   for (let index = 0; index < files.length; index++) {
  //     const element = files[index];
  //     body.append('file', element);
  //   }

  //   fetch("/api/upload", {
  //     method: "POST",
  //     body
  //   });
  // }

  return (
    <>
      <div>
        <h1>
          Ajouter un nouveau produit
        </h1>
        <div className={styles.form_block}>
          <form className={styles.form} onSubmit={handleSubmit}  encType="multipart/form-data">
            <div className={styles.high_main_block}>
              <div className={styles.first_left_block}>
              {/* <div>
                  <input type="file" multiple onChange={handleFileChange} />
                {files.length > 0 && (
                  <div>
                    <p value={formData.urlImage = files.map(file => file.name).join(", ") } onChange={handleFileChange}>Fichiers sélectionnés : {files.map(file => file.name).join(", ")}</p>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> */}
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