import React, { createContext, useReducer } from 'react';
import cartReducer, { sumItems } from './cart-reducer';

export const CartContext = createContext();

let initialState = { cartItems: [], itemCount: 0, total: 0 };

if (typeof window !== 'undefined') {
  const cartFromStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

  initialState = { cartItems: cartFromStorage, ...sumItems(cartFromStorage) };
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const increaseProduct = (product) => dispatch({ type: 'INCREASE_ITEM', payload: product });
  const decreaseProduct = (product) => dispatch({ type: 'DECREASE_ITEM', payload: product });
  const removeProduct = (product) => dispatch({ type: 'REMOVE_ITEM', payload: product });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const contextValues = {
    ...state,
    addProduct,
    increaseProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  };

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
