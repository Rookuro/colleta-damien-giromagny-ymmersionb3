import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  const handleButton = () => {
    router.push('/');
  };

  return (
    <>
      <div className="checkout">
        <h1>Thank you for your order</h1>
        <p>We are currently processing your order and will send you a confirmation email shortly</p>
        <div>
          <button className="button is-black custom-btn submit" onClick={handleButton}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
