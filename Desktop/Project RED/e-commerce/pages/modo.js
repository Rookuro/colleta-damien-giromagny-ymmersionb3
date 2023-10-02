import { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    isPromotion: false,
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Prix:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        En promotion:
        <input
          type="checkbox"
          name="isPromotion"
          checked={formData.isPromotion}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Ajouter le produit</button>
    </form>
  );
}

export default ProductForm;
