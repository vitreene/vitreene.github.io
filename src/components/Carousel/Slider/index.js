import React, {PropTypes, Component} from "react"

import styles from "./index.css"


// const defaultLos = {width: 390, height: 390};
// // const defaultLos = {width: 390*.71, height: 390*.71}
// // const defaultLos = {width: 390*1.21, height: 390*1.21};
// const defaultDuree = 4;


/*
rendre le carousel responsive, avec une taille de base.
Les dimensions rect et losange sont calculées en conséquence
le seul parametre à donner serait width ou haight, le reste est calculé.
+ on resize recalcule l'ensemble.
*/

const echelle = 0.71;

export default class Slider extends Component {
    static propTypes = {
        diapos: PropTypes.array, // les diapos
        rect: PropTypes.object, //  dimensions du conteneur
        duree: PropTypes.number //  durée d'une diapo, en secondes
    }
    static defaultProps = {
        diapos: [],
        duree: 4,
        rect: {width: 398 * echelle, height: 384 * echelle}
    }
    state = {
        active: -1,
        cycle: Array(this.props.diapos.length).fill(false),
        losange: {width: 0, height: 0} // dimensions après deformation
    }

    constructor(props) {
        super(props);
        this.prez = null;
        this.timer = this.timer.bind(this);
        this.onTheEnd = this.onTheEnd.bind(this);
        this.rectLosange = this.rectLosange.bind(this);
    }

    componentDidMount() {
        this.timer();
        // Cinq();
    }

    componentWillUnmount() {
        clearTimeout(this.prez);
    }

    timer() {
        const {duree} = this.props;
        const quantite = this.props.diapos.length;
        const timer = (this.state.active + 1) % quantite;
        const {cycle} = this.state;
        cycle[timer] = true;
        this.setState({active: timer, cycle});
        this.prez = setTimeout(this.timer, duree * 1000);
    }

    onTheEnd(e){
        const end = e.target.id;
        const {cycle} = this.state;
        cycle[end] = false;
        this.setState({cycle});
    }

    rectLosange(ref){
        if (ref){
            const {width, height} = ref.getBoundingClientRect();
            this.setState({
                losange: {
                    width: Math.round(width),
                    height: Math.round(height)
                }
            });
        }
    }

    render() {
        const {onTheEnd} = this;
        const {rect, duree} = this.props;
        const {losange} = this.state;

        const diapos = this.props.diapos.map( (diapo, index) => {
            const active = this.state.cycle[index];
            const odd = !!(index % 2);
            const props = {
                diapo,
                losange,
                rect,
                duree,
                active,
                odd,
                index,
                onTheEnd
            };
            return (<Diapo key={index} {...{...props}}/>)
        });
        return (
                <div id="conteneur-carousel"
                    className={styles.conteneurCarousel}>
                    <div
                        ref={this.rectLosange}
                        className={styles.losange}
                        style={rect}>
                        {diapos}
                    </div>
                </div>
        );
    }
}

// const largeurImg = 390 * ( Math.sin( 106 * Math.PI / 180)) * 2 ;
// const style = {width: largeurImg, height: 'auto'} ;
// "./osciller/DSC_0041.JPG"

const Diapo = ( {diapo, losange, rect, duree, active, odd, index, onTheEnd} ) => {

    const imgRef = (ref) => {
        ref && ref.addEventListener('animationend', onTheEnd);
    };

    const slideActiveClassName = (odd)
        ? styles.currentSlideOdd
        : styles.currentSlideEven;

    const slideInactiveClassName = (odd)
        ? styles.contentsLosangeOdd
        : styles.contentsLosangeEven;

    const currentSlide = [
        index,
        styles.contentsLosange,
        (active ? slideActiveClassName : slideInactiveClassName)
    ].join(' ');

    const src = 'url(assets/img/' + diapo + ')';
    // const srcImg = 'assets/img/' + diapo;
    const losangeImgStyle = {backgroundImage: src};

    return (
        <div ref={imgRef} id={index} className={currentSlide}
            style={ {animationDuration: duree * 2 + 's', ...rect } }>
            <div className={styles.demix}
                style={{...losange}}>

                <div className={styles.losangeImg} style={losangeImgStyle}> </div>
                {/* <img className={styles.img} src={srcImg} alt=""/> */}
                <div className={styles.losangeOverlay}></div>

            </div>
        </div>
    );
}

Diapo.propTypes = {
    diapo: PropTypes.string,
    losange: PropTypes.object,
    rect: PropTypes.object,
    duree: PropTypes.number,
    active: PropTypes.bool,
    odd: PropTypes.bool,
    index: PropTypes.number,
    onTheEnd: PropTypes.func,
}
