import React, { PropTypes } from "react"
import Svg from "react-svg-inline"
import {Link} from "phenomic"

import styles from "./index.css"

import accolade from '../../icones/accolade.svg'
import etoile from '../../icones/etoile.svg'
// import thermometre from '../../icones/thermometre.svg'
// import thermometreIndicateur from '../../icones/thermometre-indicateur.svg'

const Text =  ()=> (
    <div className={ styles.textOffre }>
        <p>Un site Web est un investissement qui procure plus de visibilité pour votre entreprise, et permet d’améliorer la relation à vos clients.</p>
        <p>Il doit être rapide à charger, être bien référencé, facile à utiliser et  disponible sur tout type d’appareil.</p>
        <p>C’est ce que je vous propose de réaliser ensemble.</p>
    </div>
);

const Cta = ()=> (
    <div className={ styles.blocCta }>
        <div className={ styles.blocCtaTexte }>
            <p className={ styles.ctaTexte }>Je suis actuellement disponible pour de nouveaux projets.</p>
            <p className={ styles.ctaTexte }>Rencontrons-nous !</p>
            
            <Link to={"/contact"}
            className={ styles.boutonCta }>
                Prendre rendez&#x2011;vous
            </Link>
        </div>
    </div>
);

const Competences = ()=> (
    <div className={styles.argu}>
     
         <Svg svg={etoile} 
            component="span"
            className={ styles.arguStar}
            cleanup/> 

        <h3 className={styles.arguTitre}>
            Développer  <br/>votre communication visuelle.
        </h3>
         <p className={styles.arguTexte}>
            Je conçois  et réalise avec vous les éléments de votre image de marque, adaptés aux supports internet, imprimés ou signalétique.
        </p>
        <Link to={"/portfolio"}
        className={ styles.arguBouton }>
            Réalisations
        </Link>
    </div>
);

const Realisations = () => (
    <div className={styles.argu}>
        
        <span className={ styles.arguDeuxStars}> 
          <Svg svg={etoile} 
            component="span"
            className={ styles.arguStar}
            cleanup/> 
            &emsp;
          <Svg svg={etoile} 
            component="span"
            className={ styles.arguStar}
            cleanup/> 
        </span>
            
        <h3 className={styles.arguTitre}>
            Construire <br/> votre web.
        </h3>
        <p className={styles.arguTexte}>
            Je crée des sites beaux et accessibles pour les petites sociétés.
Je dessine et fabrique des interfaces, des landing-pages, des sites corporate, et plein d'autres choses. Demandez !
        </p>
        <Link to={"/services"}
        className={ styles.arguBouton }>
            Services
        </Link>
       
    </div>
);

const Offre = (props) => (
        <div className={ styles.offre }>
        <div className={ styles.offrePart }>
            <Text/>
            <Cta/>
        </div>
        <div className={ styles.offrePart }>
            <Svg svg={accolade} 
            component="div"
            className={ styles.accolade}
            cleanup/> 
        </div>
        <div className={ [styles.offrePart, styles.argumentation].join(' ') }>
            <Competences/>
            <Realisations/>
        </div>
            { props.children }
    </div>
)

Offre.propTypes = {
  children: PropTypes.node,
}

export default Offre

/*

        <div className={ styles.blocCtaJauge }>
            <Svg svg={thermometre} 
                className={ styles.blocCtaThermometre } 
                component="div" 
                cleanup/>
            <Svg svg={thermometreIndicateur} 
                className={ styles.blocCtaThermIndicateur } 
                component="div" 
                cleanup/>
        </div>
*/
            