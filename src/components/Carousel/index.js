import React, {PropTypes} from "react"

import Slider from './Slider/'
import Cinq from './CinqLosanges/'
import styles from "./index.css"

const Carousel = (props) => (
        <div 
        id='hero-fond'
        className={styles.fondCarousel}>
            <Cinq/>
            <Slider {...props} />
            <h1 className={styles.title}>{props.children}</h1>
        </div>
    );

Carousel.propTypes = {
  children: PropTypes.node,
  };

export default Carousel
