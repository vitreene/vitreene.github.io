import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const Imgs = (props) => {
  // pour le fondu enchainé, deux images : enter et leave
  // el = image et legende , i =(0: leave, 1: enter)
  function creerIMG(el, i){
    // au départ leave n'est pas défini
    if (el === null || el === undefined)  return;

    const img = props.data[el] ;
    //var bgImg = require('../../assets/portfolio2/' + img.file ) ;
    const bgImg = props.images[el] ;

    // si les images ne sont pas encore disponibles
    if (!img || !bgImg) return ;

    // le premier élément i=0 est leave
    const visible = (i) ? '-enter' : '-leave' ;
    const effect = ' cross-fade' ;
    const active = (props.active) ?
        effect + visible + '-active' :
        '' ;
    const transition = effect + visible + active ;
    const imgClass = 'panel-carrousel--cadre-img ' +
      (img.action || '') + transition ;
    //  const legendeClass = 'panel-carrousel--cadre-legende ' + visible ;
    const legende = (img.legende) ? creerLegende(i, img.legende, transition) :'' ;
    //  console.log('CLASS', clName);

    return (
        <div key={img.file}>
            <Img
                imgClass={imgClass}
                src={bgImg}
                alt={img.legende}
                start={props.start}
                enter={props.enter}
                leave={props.leave}
            />
            {legende}
        </div>
        );
  }

  function creerLegende(i, legende, transition) {
    if (i || legende) {
      const txt = (legende) ? props.getLegende(legende) : '';
      const className = "panel-carrousel--cadre-legende" + transition ;
      return (
      <div
          className = {className}
          dangerouslySetInnerHTML={txt}
      />
    )}
  }

   // couple précedent, actuel; filtrer si precedent = null
   // const imgs = props.imgs
   // .map( creerIMG )
   // .filter( (el => el) );

   const imgs = creerIMG(props.imgs[0]);

   const transitionsOptions = {
     transitionName: "cross-fade",
    //  transitionAppear: true,
    //  transitionAppearTimeout: 500,
     transitionEnterTimeout: 1000,
     transitionLeaveTimeout: 1000
   };

   return (

     <div className="panel-carrousel--cadre-vues">
         <ReactCSSTransitionGroup {...transitionsOptions}>
             {imgs}
         </ReactCSSTransitionGroup>
     </div>

   );
  }

  Imgs.propTypes = {
     active: PropTypes.bool,
     imgs: PropTypes.array,
     images: PropTypes.array,
     data: PropTypes.array,
     getLegende: PropTypes.func,
     start: PropTypes.func,
     enter: PropTypes.func,
     leave: PropTypes.func,
  };

// key = {props.key}

const Img = (props) => (
     <div
         className = { props.imgClass }
         onClick={props.start}
         onTouchStart={props.start}
     >
         <img
             onMouseEnter={props.enter}
             onMouseLeave={props.leave}
             src = {props.src}
             alt = {props.alt}
             className = "panel-cadre-img"
         />
     </div>
   );

Img.propTypes = {
   imgClass: PropTypes.string,
   src: PropTypes.string,
   alt: PropTypes.string,
   start: PropTypes.func,
   enter: PropTypes.func,
   leave: PropTypes.func,
};

export default Imgs
