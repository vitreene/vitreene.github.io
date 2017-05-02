import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import PortfolioSujetsList from "../../components/PortfolioSujetsList"

import styles from "./index.css"


const SujetsPortfolio = (props, { collection }) => {
  const portfolioList = enhanceCollection(collection, {
    // filter: { layout: "Portfolios" },
    filter: { collection: 'portfolio' },
    sort: "id",
    reverse: false,
  })

  return (
    <div>
        <h2 className={ styles.latestPosts }>
            { "Le Portfolio" }
        </h2>
        <PortfolioSujetsList pages={ portfolioList } />
    </div>
  )
}

SujetsPortfolio.propTypes = {
  // numberOfPosts: PropTypes.number,
}

SujetsPortfolio.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default SujetsPortfolio
