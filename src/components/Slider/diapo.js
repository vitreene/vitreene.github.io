import React, {PropTypes} from "react"
import Marked from 'marked'

import styles from "./diapo.css"
// ajouter la gestion du touch : 
// https://github.com/voronianski/react-swipe
// ou https://github.com/oliviertassinari/react-swipeable-views
// https://github.com/leandrowd/react-responsive-carousel

export const Diapo = ( props, {metadata: {pkg}} ) => {
    const {file, active, action} = props;
    // console.log('Diapo',  props);

    const stylesAction = action 
    ? action
        .split(' ')
        .map( a => styles[a] && styles[a] )
    : [];
    
    const url = 'url(' + pkg.homepage + 'assets/portfolio2/' + file + ')';
    const bgImg = {backgroundImage: url };
    const styleImg = [styles.cadreImg, ...stylesAction].join(' ');

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
    action: PropTypes.string,
    file: PropTypes.string,
}
Diapo.contextTypes = {
  metadata: PropTypes.object.isRequired,
}


const renderer = new Marked.Renderer();
renderer.paragraph =  (text) => ( 
    '<p class=' + styles.cadreLegendeText + '> ' + text + '</p>'
    );


function rawMarkup(text) {
  const markup = (text)
      ? Marked(text.toString(), {renderer, sanitize: true})
      : '';
  return { __html: markup };
}

export const Legende = ({legende}) => (
    <div className={styles.cadreLegende}
        dangerouslySetInnerHTML={ legende && rawMarkup(legende)} />
    );

Legende.propTypes = {
    legende: PropTypes.string,
}
