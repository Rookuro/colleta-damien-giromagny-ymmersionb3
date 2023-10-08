import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/productdetails.module.css';
import Image from 'next/image';
import Star from '../public/star.png';
import Validity from './/../public/validity.png';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [productAdded, setProductAdded] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user-id');
        const userId = response.data.userId;
        console.log("user-id : " + userId);
        setUserId(userId);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur :', error);
        setUserId(null);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

  }, [id]);
  
  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);
    // const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
      const interactionData = {
          userId: userId,
          productId: item.id,
          tag: item.tagProduct,
          interactionType: 'add_to_cart',
      };
  
      fetch('/api/interactions', {
        method: 'POST',
        body: JSON.stringify(interactionData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.status === 200) {
            setProductAdded(true);
            // alert('Le produit a été ajouté au panier.');
        } else {
            alert("Une erreur s'est produite lors de l'ajout au panier. Veuillez réessayer.");
        }
    })
    .catch((error) => {
        console.log(error);
    });
    
  }
  

    if (existingItem) {
      if (existingItem.quantity < item.quantity) {
        existingItem.quantity += 1;
        console.log("on ajoute au panier +1");
      }
    } else {
      updatedCart.push({ ...item, quantity: 1 });
      console.log("on ajoute au panier");
    }
    setCart(updatedCart);
    setProductAdded(true);

    if(item.quantity >0 ){
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    
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

  useEffect(()=>{
    if (productAdded) {
      const timeoutId = setTimeout(() => {
        setProductAdded(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [productAdded]);

  const [selected, setSelected] = useState(0);

  function switchItem(index) {
    setSelected(index);
  }

  return (
    <div className={styles.productdetail_main}>
      <div className={styles.productdetail_block}>
        {product ? (
          <>
            <div className={styles.addproduct}>
              {productAdded && 
                <>
                  <Image src={Validity} width={40} height={40} />
                  <p>Le produit a été ajouté au panier</p>
                </>
              }
            </div>
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