import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import PortfolioSujetsList from "../../components/PortfolioSujetsList"

import styles from "./index.css"


const SujetsPortfolio = (props, { collection }) => {
  const latestPosts = enhanceCollection(collection, {
    filter: { layout: "Portfolio" },
    sort: "id",
    reverse: false,
  })

  return (
    <div>
        <h2 className={ styles.latestPosts }>
            { "Portfolio" }
        </h2>
        <PortfolioSujetsList pages={ latestPosts } />
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
