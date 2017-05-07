import React, { PropTypes } from "react"

import Page from "../Page"
import Slider from "../../components/Slider"
import SliderMenu from "../../components/SliderMenu"
import Loading from "../../components/Loading"
import TransitionPage from "../../components/TransitionPage"

import {marques} from "../../../content/portfolio/marques";
import styles from './index.css'

const Portfolios = (props, {toggle}) => {
 const {
    isLoading,
    // __filename,
    __url,
    head,
    // body,
    // header,
    // footer,
    // children,
  } = props;

          // onStart={ () => toggle('isVisible', false) }
          // onStop={ () => toggle('isVisible', true) }
  return (

        <TransitionPage transition="slideInRight" top={false}>

        <Slider
          diapos={head.files}
          id={head.id}
          modele={head.modele}
          >
          <SliderMenu 
            url={__url} 
            onClick={ () => toggle('isVisible') }
          />
      </Slider>
      

    <Page  { ...props} >
      {
        marques[head.marque] && (
          <div className={styles.portfolioMarque}>
              <h3 className={styles.portfolioMarqueTitre}>
                La marque&#x2008;:&#x2000;<em className={styles.portfolioMarqueNom}>{head.marque}</em> 
              </h3>
              <p className={styles.portfolioMarqueTexte}>
                {marques[head.marque]}
              </p>
          </div>
        )
      }
    </Page>
        </TransitionPage>


  )
}

Portfolios.propTypes = {
    // props: PropTypes.any,
    isLoading: PropTypes.bool,
    // __filename: PropTypes.string,
    __url: PropTypes.string,
    head: PropTypes.object.isRequired,
    // body: PropTypes.string,
}

Portfolios.contextTypes = {
    toggle: PropTypes.func,
};

export default Portfolios