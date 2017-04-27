import React from "react"
// import { Link } from "phenomic"
import Svg from "react-svg-inline"

import styles from "./index.css"

import twitter from '../icones/ico-twitter.svg'
import facebook from '../icones/ico-facebook.svg'
import linkedin from '../icones/ico-linkedin.svg'
// import contact from '../icones/ico-contact.svg'
// import apropos from '../icones/ico-apropos.svg'

const Footer = () => (
    <footer >
        <section className={styles.footer}>
                <p className={styles.icoItemSmall} >
                    <a href="https://twitter.com/mac_rve" target="blank">
                        <Svg svg={twitter} cleanup/>
                    </a>
                </p>
                <p className={styles.icoItemSmall} >
                    <a href="https://fr.linkedin.com/in/vitreene">
                        <Svg svg={linkedin} cleanup/>
                    </a>
                </p>
                <p className={styles.icoItemSmall} >
                    <a href="https://facebook.com/rve.mac">
                        <Svg svg={facebook} cleanup/>
                    </a>
                </p>

      
        </section>
        <p className={styles.madeByPhenomicMention}>
            <a href={process.env.PHENOMIC_HOMEPAGE} className={styles.phenomicReference}>
                {"Ce site est généré par "}
                <span className={styles.phenomicReferenceName}>
                    {`<${process.env.PHENOMIC_NAME} />`}
                </span>
            </a>
        </p>
    </footer>
)

export default Footer

/*
            <div className={styles.socialLinks}>

            </div>

      <div className={styles.siteLinks}>
                <p className="ico-item item-apropos">
                    <Link
                        className={ styles.link }
                        to={ "/about" }
                    >
                        <Svg svg={apropos} cleanup/>
                        A propos
                    </Link>

                </p>
                <p className="ico-item item-contact">
                    <a href="#contact-modal">
                        <Svg svg={contact} cleanup/>
                        Contact
                    </a>
                </p>
            </div>
*/
