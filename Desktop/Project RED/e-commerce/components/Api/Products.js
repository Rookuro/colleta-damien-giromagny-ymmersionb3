import React from 'react';
import ProductApiGet from './ProductApiGet';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import Link from 'next/link';

const ProductDisplay = () => {
    const products = ProductApiGet();

    return (
        <div className={styles.products}>
            {products ? (
                <div className={styles.product}>
                    {products.map(product => (
                        <div key={product.id} className={styles.productSize}>
                            <Link href={`/ProductDetail?id=${product.id}`}>
                                <Image
                                    src={`/uploads/${product.urlImage}`}
                                    alt="sample image"
                                    width={600}
                                    height={400}
                                />
                                <div className={styles.description}>
                                    <h4>
                                        {product.name}
                                    </h4>
                                    <div className={styles.price}>
                                        {product.price} $
                                    </div>
                                    
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProductDisplay;
