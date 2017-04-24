import React, {PropTypes} from "react"
import {Link} from "phenomic"

// import Button from "../../components/Button"

import styles from "./index.css"

const PagePreview = (page) => {
    // console.log('PAGE', page);
    const {__url, title, /*date, description,*/ excerpt} = page;
    const {photo, photoAlt, text } = excerpt;
    // const pageDate = date
    //     ? new Date(date)
    //     : null;
    const url = process.env.PHENOMIC_USER_URL + 'assets/' + photo;
    const bgImg = {backgroundImage: 'url(' + url + ')' };

    return (
        <div className={styles.wrapper}>
            <Link to={__url} >
                <div className={styles.paveImg}
                    style={bgImg}
                    alt={photoAlt}/>

                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>
                    {text}
                    {" "}
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

export default PagePreview
