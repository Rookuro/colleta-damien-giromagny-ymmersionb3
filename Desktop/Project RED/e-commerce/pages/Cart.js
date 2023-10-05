import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/Cart.module.css';
import Shopping from '../components/shopping';
import Trash from './/../public/poubelle-de-recyclage.png';
import React, { useState, useEffect } from 'react';
import Component from './Composants';
import { useRouter } from 'next/router';
const API_URL = "https://api-adresse.data.gouv.fr/search/?q=";


export default function Cart (){

        const initialState = [];
        const [cart, setCart] = useState(initialState);
        const [addressData, setAddressData] = useState(null);
        const [inputValue, setInputValue] = useState('');
        const [outputValue, setOutputValue] = useState('');
        const API_URL = 'https://api-adresse.data.gouv.fr/search/?q=';
        const router = useRouter();
      
        useEffect(() => {
          const cartData = JSON.parse(localStorage.getItem("cart"));
          if (cartData) {
            setCart(cartData);
          }
        }, []);

        useEffect(() => {
            setOutputValue(inputValue);
        }, [inputValue]);

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
          };

        
        useEffect(() => {
            if(inputValue !== '' && inputValue.length > 3){
                fetch(API_URL + inputValue)
                    .then(response => response.json())
                    .then((label) => {console.log(label)})
            }
        }, [inputValue]);
        const displayedNames = [];
        const handleCommanderClick = () => {

            router.push('/checkout'); 
          };

    return(
        <>
            <div>
                <div className={styles.title_block}>
                    <h1>
                        Panier
                    </h1>
                </div>
                <div className={styles.main_block}>
                    <div className={styles.left_block}>
                        <div className={styles.header}>
                            <ul>
                                <li className={styles.list}></li>
                                <li className={styles.list}>Article</li>
                                <li className={styles.list}>Quantité</li>
                                <p>Nombre d'articles au total : {cart.length}</p>
                                <div className={styles.component}>
                                    {cart.map((test, index) => {
                                        if (!displayedNames.includes(test.name)) {
                                            displayedNames.push(test.name);
                                            return (
                                                <>
                                                    <Image 
                                                        key={index}
                                                        src={`/uploads/${test.urlImage[0]}`} 
                                                        alt={test.name} 
                                                        width={100}
                                                        height={100}
                                                    />
                                                    <p key={index}>{test.quantity}</p>
                                                    <p key={index}>{test.price}</p>
                                                    <p key={index}>{test.name}</p>

                                                </>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <li className={styles.list}>Prix</li>
                                <li className={styles.list}>
                                    <Image src={Trash} width={30} height={30} alt="Trash"/>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.components_block}>
                            <Shopping />
                        </div>
                    </div>
                    <div className={styles.right_block}>
                        <form>
                            <h4>Adresse de Livraison</h4>
                            <input type='text' value={inputValue} onChange={handleInputChange}/>
                            <select>
                                <option></option>
                            </select>
                            <h4>Montant Total :</h4>
                            <p>Un prix quelconque</p>
                            <button className={styles.purchase} onClick={handleCommanderClick}>Commander</button>
                            <div className={styles.discount_block}>
                                    <label>
                                        code promo ?
                                    </label>
                                    <input type="text" placeholder='Entrer code'/>
                                    <button className={styles.discount_button} type='submit'>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}