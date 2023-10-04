import { Component } from "react";
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Logo from './/../public/logo-computer.png';
import Cart from './/../public/chariot.png';
import Search from './/../public/loupe.png';
import Login from './login';

class Navbar extends Component{
    render(){

        return(
            <nav>
                <div className={styles.navbarItems}>
                    <div className={styles.logo_block}>
                        <a href="/">
                            <Image src={Logo} alt="logo-computer" />
                        </a>
                    </div>
                    <div className={styles.searchbar_block}>
                        <form>
                            <input type="text" name="searchbar" placeholder="Recherche"/>
                                <button className={styles.button_style} type="submit">
                                    <Image src={Search} alt="Search"/>
                                </button>
                            </form>
                    </div>
                    <div className={styles.cart_block}>
                        <a href="../post.js" className={styles.cart_button}>
                            <Image src={Cart} alt="Cart"/>
                        </a>
                    </div>
                    <Login />
                </div>
                <div className={styles.block_navbar}>
                    <ul>
                        <li className={styles.block_navbar_welcome}><a href="/">Accueil</a></li>
                        <li><a href="/Composants">Composants</a></li>
                        <li><a href="#">Promo</a></li>
                        <li><a href="#">Aide</a></li>    
                    </ul>
                    </div>
            </nav>
        )
    }
}
export default Navbar;