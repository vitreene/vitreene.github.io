import React, { PropTypes } from "react"

import styles from "./index.css"

// const losange = ( <path  d="M0,0 l20,-15 l20,15 l-20,15 z"/> );
const losangePath = 'l20,-15 l20,15 l-20,15 z';
// #035D7B
const defs = (
    <defs>
        <pattern id="motif-losange" patternUnits="userSpaceOnUse" x="0" y="0" width="40" height="30">
            <g stroke="red" fill="none" strokeWidth="1">
                <line x1="0" y1="0" x2="40" y2="30"/>
                <line x1="40" y1="0" x2="0" y2="30"/>
            </g>
        </pattern>
    </defs>
);
const losangeClasses = [
    styles.losangeVolant,
    styles.losangeVolantTransition
].join(' ');


const Cinq = (/* props*/) => {
    const _W = 40; // largeur du motif
    const _H = 30; // hauteur du motif
    let dims = {x: 200, y: 200};
    const duree = 5;

    let fives = [];
    // timer();

    // debugger;

    function ref(el) {
        if (el) {
            dims = getDims(el);
            // console.log('DIMS', dims, getDims(el) );
            el.addEventListener('resize', resize)
        }
    }

    function getDims(el) {
        if (!el) return ({x:0, y:0});
        const {width, height} = el.getBoundingClientRect();
        // dims.x = width;
        // dims.y = height;
        return {x: width, y: height};
    }

    function resize(evt) {
        if (evt) {
            dims = getDims(evt.target);
        }
    }

    function nearPosition(position) {
      const variation = {x:4,y:3} ;
      return {
        x: Math.round((Math.random()-0.5) * variation.x)*_W + position.x,
        y: Math.round((Math.random()-0.5) * variation.y)*_H + position.y,
      }
    }

    function randomPosition({x, y}) {
      const res = {
      x: Math.round(Math.random() * x / _W) * _W,
      y: Math.round(Math.random() * y / _H) * _H
      }
      console.log('randomPosition', x, y, res);
      return res;
    }

    function losangelesse(position, index){
        const losange = `M${position.x},${position.y} ${losangePath}`;
        return(
            <path
                key={index}
                id={'five-' + index}
                className={losangeClasses}
                d={losange}
                style={ {
                transitionDelay: index * 200 + 'ms' } }
            />
        )
    }


    function timer(){
        // fives = gimiFive();
        setTimeout(timer, duree * 1000);
        return gimiFive();
    }

    function gimiFive() {
        return Array(5).fill({x:0})
        // tableau des positions aléatoires autour d'un point
        .reduce( (positions, c, index) => {
            const pos = nearPosition(positions[index]);
            // console.log('POSitions', pos, positions[index]);
            return [...positions, pos]
        }, [randomPosition(dims)] )
        // appliquer aux losanges
        .map( (position, index) => losangelesse(position, index) )
        ;
    }

    return (
        <svg ref={ref}
            id="fond-motif-losange"
            className={styles.fondMotifLosange}
            width="100%" height="100%"
        >
            {defs}
            <rect width="100%" height="100%" fill="url(#motif-losange)" />
            {/* {fives} */}
            {timer()}
        </svg>
    )
}

Cinq.propTypes = {
  children: PropTypes.node,
}

export default Cinq

/*
const motifFondSvg = (
    <svg id="motif-losange" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" >

        <defs>
            <pattern id="motif-losange" patternUnits="userSpaceOnUse" x="0" y="0" width="40" height="30">
                <g stroke="#2fc5e8" fill="none" stroke-width="1">
                    <line x1="0" y1="0" x2="40" y2="30"/>
                    <line x1="40" y1="0" x2="0" y2="30"/>
                </g>
            </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#motif-losange)" />

    </svg>
);

const losangeSVG = (
    <svg id="icon-losange" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 40" >
        <path id="losange" d="M0,0 l20,-15 l20,15 l-20,15 z"/>
    </svg>
);

function cinqLosanges(){


  const _SVG = 'http://www.w3.org/2000/svg' ;
  const _XLINK = "http://www.w3.org/1999/xlink";
  const _W = 40; // largeur du motif
  const _H = 30; // hauteur du motif

  const motif = document.getElementById('motif-losange') ;
  const dims = motif.getBoundingClientRect() ;
  const use = [];

  for (const i=0; i<5 ; i++){
    use[i] = document.createElementNS(_SVG, 'use') ;
    use[i].setAttributeNS(_XLINK, 'href', '#losange') ;
    use[i].setAttribute('class', 'losange-volant losange-volant-transition') ;
    use[i].setAttribute('id', 'lose0' + (i+1) ) ;
    use[i].setAttribute('style', 'transition-delay:'+i*200+'ms') ;
    motif.appendChild(use[i]) ;
  };


  setInterval( movePosition, 5000) ;
  movePosition();

  function movePosition(){
    use.reduce( function(prec,losange){
      const pos = position(losange, prec ) ;
      const los = nearPosition(pos) ;
    //  console.log('losange :', los) ;
      return los ;
      }, randomPosition(dims) )
  }

  function position(forme, position) {
    forme.style.opacity=0;

    setTimeout(newPosition,1000) ;

    function newPosition(){
      forme.style.opacity='';
      forme.setAttribute('x', position.x) ;
      forme.setAttribute('y', position.y) ;
    }

    return {x:position.x, y:position.y} ;
  }


  function randomPosition(dimensions) {
    return {
    x: Math.round(Math.random() * dimensions.width/_W)*_W,
    y: Math.round(Math.random() * dimensions.height/_H)*_H
    }
  }

  function nearPosition(position) {
    const variation = {x:4,y:3} ;
    return {
      x: Math.round((Math.random()-0.5) * variation.x)*_W + position.x,
      y: Math.round((Math.random()-0.5) * variation.y)*_H + position.y,
    }
  }
}
*/
