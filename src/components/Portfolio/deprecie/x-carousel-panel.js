import React from 'react'
import Marked from 'marked'
// import ReactCSSTransitionReplace from 'react-css-transition-replace'
// import SetIntervalMixin from './set-interval-mixin'
import Imgs from './imgs'
import Plots from './plots'

// cadrer les images ! -> peut fabriquer un panel trop long !

var CarrouselPanel = React.createClass({

  // mixins: [SetIntervalMixin], // Use the mixin

  getInitialState: function(){
    return{
      vue    : 0,
      active : false,
      pause  : false,
      timer  : undefined
    };
  },

  // numéros d'image active et précédente
  enter : 0,
  leave : null,
  images : [],

  componentWillMount: function() {
    this.intervals = [];
  },
  componentDidMount: function() {
    const durees = {
      defaut : 2000,
      lightbox : 3500
    };
    const duree = durees[this.props.modele] ;
    // initialiser le timer
    this.setState({timer : this.setInterval(this.timer, duree, true) });

    window.addEventListener('keydown', this.keypressed);
    // preload des images du carrousel
    this.updateImgs(this.props.data) ;
  },

  componentWillUnmount: function() {
      this.intervals.forEach(clearInterval);
    window.removeEventListener('keydown', this.keypressed);
  },

  componentWillReceiveProps: function (next) {
    console.log('id',this.props,this.props.id ,next.id) ;
  },

  componentWillUpdate: function(a,next) {
    // mise à jour des numéros d'images
    if (this.state.vue !== next.vue) {
      this.leave = this.state.vue ;
      this.enter = next.vue ;
    }
    if (this.props.id !== a.id)  {
    this.updateImgs(a.data) ;
    }
  },

  componentDidUpdate: function() {
    // après la mise à jour, ajouter la transition css
    if (false === this.state.active) {
      /*
       requestAnimationFrame( function () {
        this.setState( {active : true} ) ;
        }.bind(this) )
        */
      // simplification pour etablir un délai de transition
      setTimeout( function () {
        this.setState( {active : true} ) ;
      }.bind(this), 60 ) ;
    }
  },

  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },

  preload : function (imageArray, index) {
    index = index || 0;
    //console.log('INDEX images', index, this.images[index] );
    var that = this ;
    if (imageArray && imageArray.length > index) {
        var img = new Image ();
        img.onload = function() {
            that.preload(imageArray, index + 1);
        };
        img.src = this.images[index];
      };
  },

  updateImgs: function (files) {
    //console.log('update imgs', files);
    this.images = files.map( function(img) {
     return require('../../../content/portfolio/portfolio2/' + img.file);
    });
    this.preload(this.images);
  },

  timer:function(next){
    next = (typeof(next) == 'Number' ) ? next : !this.state.pause ;
    if (!next) return ;
    var visible = (this.state.vue + next) % this.props.data.length ;
    visible = (visible < 0) ? this.props.data.length -1 : visible ;
    this.setState({vue : visible});
    this.setState({active : false}) ;
  },

  pause:function(){
    this.setState({ pause : true } ) ;
    //console.log('PAUSE', this.state.pause);
  },

  play:function(){
    this.setState({ pause : false } ) ;
    //console.log('PAUSE', this.state.pause);
  },

  toggle:function(){
    this.setState({ pause : !this.state.pause } ) ;
  },

  goto:function(event){
    clearInterval(this.state.timer) ;
    var key = Number( event.target.id.split('plots')[1] ) ;
        this.setState({ vue : key});
    // console.log('key', key, event.target ) ;
  },

  keypressed:function (event) {
    var charCode = {
      '37' : -1, // fleche gauche
      '39' : 1 // fleche droite
    };
    // console.log('KEY', event.keyCode, charCode[event.keyCode] );
    clearInterval(this.state.timer) ;
    this.timer(charCode[event.keyCode] || 0 ) ;
  },

  render: function(){
    var imgs = [
      this.leave,
      this.enter
    ];
    return (
      <div className= "panel-carrousel--cadre">
          <Imgs
              images = {this.images}
              imgs   = {imgs}
              data   = {this.props.data}
              active = {this.state.active}
              start  = {this.toggle}
              enter  = {this.pause}
              leave  = {this.play}
              getLegende = {this.props.getLegende}
          />
          <Plots
              goto    = {this.goto}
              enter   = {this.pause}
              leave   = {this.play}
              count  = {this.props.data.length}
              current = {this.state.vue}
          />
      </div>
    );
  }
});

export default CarrouselPanel
