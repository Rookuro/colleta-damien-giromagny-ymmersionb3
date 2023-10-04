import React from 'react';
import ProductApiGet from '../../components/Api/ProductApiGet';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Component = () => {
    const products = ProductApiGet();

    const filteredProducts = products ? products.filter(product => product.tagProduct === 1) : [];

    return (
        <div className={styles.products}>
            {filteredProducts.length > 0 ? (
                <div className={styles.product}>
                    {filteredProducts.map(product => (
                        <div key={product.id} className={styles.productSize}>
                            <Image
                                src={`/uploads/${product.urlImage}`}
                                alt="sample image"
                                width={600}
                                height={400}
                            />
                            <h4>
                                <Link href={`/ProductDetail?id=${product.id}`}>
                                    {product.name}
                                </Link>
                            </h4>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No products with tag 1 found.</div>
            )}
        </div>
    );
};

export default Component;
