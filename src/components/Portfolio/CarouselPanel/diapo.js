import React, {PropTypes} from "react"
import Marked from 'marked'

export const Diapo = ( props ) => {
    const {file, active} = props;
    const src = require('../../../../content/portfolio/portfolio2/' + file);
    const bgImg = {backgroundImage: 'url(' + src + ')'};
    return (
        <div key={active}
            id={active}
            className="panel-carrousel--cadre-img"
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

export const Legende = ({legende}) => (
    <div className="panel-carrousel--cadre-legende"
        dangerouslySetInnerHTML={ legende && rawMarkup(legende)} />
    );

Legende.propTypes = {
    legende: PropTypes.string,
}


function rawMarkup(txt) {
  const markup = (txt)
      ? Marked(txt.toString(), {sanitize: true})
      : '';
  return { __html: markup };
}

