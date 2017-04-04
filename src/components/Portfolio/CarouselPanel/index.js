import React, {PropTypes, Component} from "react"
import Marked from 'marked'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Plots from './plots'

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
        active: 0,
        pause: 'off'
    }

    constructor(props) {
        super(props);
        this.prez = null;
        this.timer = this.timer.bind(this);
        this.play = this.play.bind(this);
        this.aller = this.aller.bind(this);
        this.keypressed = this.keypressed.bind(this);
    }

    componentWillMount() {
        this.timer(0);
    }

    componentWillUnmount() {
        clearTimeout(this.prez);
    }

    timer(aller = this.state.active) {
        const current = aller + (this.state.pause ? 0 : 1);
        const {duree} = this.props;
        const quantite = this.props.diapos.length ;
        const active = (current) % quantite;
        this.setState({active});
        this.prez = setTimeout(this.timer, duree * 1000);
    }

    play(event) {
        const pause = {
            on: false,
            off: true,
            toggle: !this.state.pause
        };
        this.setState({ pause: pause[event] });
    }

    aller(event){
        clearTimeout(this.prez);
        const active = Number( event.target.id.split('plots')[1] );
        this.timer(active);
    }

    keypressed(event) {
        const char = {
          '37' : -1, // fleche gauche
          '39' : 1 // fleche droite
        };
        // console.log('KEY', event.keyCode, char[event.keyCode] );
        clearTimeout(this.prez);
        const active = char[event.keyCode] + this.state.active || 0;
        this.timer(active);
    }

    render() {
        const {children, duree, diapos} = this.props;
        const {active} = this.state;
        const actions = {aller: this.aller, play: this.play};
        // const active = 1;
        const {legende, ...dia} = diapos[active];
        const props = { ...dia, duree, active };

        // console.log('CarouselPanel', props, active);

        const diapo =  (<Diapo key={'d'+active} {...props}/>);
        // const current = active;
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
                <ReactCSSTransitionGroup
                    {...transitionsOptions}
                    component="div"
                    className="panel-carrousel--cadre"
                >
                    {diapo}
                    <Legende
                        key={'l'+active}
                        {...{legende}}
                    />
                </ReactCSSTransitionGroup>
                <Plots {...{active, count, ...actions}}/>
                {children}
            </div>
        );
    }
}

const Diapo = ( props ) => {
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

const Legende = ({legende}) => (
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
