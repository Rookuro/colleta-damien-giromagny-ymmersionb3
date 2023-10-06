import axios from 'axios';
import Image from 'next/image';
import styles from '../../styles/Cart.module.css';
import Shopping from '../../components/shopping';
import Trash from './/../../public/poubelle-de-recyclage.png';
import React, { useState, useEffect } from 'react';
// import Component from '../Composants';
import { useRouter } from 'next/router';
// import StripeCheckout from '../../components/StripeCheckout';
// import { createInputFiles } from 'typescript';

const API_URL = "https://api-adresse.data.gouv.fr/search/?q=";


export default function Cart (){

        const initialState = [];
        const [cart, setCart] = useState(initialState);
        const [addressData, setAddressData] = useState(null);
        const [inputValue, setInputValue] = useState('');
        const [outputValue, setOutputValue] = useState('');
        const API_URL = 'https://api-adresse.data.gouv.fr/search/?q=';
        const router = useRouter();
        const [carItems, setItems] = useState();    
        const [selectedRegion, setSelectedRegion] = useState('');  
        
        
        
        useEffect(() => {
          const cartData = JSON.parse(localStorage.getItem("cart"));
          if (cartData) {
            setCart(cartData);
          }
          const cart = JSON.parse(localStorage.getItem("cart"));
          if(cart != null){
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            setItems(totalItems);
          }
        }, []);
        const handleNameChange = event => {
            setInputValue(event.target.value);
            console.log("size : " + event.target.value);
            if(event.target.value.length > 0){
                callApi();
            }
         };

         function MyComponent() {
            const handleRefreshClick = () => {
                window.location.reload();
            };
        }

        const [address, setAddress] = useState([]);
        const adressLocale = [];
        function callApi(){
            if(inputValue.length > 0){
                fetch(API_URL + inputValue)
                .then((response) => response.json())
                .then((data) => {
                        for (let i = 0; i < 4; i++) {
                        adressLocale.push(
                            data.features[i].properties.label);
                            // console.log("ma data : " + adressLocale);
                            setAddress(adressLocale);
                        }} 
                ).catch(rejected => {
                    console.log(rejected);
                });

                
            }
        }
        useEffect(() => {
            if(inputValue != ''){
                callApi();
            }

        }, []);

        const handleRegionChange = (e) => {
            const selectedValue = e.target.value;
            setSelectedRegion(selectedValue);
            setInputValue(selectedValue);
          };

        const displayedNames = [];

  function calculateTotalPrice(cart) {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    return totalPrice;
  }

//   function getTotalItemsInCart() {
//     if (typeof window !== 'undefined') {
//       const cart = JSON.parse(localStorage.getItem("cart"));
//       if (!cart) return 0;

//       const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//       return totalItems;
//     }
//     return 0;
//   }
    function clearCart(){
        localStorage.clear();
    }
    const getElementsfromLocalStorage = () => {
        let elements = [];
        if (localStorage.getItem('cart')) {
            elements = JSON.parse(localStorage.getItem('cart'));
        }
        return elements;
    };
    const removeElementLocalStorage = (name) => {
        let elements = getElementsfromLocalStorage();
        elements = elements.filter(element => element.name !== name);
        localStorage.setItem('cart', JSON.stringify(elements));
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
                            <div className={styles.header_context}>
                            <ul>
                                <li className={styles.list}></li>
                                <li className={styles.list}>Article</li>
                                <li className={styles.list}>Quantité</li>
                                {/* <p>Nombre d'articles au total : {cart.length}</p> */}
                                <li className={styles.list}>Prix</li>
                                <li className={styles.list}  onClick={() => clearCart}>
                                    <Image src={Trash} width={30} height={30} alt="Trash"/>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className={styles.component}>
                                    {cart.map((element, index) => {
                                        if (!displayedNames.includes(element.name)) {
                                            displayedNames.push(element.name);
                                            return (
                                                <div className={styles.subcomponent}>
                                                    <Image 
                                                        key={index}
                                                        src={`/uploads/${element.urlImage[0]}`} 
                                                        alt={element.name} 
                                                        width={100}
                                                        height={100}
                                                    />
                                                    <h3 key={index}>{element.name}</h3>
            
                                                    <p key={index}>{element.quantity}</p>
                                                    <p key={index} className={styles.component_product_price}>{element.price} €</p>
                                                    <input type='button' value="X" onClick={() => removeElementLocalStorage(element.name)}></input>

                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                        <div className={styles.components_block}>
                            <Shopping />
                        </div>
                    </div>
                    <div className={styles.right_block}>
                        <form>
                            <h4>Adresse de Livraison</h4>
                            <input className={styles.region} type='text' name='input_value' value={inputValue} onChange={handleNameChange}/>
                            
                            <select className={styles.region} value={selectedRegion} onChange={handleRegionChange}>
                                <option className={styles.other_address}>Autres adresses</option>
                                {address.map((region, index) => (
                                    <option key={index}>{region}</option>
                                ))}
                            </select>


                            <h3>{`Nombre Total d'objet dans le panier : ${carItems}`}</h3>
                            <h4>{`Montant Total : €${calculateTotalPrice(cart).toFixed(2)}`}</h4>
                            <input type='button' className={styles.purchase} value='Commander'/>
                            {/* <StripeCheckout /> */}
                            {/* <div className={styles.discount_block}>
                                    <label>
                                        code promo ?
                                    </label>
                                    <input type="text" placeholder='Entrer code'/>
                                    <input className={styles.discount_button} type='submit' value="Ajouter"/>
                            </div> */}
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}