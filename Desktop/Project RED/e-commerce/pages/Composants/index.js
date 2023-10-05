import React, { useState } from 'react';
import ProductApiGet from '../../components/Api/ProductApiGet';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Ram from './/../../public/ram.webp';
import Watercooling from './/../../public/watercooling.webp';
import Alimentation from './/../../public/alim.webp';
import Ssd from './/../../public/ssd.webp';



const Component = () => {
    const products = ProductApiGet();

    const [inStockFilter, setInStockFilter] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2500);

    const filteredProducts = products ? (inStockFilter
        ? products.filter(product => product.tagProduct === 1 && product.quantity > 0 && product.price >= minPrice && product.price <= maxPrice)
        : products.filter(product => product.tagProduct === 1 && product.price >= minPrice && product.price <= maxPrice))
        : [];

    function InStock() {
        setInStockFilter(!inStockFilter);
    }
    return (
        <>
        <div className={styles.component_page_main}>
            <div className={styles.component_page_block_main}>
                <div className={styles.component_page_block1}>
                    <h3>Filtre composants</h3>
                    <div>
                        <input type='checkbox' onClick={InStock} checked={inStockFilter}/>
                        <label>En stock</label>
                    </div>
                    <div>
                        <h4>Filtre par prix</h4>
                        <input
                            type='range'
                            min='0'
                            max='2500'
                            value={minPrice}
                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        />
                        <input
                            type='range'
                            min='0'
                            max='2500'
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        />
                        <p>Prix minimum: {minPrice}</p>
                        <p>Prix maximum: {maxPrice}</p>
                    </div>
                    
                </div> 
                <div className={styles.component_page_block2}>
                    <h3>Meilleurs ventes composants ordinateurs</h3>
                    <div className={styles.component_page_block2_img_text}>
                        <div className={styles.component_page_block2_img_text_block1}>
                            <Image src={Ram} width={150} height={150} />
                            {/* <p>DDR5 Corsair Vengeance RGB - 32 Go (2 x 16 Go) 6000 MHz - CAS 36</p> */}
                        </div>
                        <div className={styles.component_page_block2_img_text_block2}>
                            <Image src={Watercooling} width={150} height={150} />
                        </div>
                        <div className={styles.component_page_block2_img_text_block3}>
                            <Image src={Alimentation} width={150} height={150} />
                        </div>
                        <div className={styles.component_page_block2_img_text_block4}>
                            <Image src={Ssd} width={150} height={150} />
                        </div>
                    </div>
                </div> 
            </div> 
            <div className={styles.component_page_block3}>
                <div className={styles.component_display_product}>
                    {filteredProducts.length > 0 ? (
                        <div className={styles.product}>
                            {filteredProducts.map(product => (
                                <div key={product.id} className={styles.component_display_product_number}>
                                    <Image
                                        src={product.urlImage && product.urlImage.length > 0 ? `/uploads/${product.urlImage[0]}` : '/path/par/default.jpg'}
                                        alt="sample image"
                                        width={200}
                                        height={200}
                                    />
                                    <div key={product.id} className={styles.component_block_information}>
                                        <h3>
                                            <Link href={`/ProductDetail?id=${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <h4>
                                            <Link href={`/ProductDetail?id=${product.id}`}>
                                                {product.descriptionV2}
                                            </Link>
                                        </h4>
                                    </div>
                                    <div key={product.id} className={styles.component_product_price}>
                                        <Link href={`/ProductDetail?id=${product.id}`}>
                                                {product.price}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No products with tag 1 found.</div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Component;
