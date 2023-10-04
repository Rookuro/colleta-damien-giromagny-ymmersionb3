import Footer from '../components/footer';
import Navbar from '../components/navbar';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default MyApp;
