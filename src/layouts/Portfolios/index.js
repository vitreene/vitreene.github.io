import React, { PropTypes } from "react"
import {Link} from "phenomic"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import CarrouselPanel from "../../components/Portfolio/CarouselPanel"
import {marques} from "../../../content/portfolio/marques";

// import styles from "./index.css"

const CarrouselMenu = ({url}, { collection }) => {
    const portfolioList = enhanceCollection(collection, {
      filter: { collection: 'portfolio' },
      sort: "id",
      reverse: false,
    })
    .map( page => page.__url);

    const index = portfolioList.findIndex( __url => __url === url );

    const precLink = (index > 0) &&  portfolioList[index-1];
    const nextLink = (index < portfolioList.length-1) && portfolioList[index+1];

    console.log('precLink, nextLink',portfolioList, url,  index, precLink, nextLink)
    return (
      <div className="CarrouselMenu">

          { precLink &&
            <Link to={precLink}> PRECEDENT </Link>
            }

          { nextLink &&
            <Link to={nextLink}> SUIVANT </Link>
            }
      </div>
      )
};

CarrouselMenu.contextTypes = {
  collection: PropTypes.array.isRequired,
}

const Portfolios = (props, {toggle}) => {
//  toggle('isOpen', false); // <- besoin d'un state
 const {
    isLoading,
    __filename,
    __url,
    head,
    body,
    // header,
    // footer,
    // children,
  } = props;

// console.log('Portfolio props : ', props);
// console.log('Portfolio props : footer ', footer);
// console.log('marques : ', marques);

  return (
<div>
    <CarrouselPanel
      diapos={head.files}
      id={head.id}
      modele={head.modele}
      onStart={ () => toggle('isVisible', false) }
      onStop={ () => toggle('isVisible', true) }>
      <CarrouselMenu url={__url} />
  </CarrouselPanel>

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
    props: PropTypes.any,
  // head: PropTypes.object.isRequired,
  // body: PropTypes.string,
}
Portfolios.contextTypes = {
    toggle: PropTypes.func,
};
export default Portfolios

/*
      { 
        head.intro && 
        <p> {head.intro}</p>
      }
      */