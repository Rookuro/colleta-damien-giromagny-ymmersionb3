import React, { useState, useEffect } from 'react';

import axios from 'axios';

const ProductApiGet = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5046/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return products;
};

export default ProductApiGet;