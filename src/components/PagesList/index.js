import React, { PropTypes } from "react"

import PagePreview from "../PagePreview"
import PageRefPreview from "../PageRefPreview"

import styles from "./index.css"

const styleList = {
    articles: {
        list: 'list',
        item: 'item'
    },
    reference: {
        list: 'ref-list',
        item: 'ref-item'
    },
}
// cards avec flexbox
// http://www.lottejackson.com/learning/an-equal-height-grid-using-flexbox
const PagesList = ({ pages, cat }) => {
    
  return (
    <div>
        {
            pages.length
            ? (
                <ul className={ styles[ styleList[cat].list ] }>
                    {
                        pages.map((page) => (
                            <li
                                key={ page.title }
                                className={styles[ styleList[cat].item ]}>
                                { (cat === 'articles') && 
                                <PagePreview { ...page } cat={cat}/>
                                }
                                { (cat === 'reference') && 
                                <PageRefPreview { ...page } cat={cat}/>
                                }
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
  cat: PropTypes.string,
}

export default PagesList
