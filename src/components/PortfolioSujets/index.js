import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import PortfolioSujetsList from "../../components/PortfolioSujetsList"

// import styles from "./index.css"
const isClient = typeof window !== "undefined";

const SujetsPortfolio = (props, { collection, metadata: {pkg} }) => {
  const portfolioList = enhanceCollection(collection, {
    filter: { collection: 'portfolio' },
    sort: "id",
    reverse: false,
  });
  loadFirstIMGs(portfolioList, pkg.homepage);

  return (
    <PortfolioSujetsList pages={ portfolioList } />
  )
}

SujetsPortfolio.contextTypes = {
  collection: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
}

export default SujetsPortfolio


// Precharger les 1res images de chaque porfolio

function loadFirstIMGs (sujets, homepage) {
    const srcs = sujets.map( (sujet) => 'url(' + homepage + 'assets/portfolio2/'  + sujet.files[0].file + ')'
    );
    return preloadFirst(srcs);
}

const preloadFirst = (srcs) => srcs.map( newIMG );

function newIMG(src) {
  if (isClient) {
    const img = new Image();
    img.onload = () => img ;
    img.src = src;
  }
}