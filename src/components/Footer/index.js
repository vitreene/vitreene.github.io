import React from "react"
import { Link } from "phenomic"
import Svg from "react-svg-inline"

import styles from "./index.css"

import twitter from '../icones/ico-twitter.svg'
import facebook from '../icones/ico-facebook.svg'
import linkedin from '../icones/ico-linkedin.svg'
import contact from '../icones/ico-contact.svg'
import apropos from '../icones/ico-apropos.svg'

const Footer = () => (
    <footer className={null}>
        <section className={styles.footer}>
            <div className={styles.socialLinks}>
                <p className="ico-item item-twitter">
                    <a href="https://twitter.com/mac_rve" target="blank">
                        <Svg svg={twitter} cleanup/>
                    </a>
                </p>
                <p className="ico-item item-linkedIn">
                    <a href="https://fr.linkedin.com/in/vitreene">
                        <Svg svg={linkedin} cleanup/>
                    </a>
                </p>
                <p className="ico-item item-facebook">
                    <a href="https://facebook.com/rve.mac">
                        <Svg svg={facebook} cleanup/>
                    </a>
                </p>
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
            </section>
            <p>
                <a href={process.env.PHENOMIC_HOMEPAGE} className={styles.phenomicReference}>
                    {"Website generated with "}
                    <span className={styles.phenomicReferenceName}>
                        {`<${process.env.PHENOMIC_NAME} />`}
                    </span>
                </a>
            </p>
    </footer>
)

export default Footer

/*
<footer className="footer-links">
  <!-- <aside>templates/partials/footer.html</aside> -->
  <section className="social-links">
      <p className="ico-item item-twitter"><a href="https://twitter.com/mac_rve" target="blank"> <span className="ico-twitter"></span></a></p>
      <p className="ico-item item-linkedIn"><a href="https://fr.linkedin.com/in/vitreene"><span className="ico-linkedIn"></span></a></p>
      <p className="ico-item item-facebook"><a href="https://facebook.com/rve.mac"><span className="ico-facebook"></span></a></p>
  </section>
  <section className="site-links">
      <p className="ico-item item-apropos"><a href="/about"><span className="ico-apropos"></span>A propos</a></p>
      <p className="ico-item item-contact"><a href="#contact-modal"> <span className="ico-contact"></span>Contact</a></p>
    </section>

  </footer>
*/
