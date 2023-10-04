import React, { Component } from 'react';
import Image from 'next/image';
import styles from '../styles/footer.module.css';
import Paypal from './/../public/pay-pal.png';
import Americanexpress from './/../public/american-express.png';
import Mastercard from './/../public/mastercard.png'
import Creditcard from './/../public/carte-de-credit.png';
import LogoComponents from './/../public/logo-computer.png';

export default class Footer extends Component{
    render(){
        return(
            <>
            <footer>
                <div className={styles.footer}>
                    <div className={styles.footer_block1}>
                        <a href='#'>
                            Livraison
                        </a>
                        <a href='#'>
                            Formulaire de rétractation
                        </a>
                        <a href='#'>
                            Cookies et trackers
                        </a>
                        <a href='#'>
                            Signaler un bug
                        </a>
                    </div>
                    <div className={styles.footer_block2}>
                        <a href='#'>
                            Recherche par marque
                        </a>
                        <a href='#'>
                            Plan du site
                        </a>
                        <a href='#'>
                            Vie Privée
                        </a>
                        <a href='#'>
                            CG de vente / CGU
                        </a>
                    </div>
                    <div className={styles.footer_block3}>
                        <div className={styles.footer_block_logo}>
                            <div className={styles.footer_block_name3}>
                                <a href='#'>
                                    Mentions légales
                                </a>
                                <a href='#'>
                                    Soldes
                                </a>
                                <a href='#'>
                                    Paiements sécurisés
                                </a>
                            </div>
                            <div className={styles.logo_computer}>
                                    <Image src={LogoComponents} alt="logo-computer" />
                            </div>
                        </div>
                        <div className={styles.block_img}>
                            <div className={styles.americanexpress_img}>
                                <Image src={Americanexpress} alt="americanexpress" />
                            </div>
                            <div className={styles.mastercard_img}>
                                <Image src={Mastercard} alt="mastercard" />
                            </div>
                            <div className={styles.creditcard_img}>
                                <Image src={Creditcard} alt="creditcard" />
                            </div>
                            <div className={styles.paypal_img}>
                                <Image src={Paypal} alt="paypal" />
                            </div>
                    
                        </div>
                    </div>
                </div>
            </footer>
            </>
        )
    }
}