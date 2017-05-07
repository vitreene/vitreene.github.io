import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import PortfolioSujetsList from "../../components/PortfolioSujetsList"

import styles from "./index.css"


const SujetsPortfolio = (props, { collection }) => {
  const portfolioList = enhanceCollection(collection, {
    filter: { collection: 'portfolio' },
    sort: "id",
    reverse: false,
  })
  return (
    <PortfolioSujetsList pages={ portfolioList } />
  )
}

// SujetsPortfolio.propTypes = {
//   head: PropTypes.object,
// }

SujetsPortfolio.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default SujetsPortfolio
