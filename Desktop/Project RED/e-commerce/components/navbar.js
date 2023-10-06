import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Logo from './/../public/logo-computer.png';
import Cart from './/../public/chariot.png';
import Search from './/../public/loupe.png';
import Login from './login';
import Welcome from './/../public/accueil.png'

const Navbar = () => {
    const [cart, setCart] = useState([]);
    const [totalItems, setItems] = useState();
  
    useEffect(() => {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      if (cartData) {
        setCart(cartData);
      }
      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log("mon cart : " + cart);
      if(cart != null){
        const item = cart.reduce((total, item) => total + item.quantity, 0);
        setItems(item);
      }

  

    }, []);
    

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
                <p className={styles.cart_circle}>{totalItems}</p>
            </div>

            <Login />
          </div>
          <div className={styles.block_navbar}>
            <ul className={styles.block_navbar_welcome}>
              <div className={styles.block_home}>
                <li><a className={styles.block_navbar_button} href="/">Accueil</a></li>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill='#FFC632'>
                  <polygon points="0 0, 100 100, 0 100" color='red'/>
                </svg>
             </div>
              <div className={styles.dropdown}>
                <li className={styles.dropdown_button}><a className={styles.block_navbar_button} href="/Composants">Composants</a></li>
                <div className={styles.dropdown_content}>
                  <a href="/Composants/CarteGraphique">Carte Graphique</a>
                  <a href="/Composants/Processor">Processor</a>
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
