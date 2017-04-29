import React, {PropTypes, Component} from "react"

import styles from "./index.css"
const isClient = typeof window !== "undefined";

export default class Slider extends Component {
    static propTypes = {
        diapos: PropTypes.array, // les diapos
        rect: PropTypes.object, //  dimensions initiales du conteneur
        duree: PropTypes.number //  durée d'une diapo, en secondes
    }
    static defaultProps = {
        diapos: [],
        duree: 4,
        rect: {width: 298, height: 288}
    }
    state = {
        active: -1, // slider
        cycle: Array(this.props.diapos.length).fill(false),
        echSlider: 1, // rendre le slider responsive
    }
    losange = {
        width: 0, 
        height: 0
    }
    conteneur = null
    prez = null

    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        this.onTheEnd = this.onTheEnd.bind(this);
        this.rectLosange = this.rectLosange.bind(this);
        this.scaleSlider = this.scaleSlider.bind(this);
    }

    componentDidMount() {
        this.timer();
        this.scaleSlider();
        isClient && window.addEventListener('resize', this.scaleSlider);

    }

    componentWillUnmount() {
        clearTimeout(this.prez);
        isClient && window.removeEventListener('resize', this.scaleSlider);
    }

    timer() {
        const {duree} = this.props;
        const {cycle, active} = this.state;
        const quantite = this.props.diapos.length;

        const timer = (active + 1) % quantite;
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
        if (!ref) return;

        const {width, height} = ref.getBoundingClientRect();
        this.losange = {
            width: Math.round(width),
            height: Math.round(height)
        }
    }

    scaleSlider() {
        if (!this.conteneur) return ;

        const {width, height} = this.conteneur.getBoundingClientRect();
        const widthLosange = Math.round(width * 0.60);
        const heightLosange = Math.round(height * 0.80);
        const maxHeight = this.props.rect.height;
        const minSide = Math.min(widthLosange, heightLosange, maxHeight);

        this.setState({echSlider: minSide/maxHeight});
    }

    render() {
        const {onTheEnd, losange} = this;
        const {rect, duree} = this.props;
        const {echSlider} = this.state;
        
        const conteneurRect = {
            width:  rect.width * echSlider,
            height: rect.height * echSlider,
        };
        const conteneurLosange = {
            width:  losange.width * echSlider,
            height: losange.height * echSlider,
        };

        const diapos = this.props.diapos.map( (diapo, index) => {
            // const active = this.state.cycle[index];
            // const odd = !!(index % 2);
            const props = {
                diapo,
                losange: conteneurLosange,
                rect: conteneurRect,
                duree,
                active: this.state.cycle[index],
                odd: !!(index % 2),
                index,
                onTheEnd
            };
            return (<Diapo key={index} {...{...props}}/>)
        });


        return (
            <div id="conteneur-carousel"
                ref={ (r)=> this.conteneur = r  }
                className={styles.conteneurCarousel} >

                <div  className={styles.conteneurSlider}>
                    <div
                        ref={this.rectLosange}
                        className={styles.losange}
                        style={conteneurRect}>
                        {diapos}
                    </div> 
                </div>
            </div>        
        );
    }
}

// const largeurImg = 390 * ( Math.sin( 106 * Math.PI / 180)) * 2 ;
// const style = {width: largeurImg, height: 'auto'} ;
// "./osciller/DSC_0041.JPG"

const Diapo = ( {diapo, losange, rect, duree, active, odd, index, onTheEnd} ) => {
    // console.log('losange : ', losange);
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
    const losangeImgStyle = {backgroundImage: src};

    return (
        <div ref={imgRef} id={index} className={currentSlide}
            style={ {animationDuration: duree * 1.15 + 's', ...rect } }>
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
