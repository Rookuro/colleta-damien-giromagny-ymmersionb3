import Footer from '../components/footer';
import Navbar from '../components/navbar';
import '../styles/global.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51LQ9KCJw7SyqSl04gjGGyfeQCgEkEQQhKVTQLzymznyWLCmSrXR6yddolmc8cBckECl7Vv0Inm6FmTe8May8Of5Y002yHeNYI6");

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
        
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default MyApp;
