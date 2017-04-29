import React, { PropTypes } from "react"

import PortfolioSujetsPreview from "../PortfolioSujetsPreview"

import styles from "./index.css"

const PortfolioSujetsList = ({ pages }) => {
  return (
    <div>
        {
            pages.length
            ? (
                <ul className={ styles.list }>
                    {
                        pages.map((page) => (
                            <li
                                key={ page.titre }
                                className={styles.item}>
                                <PortfolioSujetsPreview { ...page } />
                            </li>
                        ))
                    }
                </ul>
            )
      : "No posts yet."
    }
    </div>
  )
}

PortfolioSujetsList.propTypes = {
  pages: PropTypes.array.isRequired,
}

export default PortfolioSujetsList
