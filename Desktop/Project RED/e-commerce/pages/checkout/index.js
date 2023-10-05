import { useContext, useState, useEffect } from 'react';
// import { CartContext } from '../../context/cart-context';
import StripeCheckout from '../../components/StripeCheckout';

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  // Fonction pour calculer le prix total
  function calculateTotalPrice(cart) {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    return totalPrice;
  }

  // Fonction pour calculer la quantité totale
  function getTotalItemsInCart() {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) return 0;

      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      return totalItems;
    }
    return 0;
  }

  return (
    <>
      <div className="checkout">
        <h2>Checkout Summary</h2>
        <h3>{`Total Items: ${getTotalItemsInCart()}`}</h3>
        <h4>{`Amount to Pay: $${calculateTotalPrice(cart).toFixed(2)}`}</h4>
      </div>
      <StripeCheckout />
    </>
  );
}

