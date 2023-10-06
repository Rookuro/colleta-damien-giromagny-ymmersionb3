import { useRouter } from 'next/router';

export default function Canceled() {
  const router = useRouter();
  const handleButton = () => {
    router.push('/');
  };

  return (
    <>
      <div className="checkout">
        <h1>Payment failed</h1>
        <p>Payment was not successful</p>
        <div>
          <button className="button is-black custom-btn submit" onClick={handleButton}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
