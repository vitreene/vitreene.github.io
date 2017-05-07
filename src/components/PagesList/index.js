import React, { PropTypes } from "react"

import PagePreview from "../PagePreview"

import styles from "./index.css"

// cards avec flexbox
// http://www.lottejackson.com/learning/an-equal-height-grid-using-flexbox
const PagesList = ({ pages }) => {
  return (
    <div>
        {
            pages.length
            ? (
                <ul className={ styles.list }>
                    {
                        pages.map((page) => (
                            <li
                                key={ page.title }
                                className={styles.item}>
                                <PagePreview { ...page } />
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

PagesList.propTypes = {
  pages: PropTypes.array.isRequired,
}

export default PagesList
