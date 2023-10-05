import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Logo from './/../public/logo-computer.png';
import Cart from './/../public/chariot.png';
import Search from './/../public/loupe.png';
import Login from './login';

const Navbar = () => {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      // Récupérez le panier depuis le localStorage lors de l'initialisation du composant
      const cartData = JSON.parse(localStorage.getItem("cart"));
      if (cartData) {
        setCart(cartData);
      }
    }, []);
    
    function getTotalItemsInCart() {
        if (typeof window !== 'undefined') {
            const cart = JSON.parse(localStorage.getItem("cart"));
            if (!cart) return 0;
    
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            return totalItems;
        }
        return 0; // Retourne 0 côté serveur
    }
    

    return (
        <nav>
          <div className={styles.navbarItems}>
            <div className={styles.logo_block}>
              <a href="/">
                <Image src={Logo} alt="logo-computer" />
              </a>
            </div>
            <div className={styles.searchbar_block}>
              <form>
                <input type="text" name="searchbar" placeholder="Recherche" />
                <button className={styles.button_style} type="submit">
                  <Image src={Search} alt="Search" />
                </button>
              </form>
            </div>
            <div className={styles.cart_block}>
                <a href="/Cart" className={styles.cart_button}>
                    <Image src={Cart} alt="Cart" />
                </a>
                <p>{getTotalItemsInCart()}</p> {/* Appeler la fonction pour afficher la quantité */}
            </div>

            <Login />
          </div>
          <div className={styles.block_navbar}>
            <ul className={styles.block_navbar_welcome}>
              <li><a className={styles.block_navbar_button} href="/">Accueil</a></li>
              <div className={styles.dropdown}>
                <li className={styles.dropdown_button}><a className={styles.block_navbar_button} href="/Composants">Composants</a></li>
                <div className={styles.dropdown_content}>
                  <a href="#">Carte Graphique</a>
                  <a href="#">SSD</a>
                  <a href="#">RAM</a>
                </div>
              </div>
              <li><a className={styles.block_navbar_button} href="#">Promo</a></li>
              <li><a className={styles.block_navbar_button} href="#">Aide</a></li>
            </ul>
          </div>
        </nav>
    );
};

export default Navbar;
