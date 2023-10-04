// pages/ProductDetail.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/productdetails.module.css';
import Image from 'next/image';
import Star from './/../public/star.png';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5046/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className= {styles.productdetail_main}>
        <div className={styles.productdetail_block}>
          {product ? (
            <>
                <div className={styles.productdetail_block1}>
                  <h2>{product.name}</h2>
                  <p>{product.descriptionV2}</p>
                </div>
                <div className={styles.productdetail}>
                <div className={styles.productdetail_block2}>
                    <Image 
                      src={`/uploads/${product.urlImage}`} 
                      alt={product.name} 
                      width={450}
                      height={450}
                    />
                </div>
                <div className={styles.productdetail_block3}>
                  <div className={styles.productdetail_block3_img_notice}>
                    <div className={styles.productdetail_block3_img}>
                      <Image src={Star} />
                      <Image src={Star} />
                      <Image src={Star} />
                      <Image src={Star} />
                      <Image src={Star} />
                    </div>
                    <div className={styles.productdetail_block3_notice}>
                      <h3>Donner votre avis</h3>
                    </div>
                  </div>
                  <p>{product.description}</p>
                </div>
                <div className={styles.productdetail_block4}>
                  <h3>{product.price}€</h3>
                  <div className={styles.productdetail_block4_basket}>
                    <form>
                      <button className={styles.button_basket} type="submit">
                        Ajouter au panier
                      </button>
                    </form>
                  </div>
                </div>
              </div>  
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
  );
};

export default ProductDetail;
