import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/productdetails.module.css';
import Image from 'next/image';
import Star from '../public/star.png';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

  }, [id]);
  const addToCart = (item) => {
    // Copiez l'état actuel du panier
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      if (existingItem.quantity < item.quantity) {
        existingItem.quantity += 1;
        console.log("on ajoute au panier +1");
      }
    } else {
      updatedCart.push({ ...item, quantity: 1 });
      console.log("on ajoute au panier");
    }

    // Mise à jour de l'état du panier
    setCart(updatedCart);

    // Mise à jour du panier dans le localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
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

  const [selected, setSelected] = useState(0);

  function switchItem(index) {
    setSelected(index);
  }

  return (
    <div className={styles.productdetail_main}>
      <div className={styles.productdetail_block}>
        {product ? (
          <>
            <div className={styles.productdetail_block1}>
              <h2>{product.name}</h2>
              <p>{product.descriptionV2}</p>
            </div>
            <div className={styles.productdetail}>
              <div className={styles.productdetail_block2}>
                <div className={styles.Photos}>
                  <Image
                    src={
                      product.urlImage && product.urlImage.length > 0
                        ? `/uploads/${product.urlImage[selected]}`
                        : '/path/par/default.jpg'
                    }
                    alt={product.name}
                    width={2000}
                    height={2000}
                  />
                </div>
                <div className={styles.subPhotos}>
                  {product.urlImage.map((_, index) => (
                    <div
                      onClick={() => switchItem(index)}
                      className={selected == index ? styles.colorselected : ''}
                    >
                      <Image
                        key={index}
                        src={`/uploads/${product.urlImage[index]}`}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
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
                    <button
                      className={styles.button_basket}
                      type="button"
                      onClick={() => addToCart(product)}
                    >
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
