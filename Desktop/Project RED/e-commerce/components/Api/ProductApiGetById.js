import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const ProductApiGetById = ({ id }) => {
    const [product, setProduct] = useState(null);
    console.log("mon id : " + id);


    useEffect(() => {
        console.log("pourquoi !");
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5046/api/products/32`);
                setProduct(response.data);
                console.log("Product object: ", response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);
    console.log("mon produit : " +product)

    return (<div>
        <Image src={product.urlImage && product.urlImage.length > 0 ? `/uploads/${product.urlImage[0]}` : '/path/par/default.jpg'} width={40} height={40} />
    </div>);
};
export default ProductApiGetById;