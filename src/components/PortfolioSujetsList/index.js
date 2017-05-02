import React, { PropTypes } from "react"

import PortfolioSujetsPreview from "../PortfolioSujetsPreview"

import styles from "./index.css"

const PortfolioSujetsList = ({ pages }) => {
    
    function makeLinks(page, index) {
        const precLink = (index > 0) &&  pages[index-1].__url;
        const nextLink = (index < pages.length-1) && pages[index+1].__url;
        // console.log('page index =', index, pages.length, precLink, nextLink);
        return {
            precLink,
            nextLink 
        }

    }

  return (
    <div>
        {
            pages.length
            ? (
                <ul className={ styles.list }>
                    {
                        pages.map((page, index) => {
                            const theLinks = makeLinks(page, index);
                         
                            return (
                            <li
                                key={ page.id }
                                className={styles.item}>
                                <PortfolioSujetsPreview 
                                    { ...{...page, ...theLinks}} 
                                    />
                            </li>
                            )
                        })
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
