import React, { PropTypes } from "react"
import {Link} from "phenomic"
import Svg from "react-svg-inline"
import enhanceCollection from "phenomic/lib/enhance-collection"

import flecheD from "../../components/icones/fleche-droite.svg"
import flecheG from "../../components/icones/fleche-gauche.svg"
import logo from "../../components/icones/vitreene-logo.svg"
import close from "../../components/icones/close.svg"

import styles from "./index.css"

const SliderMenu = ({url, onClick}, { collection }) => {
    const portfolioList = enhanceCollection(collection, {
      filter: { collection: 'portfolio' },
      sort: "id",
      reverse: false,
    })
    .map( page => page.__url);
    const index = portfolioList.findIndex( __url => __url === url );
    const precLink = (index > 0) &&  portfolioList[index-1];
    const nextLink = (index < portfolioList.length-1) && portfolioList[index+1];
    return (
      <div className={styles.sliderMenu}>
          { precLink &&
            <Link to={precLink} className={styles.sliderMenuLink}>
              <Svg svg={flecheG} cleanup/> 
            </Link>
            }
          { nextLink &&
            <Link to={nextLink} className={styles.sliderMenuLink}>
              <Svg svg={flecheD} cleanup/> 
            </Link>
            }
          <Link to={"/portfolio"} className={styles.sliderMenuLink}>
            <Svg svg={close} cleanup/> 
            </Link>
          <button onClick={onClick} className={styles.sliderMenuHomeLink}>
              <Svg svg={logo}  cleanup/> 
            </button>
      </div>
      )
};

SliderMenu.contextTypes = {
  collection: PropTypes.array.isRequired,
}

SliderMenu.propTypes = {
    url: PropTypes.string,
    onClick: PropTypes.func,
}

export default SliderMenu