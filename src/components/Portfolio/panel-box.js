import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Marked from 'marked'

import CloseBox from '../CloseBox'
import CarrouselPanel from './CarouselPanel'


const PanelBox = (props) => {
    const {id, details, setTogglePanel} = props;

    function closePanel(){
        setTogglePanel('close');
    }

    function scroll(e) {
        if (!e) return;
        const element = document.getElementById("my-scroll");
        const to =  e.offsetTop -16;
        const duration = 300;
        scrollTo(element, to, duration) ;
    }

    const classPanel = 'panel-inner ' + details.modele ;
    const transitionsOptions = {
      transitionName: "open-panel",
      transitionAppear: true,
      transitionLeave: true,
      transitionAppearTimeout: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300
    };

    return (
        <div
            id="panel"
            key={id}
            ref={ scroll }
            className="panel"
        >
            <ReactCSSTransitionGroup
                {...transitionsOptions}
                component="div"
                className={classPanel}
            >
                <CloseBox
                    onClick={closePanel}
                    className="panel-close"
                />

                <h2 className="panel-titre">{details.titre}</h2>

                <div className="panel-content">
                    <CarrouselPanel
                        diapos={details.files}
                        id={details.id}
                        modele={details.modele}>
                        <article
                            className="panel-texte--contexte"
                            dangerouslySetInnerHTML={rawMarkup(details.intro)} />
                    </CarrouselPanel>

                    <article
                        className = "panel-texte-commentaire"
                        dangerouslySetInnerHTML =
                        {rawMarkup(details.texte)}
                    />
                </div>
            </ReactCSSTransitionGroup>
        </div>
            );
}

PanelBox.propTypes = {
    id: PropTypes.string,
    details: PropTypes.object,
    setTogglePanel: PropTypes.func,
}

export default PanelBox ;

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    const difference = to - element.scrollTop;
    const perTick =  Math.round ( difference / duration * 10) ;

    requestAnimationFrame(
        () => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
            }
    )
}


  function rawMarkup(txt) {
    const markup = Marked(txt.toString(), {sanitize: true});
    return { __html: markup };
  }
