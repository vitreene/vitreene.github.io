import React, { PropTypes } from "react"

import Page from "../Page"
import Slider from "../../components/Slider"
import SliderMenu from "../../components/SliderMenu"
import Loading from "../../components/Loading"

import {marques} from "../../../content/portfolio/marques";

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

  return (
<div>
  { isLoading 
    ? <Loading />
    : (
        <Slider
          diapos={head.files}
          id={head.id}
          modele={head.modele}
          onStart={ () => toggle('isVisible', false) }
          onStop={ () => toggle('isVisible', true) }
          >
          <SliderMenu 
            url={__url} 
            onClick={ () => toggle('isVisible') }
          />
      </Slider>
      )
  }
    <Page  { ...props} >
      {
        marques[head.marque] && (
          <div className="portfolioMarque">
          <h3> La marque&#x2007;: <em>{head.marque}</em> </h3>
          <p>{marques[head.marque]}</p>
          </div>
        )
      }
    </Page>
</div>

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