import { useEffect, useState } from 'react';

const Total = () => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
      const newTotalItems = cartData.reduce((total, item) => total + item.quantity, 0);
      setTotalItems(newTotalItems);
    }
  }, []);

  return (
    <div>
      <p>Total Items: {totalItems}</p>
    </div>
  );
};

export default Total;
