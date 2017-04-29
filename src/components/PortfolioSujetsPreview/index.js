import React, {PropTypes} from "react"
import {Link} from "phenomic"

import styles from "./index.css"



const PortfolioSujetsPreview = (page, {metadata: {pkg}}) => {
    const {__url, vignette, vignetteTitre} = page;

    const url = 'url(' + pkg.homepage + 'assets/portfolio2/' + vignette + ')';
    const bgImg = {backgroundImage: url };

    return (
        <div className={styles.wrapper}>
            <Link to={__url} >
                <div className={styles.paveImg}
                    style={bgImg}
                    alt={vignetteTitre}/>

                <div className={styles.title}>
                    {vignetteTitre}
                </div>
            </Link>
            </div>
    )
}

PortfolioSujetsPreview.propTypes = {
    __url: PropTypes.string.isRequired,
    vignette: PropTypes.string.isRequired,
    vignetteTitre: PropTypes.string,
}

PortfolioSujetsPreview.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default PortfolioSujetsPreview
