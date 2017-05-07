import React, {PropTypes, Component} from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Plots from './plots'
import {Diapo, Legende} from './diapo'

import styles from './index.css'

const isClient = typeof window !== "undefined";

export default class Slider extends Component {
    static propTypes = {
        children: PropTypes.node,
        diapos: PropTypes.array, // les diapos
        duree: PropTypes.number, //  durée d'une diapo, en secondes
        id: PropTypes.string, //  id du carousel
        modele: PropTypes.string, //  modele d'affichage
        onStart: PropTypes.func, //  callback au lancement
        onStop: PropTypes.func, //  callback a la fermeture
    }
    static defaultProps = {
        diapos: [],
        duree: 4,
    }
    state = {
        active: 0,
        pause: false
    }
    prez = null

    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        this.pause = this.pause.bind(this);
        this.aller = this.aller.bind(this);
        this.keypressed = this.keypressed.bind(this);
    }

    componentWillMount() {
        // console.log('this.props.onStart', this.props.onStart)
        this.timer(0);
        this.props.onStart && this.props.onStart();
        isClient && window.addEventListener('keydown', this.keypressed);
    }

    componentWillUnmount() {
        clearTimeout(this.prez);
        this.props.onStop && this.props.onStop();
        isClient && window.removeEventListener('keydown', this.keypressed);
    }

    componentWillReceiveProps({diapos}){
        if (diapos.length !== this.props.diapos.length)
            this.setState({active: 0});
    }
    
    timer(aller = null) {
        const current = (aller === null)
            ? this.state.active + ( (this.state.pause) ? 0 : 1 )
            : aller;
        const {duree} = this.props;
        const quantite = this.props.diapos.length ;
        const active = (current + quantite) % quantite;
        this.setState({active});
        this.prez = setTimeout(this.timer, duree * 1000);
    }

    pause(event = !this.state.pause ) {
        this.setState({ pause: event });
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
        const active = char[event.keyCode] 
            ? (char[event.keyCode] + this.state.active)
            : null;
        // console.log('KEY', event.keyCode, char[event.keyCode], active,  this.state.active);

        // active peut prendre la valeur 0 
        if (active !== null){
            clearTimeout(this.prez);
            this.timer(active);
        }
    }

    render() {
        const {children, duree, diapos} = this.props;
        const {active} = this.state;
        const actions = {aller: this.aller, pause: this.pause};
        // const active = 1;
        // console.log('Slider', this.props, active);
        // console.log('Slider active', active);

        const {legende, ...dia} = diapos[active];
        const props = { ...dia, duree, active };

        const count = diapos.length;
        const transitionsOptions = {
          transitionName: "cross-fade",
          transitionAppear: true,
          transitionAppearTimeout: 500,
          transitionEnterTimeout: 1000,
          transitionLeaveTimeout: 1000
        };

        const diapo =  (<Diapo key={'d'+active} {...props}/>);
        
        return (
            <div id="panel-carrousel"
                className={styles.sliderConteneur}>
                <ReactCSSTransitionGroup
                    {...transitionsOptions}
                    component="div"
                    className={styles.sliderCadre}
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
