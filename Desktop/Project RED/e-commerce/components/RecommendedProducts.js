import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ProductApiGetById from './Api/ProductApiGetById';

const UserRecommendations = () => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("mais ça troll !");
        const userId = 'gD3TyEbKSQPinQ1ZnlmyKsuRnIm1';
        axios.get('http://localhost:7043/api/user-recommendations?userId=' + userId)
            .then((response) => {
                setRecommendedProducts(response.data);
                console.log("Produits recommandés :", response.data);
                fetchProductDetails(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des recommandations :', error);
            });
    }, []);

    return (
        <div>
            <h1>Mon site e-commerce</h1>
            <h2>Produits recommandés</h2>
            <ul>
                {recommendedProducts.map((productId, index) => (
                    <li key={index}>
                        <ProductApiGetById key={productId} id={productId}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserRecommendations;
