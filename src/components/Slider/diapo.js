import React, {PropTypes} from "react"
// import Marked from 'marked'

import styles from "./diapo.css"

export const Diapo = ( props, {metadata: {pkg}} ) => {
    const {file, active, action} = props;
    // console.log('Diapo',  props);

    /*
    si action = noscale, afficher l'image à 100%;
    */
    const stylesAction = action
    .split(' ')
    .map( a => styles[a] && styles[a] );
    
    const url = 'url(' + pkg.homepage + 'assets/portfolio2/' + file + ')';
    const bgImg = {backgroundImage: url };
    const styleImg = [styles.cadreImg, ...stylesAction].join(' ');

    // const src = require('../../../../content/portfolio/portfolio2/' + file);
    // const bgImg = {backgroundImage: 'url(' + src + ')'};
    return (
        <div key={active}
            id={active}
            className={styleImg}
            style={bgImg}
        >
        </div>
    );
}

Diapo.propTypes = {
    diapo: PropTypes.object,
    duree: PropTypes.number,
    active: PropTypes.number,
    legende: PropTypes.string,
    file: PropTypes.string,
}
Diapo.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export const Legende = ({legende}) => (
    <div className={styles.cadreLegende}>
        {legende}
    </div>
    );

Legende.propTypes = {
    legende: PropTypes.string,
}

/*
export const Legende = ({legende}) => (
    <div className={styles.cadreLegende}
        dangerouslySetInnerHTML={ legende && rawMarkup(legende)} />
    );

function rawMarkup(txt) {
  const markup = (txt)
      ? Marked(txt.toString(), {sanitize: true})
      : '';
    //   console.log('rawMarkup', markup);
  return { __html: markup };
}
*/
