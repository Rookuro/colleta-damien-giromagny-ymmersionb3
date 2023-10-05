import React, { Component } from 'react'; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
import styles from '../styles/Carousel.module.css';
import Carousel_img_1 from './/../public/carr_img1.webp';
import Carousel_img_2 from './/../public/carr_img2.webp';
import Carousel_img_3 from './/../public/carr_img3.webp';
import Carousel_img_4 from './/../public/carr_img4.webp';
import Carousel_img_5 from './/../public/carr_img5.webp';
import Image from 'next/image';

export default class NextJsCarousel extends Component { 
	render() { 
		return ( 
			<div className={styles.carousel}> 
			<Carousel className={styles.text}> 
				<div> 
					<Image src={Carousel_img_1} alt="image1" width={1496} height={350}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={Carousel_img_2} alt="image2" width={1496} height={350}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={Carousel_img_3} alt="image3" width={1496} height={350}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={Carousel_img_4} alt="image4" width={1496} height={350}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={Carousel_img_5} alt="image5" width={1496} height={350}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div>
			</Carousel> 
			</div> 
		); 
	} 
};
