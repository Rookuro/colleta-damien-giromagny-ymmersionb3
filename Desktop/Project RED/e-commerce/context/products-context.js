import { createContext, useState } from 'react';
import SHOP_DATA from '../API_Products/products.json';

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState(SHOP_DATA);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}