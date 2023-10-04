import React, { Component } from 'react'; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
import styles from '../styles/Carousel.module.css';
import carousel from '../public/uploads/upload_6a2837ce0370c76f0b1700855442a203.png';
import Image from 'next/image';

export default class NextJsCarousel extends Component { 
	render() { 
		return ( 
			<div className={styles.carousel}> 
			<Carousel className={styles.text}> 
				<div> 
					<Image src={carousel} alt="image1" width={600} height={600}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={carousel} alt="image2" width={600} height={600}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={carousel} alt="image3" width={600} height={600}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={carousel} alt="image4" width={600} height={600}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div> 
				<div> 
					<Image src={carousel} alt="image5" width={600} height={600}/> 
					{/* <p className="legend">Promotion</p>  */}

				</div>
			</Carousel> 
			</div> 
		); 
	} 
};
