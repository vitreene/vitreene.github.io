import React, { PropTypes } from "react"
import Svg from "react-svg-inline"

import styles from "./index.css"

// import accolades from '../../icones/accolades.svg'
import thermometre from '../../icones/thermometre.svg'

const Text =  ()=> (
    <div className={ styles.textOffre }>
        Un site Web est un investissement qui procure plus de visibilité pour votre entreprise, et permet d’améliorer la relation à vos clients.
        Il doit être rapide à charger, être bien référencé, facile à utiliser et  disponible sur tout type d’appareil.
        C’est ce que je vous propose de réaliser ensemble.
    </div>
);

const Cta = ()=> (
    <div className={ styles.blocCta }>

        <div className={ styles.blocCtaJauge }>
            <Svg svg={thermometre} cleanup/>
        </div>
        <div className={ styles.blocCtaTexte }>
            Je suis actuellement disponible pour de nouveaux projets.
            Rencontrons-nous !
        </div>
        <div className={ styles.boutonCta }>
            CTA
        </div>
    </div>
);

        const Offre = (props) => (
        <div className={ styles.offre }>
            <Text/>
            <Cta/>
            { props.children }
        </div>
)

Offre.propTypes = {
  children: PropTypes.node,
}

export default Offre
