import React, { Component } from "react"

import styles from "./index.css"

// const losange = ( <path  d="M0,0 l20,-15 l20,15 l-20,15 z"/> );
const losangePath = 'l20,-15 l20,15 l-20,15 z';
const defs = (
    <defs>
        <pattern id="motif-losange" patternUnits="userSpaceOnUse" x="0" y="0" width="40" height="30">
            <g stroke="#035D7B" fill="none" strokeWidth="1">
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

const _W = 40; // largeur du motif
const _H = 30; // hauteur du motif
// let dims = {x: 200, y: 200};
const duree = 5;
const quantite = 5;



class Cinq extends Component {
    constructor(){
        super();
        this.ref = this.ref.bind(this);
        this.getDims = this.getDims.bind(this);
        this.resize = this.resize.bind(this);
        this.nearPosition = this.nearPosition.bind(this);
        this.randomPosition = this.randomPosition.bind(this);
        this.losangelesse = this.losangelesse.bind(this);
        this.timer = this.timer.bind(this);
        this.gimiFive = this.gimiFive.bind(this);

        this.fives = [];
        this.tmout = null;
    }

    state ={
        dims: {x: 400, y: 400},
        initialPosition: {x: 6 * _W, y: 10 * _H},
    }

    componentDidMount() {
        this.timer();
    }

    componentWillUnmount() {
        clearTimeout(this.tmout);
    }

    componentWillUpdate(undefined, {initialPosition}) {
        this.fives = this.gimiFive(initialPosition);
    }

    ref(el) {
        if (el) {
            this.setState( {dims: this.getDims(el)} );
            el.addEventListener('resize', this.resize)
        }
    }

    getDims(el) {
        if (!el) return ( {x:0, y:0} );
        const {width, height} = el.getBoundingClientRect();
        return {x: width, y: height};
    }

    resize(evt) {
        if (evt) {
            this.setState( {dims: this.getDims(evt.target)} );
        }
    }

    nearPosition(positions, index) {
        const position = positions[index];
        const variation = {x: 4, y: 3};
        let res = true;
        let newPosition = position;
        do {
            newPosition = {
                x: Math.round((Math.random() - 0.5) * variation.x) * _W + position.x,
                y: Math.round((Math.random() - 0.5) * variation.y) * _H + position.y,
            };
            // false si aucune position ne se superpose
            res = positions.reduce( (reduc, position) => {
                const t = (position.x === newPosition.x) && (position.y === newPosition.y);
                return reduc || t;
            }, false);
        } while (res);

        // console.log('newPosition', newPosition);
        return newPosition;
    }

    randomPosition( {x, y} ) {
      const res = {
          x: Math.round(Math.random() * x / _W) * _W,
          y: Math.round(Math.random() * y / _H) * _H
      };
      return res;
    }

    losangelesse(position, index) {
        const losange = `M${position.x},${position.y} ${losangePath}`;
        return(
            <path
                key={index}
                id={'five-' + index}
                className={losangeClasses}
                d={losange}
                style={ {
                    animationDelay: index * 200 + 'ms',
                    animationDuration: (duree) * 1000 + 'ms'
                } }
            />
        )
    }

    timer(){
        this.tmout = setTimeout(this.timer, duree * 1000);
        const {dims} = this.state;
        const initialPosition = this.randomPosition(dims);
        this.setState( {initialPosition} );
    }

    gimiFive(initialPosition) {
        return Array(quantite-1).fill( {x:0} )
        // tableau des positions aléatoires autour d'un point
        .reduce( (positions, c, index) => {
            const pos = this.nearPosition(positions,index);
            return [...positions, pos]
        }, [initialPosition] )
        // appliquer aux losanges
        .map( (position, index) => this.losangelesse(position, index) );
    }

    render() {
        return (
            <svg ref={this.ref}
                id="fond-motif-losange"
                className={styles.fondMotifLosange}
                width="100%" height="100%"
            >
                {defs}
                <rect width="100%" height="100%" fill="url(#motif-losange)" />

                {this.fives}
            </svg>
        )
    }
}

export default Cinq
