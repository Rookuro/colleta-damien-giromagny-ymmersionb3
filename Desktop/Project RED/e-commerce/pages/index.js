import Post from './post';
import ProductApiGet from '../components/Api/Products';
// import FileUploader from './FileUploader';
import dynamic from 'next/dynamic';
import Carousel from '../components/Carousel';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import apple from './/../public/apple_premium.png';
import Devolo from './/../public/devolo.png';
import Epos from './/../public/epos.png';
import Intel from './/../public/intel.png';
import Lenovo from './/../public/lenovo.png';
import Dlink from './/../public/d-link.png';
import Facebook from './/../public/facebook.png';
import Instagram from './/../public/instagram.png';
import Pinterest from './/../public/pinterest.png';
import Twitter from './/../public/twitter.png';
import Youtube from './/../public/youtube.png';
import Iphone from './/../public/iPhone_15_Pro_Max.jpg';
import Laptop from './/../public/ordinateur_portable.jpg';
import Ecran from './/../public/ecran_ordinateur.jpg';
import Pcfixe from './/../public/ordinateur_fixe.jpg';
import Tv from './/../public/TV.jpg';
import Son from './/../public/casque.jpg';
import Tablette from './/../public/tablette.jpg';
import Component from './/../public/composants.jpg';
import RecommendedProducts from '../components/RecommendedProducts';


export default function Home() {
  return (
    <div>
      <Carousel />
      <div className={styles.home_block_information_categories_main}>
        <div className={styles.home_information_categories_block1}>
          <div className={styles.home_information_categories_block1_mini1}>
            <h3>Apple</h3>
            <Image src={Iphone} width={100} height={100}/>
          </div>
          <div className={styles.home_information_categories_block1_mini2}>
            <h3>PC Portables</h3>
            <Image src={Laptop} width={100} height={100}/>
          </div>
          <div className={styles.home_information_categories_block1_mini3}>
            <h3>Périphériques</h3>
            <Image src={Ecran} width={100} height={100}/>
          </div>
          <div className={styles.home_information_categories_block1_mini4}>
            <h3>PC LDLC</h3>
            <Image src={Pcfixe} width={100} height={100}/>
          </div>
        </div>
        <div className={styles.home_information_categories_block2}>
          <div className={styles.home_information_categories_block2_mini1}>
            <h3>TV</h3>
            <Image src={Tv} width={100} height={100}/>
          </div>
          <div className={styles.home_information_categories_block2_mini2}>
            <h3>Son</h3>
            <Image src={Son} width={100} height={100}/>
          </div>
          <div className={styles.home_information_categories_block2_mini3}>
            <h3>Tablettes</h3>
            <Image src={Tablette} width={100} height={100}/>
          </div>
          <div className={styles.home_information_categories_block2_mini4}>
            <h3>Composants PC</h3>
            <Image src={Component} width={100} height={100}/>
          </div>
        </div>
      </div>
      <div className={styles.home_block_main}>
        <div className={styles.home_block1}>
          <div className={styles.home_block1_mini_main}>
            <div className={styles.home_block1_mini1}>
            <a href=""><Image src={apple} width={200} height={200}/></a>
            <a href=""><Image src={Devolo} width={200} height={200}/></a>
            <a href=""><Image src={Epos} width={200} height={200}/></a>
            </div>
            <div className={styles.home_block1_mini2}>
            <a href=""><Image src={Intel} width={200} height={200}/></a>
            <a href=""><Image src={Lenovo} width={200} height={200}/></a>
            <a href=""><Image src={Dlink} width={200} height={200}/></a>
            </div>
          </div>
        </div>
          <div className={styles.home_block2}>
            <div className={styles.home_block2_newsletter}>
              <div className={styles.home_block2_newsletter_mini}>
                <h3>Newsletter</h3>
                <h4>PC Components</h4>
                <input type="text" id="name" name="name" placeholder="Votre email" />
              </div>
              <div className={styles.home_block2_mini_main}>
                <div className={styles.home_block2_mini1}>
                <a href=""><Image src={Facebook} width={75} height={75}/></a>
                <a href=""><Image src={Instagram} width={75} height={75}/></a>
                <a href=""><Image src={Pinterest} width={75} height={75}/></a>
                </div>
                <div className={styles.home_block2_mini2}>
                <a href=""><Image src={Twitter} width={75} height={75}/></a>
                <a href=""><Image src={Youtube} width={75} height={75}/></a>
                </div>
              </div>
          </div>
        </div>
        <RecommendedProducts />
      </div>
      {/* <ProductApiGet /> */}
      {/* <h1>Téléchargement de photo</h1> */}
      {/* <FileUploadNoSSR /> */}
      {/* <Post /> */}
    </div>
  );
}
