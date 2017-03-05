import React, {PropTypes, Component} from "react"

import styles from "./index.css"

export default class Carousel extends Component {
    static propTypes = {
        diapos: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.prez = null;
        this.timer = this.timer.bind(this);
        this.onTheEnd = this.onTheEnd.bind(this);
        this.state = {
            active: -1,
            cycle: Array(props.diapos.length).fill(false)
        };
    }

    componentDidMount() {
        const duree = 2 * 1000;
        this.prez = setInterval(this.timer, duree);
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
    render() {
        const {onTheEnd} = this;
        const diapos = this.props.diapos.map((diapo, index) => {
            const active = this.state.cycle[index];
            const odd = !!(index % 2);
            const props = {diapo, active, odd, index, onTheEnd};
            return (<Diapo key={index} {...{...props}}/>)
        });

        return (
            <div id="conteneur-carousel" className={styles.conteneurCarousel}>
                <div className={styles.losange}>
                    {diapos}
                </div>
            </div>
        );
    }
}


const Diapo = (props) => {
    // "./osciller/DSC_0041.JPG"
    const imgRef = (ref) => {
        ref && ref.addEventListener('animationend', props.onTheEnd);
    };

    const {diapo, active, odd, index} = props;
    const src = 'assets/img/' + diapo;
    const slideActiveClassName = (odd
        ? styles.currentSlideOdd
        : styles.currentSlideEven);

    const slideInactiveClassName = (odd
        ? styles.contentsLosangeOdd
        : styles.contentsLosangeEven);

    const currentSlide = [
        index,
        styles.contentsLosange,
        (active ? slideActiveClassName : slideInactiveClassName)
    ].join(' ');

    // const largeurImg = 390 * ( Math.sin( 106 * Math.PI / 180)) * 2 ;
    // const style = {width: largeurImg, height: 'auto'} ;

    return (
        <div ref={imgRef} id={index} className={currentSlide}>
            <div className={styles.conteneurImg}>
                <div className={styles.demix}>
                    <img className={styles.img} src={src} alt=""
                    />
                </div>
            </div>
        </div>
    );
}

Diapo.propTypes = {
    onTheEnd: PropTypes.func,
    index: PropTypes.number,
    active: PropTypes.bool,
    odd: PropTypes.bool,
    diapo: PropTypes.string
}
