/*
props :
- la liste des vues
la duree d'un slide
*/

import React, {PropTypes, Component} from "react"
import Marked from 'marked'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Plots from './plots'
// import styles from "./index.css"

export default class CarouselPanel extends Component {
    static propTypes = {
        children: PropTypes.node,
        diapos: PropTypes.array, // les diapos
        duree: PropTypes.number, //  durée d'une diapo, en secondes
        id: PropTypes.string, //  id du carousel
        modele: PropTypes.string, //  modele d'affichage
    }
    static defaultProps = {
        diapos: [],
        duree: 4,
    }
    state = {
        active: -1,
    }

    constructor(props) {
        super(props);
        this.prez = null;
        this.timer = this.timer.bind(this);
    }

    componentWillMount() {
        this.timer();
    }

    componentWillUnmount() {
        clearTimeout(this.prez);
    }

    timer() {
        const {duree} = this.props;
        const quantite = this.props.diapos.length ;
        const active = (this.state.active + 1) % quantite;
        this.setState({active});
        this.prez = setTimeout(this.timer, duree * 1000);
    }

    render() {
        const {children, duree, diapos} = this.props;
        const {active} = this.state;

        const props = {
            ...diapos[active],
            duree,
            active
        };

        // console.log('CarouselPanel', props, active);

        const diapo =  (<Diapo key={active} {...props}/>);
        const current = active;
        const count = diapos.length;
        const transitionsOptions = {
          transitionName: "cross-fade",
          transitionAppear: true,
          transitionAppearTimeout: 500,
          transitionEnterTimeout: 1000,
          transitionLeaveTimeout: 1000
        };

        return (
                <div id="panel-carrousel"
                    className={"panel-carrousel"}>
                    <ReactCSSTransitionGroup {...transitionsOptions}
                        component="div"
                        className="panel-carrousel--cadre"
                    >
                        {diapo}
                    </ReactCSSTransitionGroup>
                    <Plots {...{current, count}}/>
                    {children}
                </div>
                    );
                }
            }

const Diapo = ( props ) => {
    const {legende, file /*, duree*/, active} = props;
    const src = require('../../../../content/portfolio/portfolio2/' + file);
    const bgImg = {backgroundImage: 'url(' + src + ')'};
    return (
        <div  key={active}
            id={active}
            className="panel-carrousel--cadre-img"
            style={bgImg}
        >
            <Legende {...{legende}} />
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

/*
const Img = (props) => (
         <img
             src={props.src}
             alt={props.legende}
             className="panel-cadre-img"
         />
   );

Img.propTypes = {
   src: PropTypes.string,
   alt: PropTypes.string,
   // imgClass: PropTypes.string,
   // start: PropTypes.func,
   // enter: PropTypes.func,
   // leave: PropTypes.func,
};

*/

const Legende = (props) => {
    const {legende} = props;
    // console.log('Legende', props);
    if (!legende) return null;
    const txt = rawMarkup(legende);
    return (
    <div className="panel-carrousel--cadre-legende"
        dangerouslySetInnerHTML={txt} />
    );
}

Legende.propTypes = {
    legende: PropTypes.string,
}


function rawMarkup(txt) {
  const markup = (txt) ? Marked(txt.toString(), {sanitize: true}) : '';
  return { __html: markup };
}
