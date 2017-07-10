import React, {PropTypes} from "react"

import Slider from './Slider/'
import Cinq from './CinqLosanges/'
import styles from "./index.css"

const CarouselLosange = ({titleStyle, ...props}) => (
        <div 
        id='hero-fond'
        className={styles.fondCarousel}>
            <Cinq/>
            <Slider {...props} />
            <h1 className={styles[titleStyle]}
            dangerouslySetInnerHTML={{ __html:props.children  }}/>
        </div>
    );

CarouselLosange.propTypes = {
  children: PropTypes.node,
  titleStyle: PropTypes.string,
  };

export default CarouselLosange
