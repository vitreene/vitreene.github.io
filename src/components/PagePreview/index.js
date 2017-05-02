import React, {PropTypes} from "react"
import {Link} from "phenomic"

import styles from "./index.css"

const PagePreview = (page, {metadata: {pkg}}) => {
    const {__url, title, /*date, description,*/ excerpt} = page;
    const {photo, photoAlt, text } = excerpt;

    const url = 'url(' + pkg.homepage + 'assets/' + photo + ')';
    const bgImg = {backgroundImage: url };

    return (
        <div className={styles.wrapper}>
            <Link to={__url} >
                <div className={styles.paveImg}
                    style={bgImg}
                    alt={photoAlt}/>

                <div className={styles.texte}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.description}>
                        {text}
                        {" "}
                    </div>
                </div>
            </Link>
            <Link to={__url} className={styles.readMore}>
                Lire l'article →
            </Link>
        </div>
    )
}

PagePreview.propTypes = {
    __url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    description: PropTypes.string
}

PagePreview.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default PagePreview
