import { useState, useContext, useRef,useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
// import { CartContext } from '../context/cart-context';
// import { fetchUser } from '../utils/fetchUserDetails';
import getStripe from './getStripe';
import axios from 'axios';

export default function StripeCheckout() {

  const stripe = useStripe();
  const [email, setEmail] = useState(null);

  const handleGuestCheckout = async (e) => {
    e.preventDefault();
    // Récupérez le panier depuis le localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.urlImage],
          },
        },
      };
    });
  }
  const redirectToCheckout = async () => {
    // Récupérez le panier depuis le localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const {
      data: { id },
    } = await axios.post('/api/checkout_sessions', {
      items: cartItems.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      })),
    });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };
  // useEffect(()=>{
  //   const [userInfo] = fetchUser();
  //   setEmail(userInfo);  
  //  },[]) 

  return (
    <>
      <form onSubmit={redirectToCheckout}>
        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email?.email}
            required
            className="nomad-input"
          />
        </div>
        <div className="submit-btn">
          <button type="submit" className="button is-black custom-btn submit">
            Checkout
          </button>
        </div>
      </form>
    </>
  );
}