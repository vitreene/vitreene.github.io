import React, {PropTypes, Component} from "react"

import styles from "./index.css"


// const defaultLos = {width: 390, height: 390};
// // const defaultLos = {width: 390*.71, height: 390*.71}
// // const defaultLos = {width: 390*1.21, height: 390*1.21};
// const defaultDuree = 4;

export default class Carousel extends Component {
    static propTypes = {
        diapos: PropTypes.array, // les diapos
        rect: PropTypes.object, //  dimensions du conteneur
        duree: PropTypes.number //  durée d'une diapo, en secondes
    }
    static defaultProps = {
        diapos: {},
        duree: 4,
        rect: {width: 390, height: 390}
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
        const {duree} = this.props;
        this.prez = setInterval(this.timer, duree * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.prez);
    }

    timer() {
        const quantite = this.props.diapos.length;
        const timer = (this.state.active + 1) % quantite;
        const {cycle} = this.state;
        cycle[timer] = true;
        this.setState({active: timer, cycle});
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

        const diapos = this.props.diapos.map((diapo, index) => {
            const active = this.state.cycle[index];
            const odd = !!(index % 2);

            const props = {losange, rect, duree, diapo, index, active, odd, onTheEnd};
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

const Diapo = (props) => {
    const {diapo, losange, rect, duree, active, odd, index} = props;

    const imgRef = (ref) => {
        ref && ref.addEventListener('animationend', props.onTheEnd);
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
                <div className={styles.losangeOverlay}> TOTO</div>

            </div>
        </div>
    );
}

Diapo.propTypes = {
    onTheEnd: PropTypes.func,
    index: PropTypes.number,
    active: PropTypes.bool,
    odd: PropTypes.bool,
    diapo: PropTypes.string,
    losange: PropTypes.object,
    rect: PropTypes.object,
    duree: PropTypes.number
}
