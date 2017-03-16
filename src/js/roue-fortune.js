
// FOnction principale
export default function RoueFortune ( _id, arrayLots, gagnant, callback ){

  // _id : id du contenur
  // arrayLots, tableau ou objet de données
  // gagnant : facultatif, dégine le lot gagnant du tirage
  // callback : fonction destinée à l'affichage du lot gagnant

  // test des données en entrée
  if ( typeof(gagnant)=="object" ) { callback = gagnant ; gagnant = null; }
  if ( !callback ) { callback = defaultCallback ; }
  
console.log('ROUE : ', _id, arrayLots, gagnant, callback);
  // variables communes
  var lots = testLots( arrayLots ),  // tableau : liste des lots
      portions = lots.length,        // total des parties de la roue
      arc = 360 / portions,          // largeur de chaque portion
      lotGagnant,                    // lot tiré au sort -> exporté.
      tourne = 0,                    // angle du lot  gagnant sur la roue
      // devraient etre en local storage :
      nbeTirages = 0,              // nombre de fois ou le tirage à été effectué
      maxTirages = null,                // nombre de tirages autorisés
      rfConteneur = document.getElementById(_id) // conteneur
  ;

  // console.log('LOTS:', lots ) ;

  // pas d'id conforme.
  if( !rfConteneur || rfConteneur.hasChildNodes()) {
      return;
    // throw new Error('l‘id ne correspond à aucune cible') ;
  }

  // si pas de support du svg, ou bien intentionnel avec id = legacy
  if ( !supportsSvg() || _id ==="legacy" ) {
  //  console.log(' roueLegacy') ;
    roueLegacy() ;
  } else {
    roueSvg() ;
  }


  // création de la roue en svg
  function roueSvg() {

    //
    // initialiser la fonction
    //

    var xmlns = "http://www.w3.org/2000/svg",
        cX = 100,
        cY = 100,
        cR = 98,                        // cX, cY, cR : coordonnées et rayon de la roue
        _idRoue =  _id + '-roue',       // id de la roue dans le svg
        rfConteneurRoue,                // conteneur du svg par _idRoue
                                        //  qui subira la rotation
        rfTargette,                      // objet DOM de la targette
        isTransitionEnded = true // drapeau pour bloquer la targette avant la fin du tirage;
        ;


    // ititialiser la fonction et créer la roue
    function init(){
      console.log(' Init : roueSvg') ;
      // lancer la construction de la roue
      roueGenerer(_id) ;

      // surveiller la fin de l'animation de transition pour réinitialiser la roue
      rfConteneurRoue = document.getElementById(_idRoue) ;
    //   rfRoue = document.getElementById(_id + "-roue-fortune") ;
      prefixedEvent(rfConteneurRoue, 'TransitionEnd', resetTransition);
      //rfRoue.addEventListener('mousedown', function(event){  startChange( event ); });

      // surveiller l'action sur la targette
      rfTargette = document.querySelector( "#" + _id + " .declenche") ;
      rfTargette.addEventListener('change', function(event){
        startChange( event );
       });

    }

    //
    // construction de la roue
    //

    // publier le SVG dans la div designée par _id
    function roueGenerer(_id){
      rfConteneur.appendChild ( masqueConteneurRoue() );
      rfConteneur.appendChild ( targette() );
      rfConteneur.appendChild ( cliquet() );

      function masqueConteneurRoue (){
        // '<div id="conteneur-roue"></div>'
        const rfMasqueConteneurRoue = document.createElement('div') ;
        rfMasqueConteneurRoue.className = 'masque-conteneur-roue' ; // + wheel
        rfMasqueConteneurRoue.id = 'masque' + _idRoue ;
        rfMasqueConteneurRoue.appendChild ( conteneurRoue() );

        return rfMasqueConteneurRoue ;
      }

      function conteneurRoue (){
        // '<div id="conteneur-roue"></div>'
        rfConteneurRoue = document.createElement('div') ;
        rfConteneurRoue.className = 'conteneur-roue wheel' ; // + wheel
        rfConteneurRoue.id = _idRoue ;
        rfConteneurRoue.appendChild ( rfRoueSVG() );

        return rfConteneurRoue ;
      }

      function targette (){
        // '<input class="declenche" type="range" min="0" max="100">'
        var targ = document.createElement('input') ;
        targ.setAttribute('class', 'declenche');
        targ.setAttribute('type', 'range');
        targ.setAttribute('min', 0);
        targ.setAttribute('max', 100);
        return targ ;
      }

      function cliquet(){
        // generer l'entete du svg
        var boxWidth = 20;
        var boxHeight = 10;
        var svgElem = document.createElementNS (xmlns, "svg");
        svgElem.setAttributeNS (null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
        svgElem.setAttributeNS (null, "x", 0);
        svgElem.setAttributeNS (null, "y", 0);
        svgElem.setAttributeNS (null, "class", "roue-cliquet" );
        svgElem.setAttributeNS (null, "id", _id + "-roue-cliquet" );
        svgElem.setAttributeNS (null, "preserveAspectRatio", "xMinYMin meet");

        // repère de la portion gagnante
        var roueCliquet = document.createElementNS (xmlns, "polygon");
        roueCliquet.setAttributeNS (null, "class", "roue-cliquet-polygon");
        roueCliquet.setAttributeNS (null, "points", "0 0, 20 0, 10 10");

        svgElem.appendChild (roueCliquet);
        return svgElem ;
      }

      // générer la partie  SVG
      function rfRoueSVG (){

        //// DEFINITIONS

        // generer l'entete du svg
        var boxWidth = 200;
        var boxHeight = 200;
        var svgElem = document.createElementNS (xmlns, "svg");
        svgElem.setAttributeNS (null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
        svgElem.setAttributeNS (null, "x", 0);
        svgElem.setAttributeNS (null, "y", 0);
        svgElem.setAttributeNS (null, "class", "roue-fortune" );
        svgElem.setAttributeNS (null, "id", _id + "-roue-fortune" );
        svgElem.setAttributeNS (null, "preserveAspectRatio", "xMinYMin meet");

        ///////////////////////////////////////////
        // var transformObject = svgElem.createSVGTransform();

        // anneau cernant la roue
        var roueBords = document.createElementNS (xmlns, "circle");
        roueBords.setAttributeNS (null, "class", "roue-bords");
        roueBords.setAttributeNS (null, "cx", 100);
        roueBords.setAttributeNS (null, "cy", 100);
        roueBords.setAttributeNS (null, "r", 100);
        svgElem.appendChild (roueBords);

        // groupe contenant les portions
        var roue = document.createElementNS (xmlns, "g");
        roue.setAttributeNS (null, "id", 'roue' + _idRoue );
        roue.setAttributeNS (null, "class", "roue");
        svgElem.appendChild (roue) ;

        // moyeu central
        var roueMoyeu = document.createElementNS (xmlns, "circle");
        roueMoyeu.setAttributeNS (null, "class", "roue-moyeu");
        roueMoyeu.setAttributeNS (null, "cx", 100);
        roueMoyeu.setAttributeNS (null, "cy", 100);
        roueMoyeu.setAttributeNS (null, "r", 30);
        svgElem.appendChild (roueMoyeu);

        // intégrer les portions
        rouePortions( roue );

        return svgElem ;
        }

      // créer les portions de la roue
      function rouePortions(svgConteneur){
        var i, angle = 0;
            // creePortions = "" ;

        var svgGradients = document.createElementNS (xmlns, "defs");
        svgConteneur.appendChild(svgGradients);

        for (i = 0; i < portions ; i++) {

          // créer le tracé de la portion
          var svgPath = addPortion( i, lots[i], angle) ;
          // placer le texte sur le milieu de la portion
          var svgText = addText( i, ( angle+(arc/2) ) ) ;

          var degCouleur = degrader( lots[i].couleur, angle, (lots[i].label + i) ) ;

          // ajouter les éléments au fragment SVG
          svgGradients.appendChild(degCouleur);
          svgConteneur.appendChild(svgPath);
          svgConteneur.appendChild(svgText);

          angle += arc ;
        }

        /*
          creer autant de definition de dégradés que de portions
            -> couleur personnalisée,
            -> orientation personnalisée
            1. nommer le degrade,
            2. attribuer à l'objet,
            3. définir le dégradé,
            4 refrent à un dégradé parent.

              <defs>
          <linearGradient id="myLinearGradient1"
                          x1="0%" y1="0%"
                          x2="0%" y2="100%"
                          spreadMethod="pad"
                          gradientTransform="rotate(45)"
          >
            <stop offset="0%"   stop-color="#00cc00" stop-opacity="1"/>
            <stop offset="100%" stop-color="#006600" stop-opacity="1"/>
          </linearGradient>
          </defs>
          */

        function addPortion(index, lot, angle){
          // obtenir le code svg de l'arc
          // generer les coordonnées
          // generer les attibuts
          var path = document.createElementNS (xmlns, "path") ;
          var id = lot.label + index ;
          var rotation = "rotate(" + (angle)  + "," + cX +"," + cY + ")" ;

          path.setAttributeNS (null, "id", id );
          path.setAttributeNS (null, "class", "portion portion-" + index );
          path.setAttributeNS (null, "d", creerPortion(angle) );
          path.setAttributeNS (null, "fill", "url( " + "#d-" + id + " )" );
          path.setAttributeNS (null, "transform", rotation );

          return path ;
          }

        function creerPortion(){
          var depart = deg2rad(arc),
              fin = deg2rad(0),
              arc180 = arc <= 180 ? "0" : "1" ;
          return [
           "M", cX,cY,
           "L", depart.x, depart.y,
           "A", cR, cR, 0, arc180, 0, fin.x, fin.y,
           "Z"
           ].join(' ') ;
          }

        function addText(i, angle){
          var texte = document.createElementNS (xmlns, "text");
          var milieu = deg2rad(angle);
          var angleIE = ( is('Edge') ) ? angle  + 4  : angle ;
          var rotation = "rotate(" + (angleIE)  + "," + milieu.x +"," + milieu.y + ")" ;
          var textNode =  spanMot( lots[i].label )  ;
          // debug : ajouter un index
          // var textNode =  spanMot( lots[i].index + " " + lots[i].label )  ;

          texte.setAttributeNS (null, "class", "portion-label");
          texte.setAttributeNS (null, "x", milieu.x );
          texte.setAttributeNS (null, "y", milieu.y );
          texte.setAttributeNS (null, "dy", ".3em" );
         texte.setAttributeNS (null, "textLength", "30%" );
          texte.setAttributeNS (null, "transform", rotation );
          // adapter la corps en fonction de la longueur du mot
          texte.setAttributeNS( null,"font-size",textVerticalSize(lots[i].label.length) );
          // aouter le label dans l'objet texte
          texte.appendChild(textNode);

          return texte ;
          }

        function spanMot(mot) {
          var motNode = document.createTextNode(mot) ;
          return motNode ;
          }

        function textVerticalSize( _length ){
          if (_length < 4) return 9.6 ;
          // pour une font-size de 9,6px (0,6em)
          var _height = 64,  // hauteur visible en px
              _const = 0.9 ; // variation de la taille en fct de la longeur du mot
          return (_height / _length ) *_const ;
        }

        function degrader (couleur, angle, id ){

          var couleurInterieur = modifieCouleur ( couleurToRgb( couleur ) , -100 ), //"blue",
              couleurExterieur = modifieCouleur ( couleurToRgb( couleur ) , -60 ), //"red",
              degrade = document.createElementNS (xmlns, "linearGradient"),
              stop1 = document.createElementNS (xmlns, "stop"),
              stop2 = document.createElementNS (xmlns, "stop"),
              stop3 = document.createElementNS (xmlns, "stop"),
              stop4 = document.createElementNS (xmlns, "stop") ;

          degrade.setAttributeNS (null, "id", "d-" + id ) ;
          degrade.setAttributeNS (null, "x1", "100%" ) ;
          degrade.setAttributeNS (null, "y1", "0%" ) ;
          degrade.setAttributeNS (null, "x2", "00%" ) ;
          degrade.setAttributeNS (null, "y2", "100%" ) ;
          degrade.setAttributeNS (null, "spreadMethod", "pad" ) ;

          stop1.setAttributeNS (null, "offset", "0%" ) ;
          stop1.setAttributeNS (null, "stop-color", couleur ) ;
          stop2.setAttributeNS (null, "offset", "50%" ) ;
          stop2.setAttributeNS (null, "stop-color", couleurExterieur ) ;
          stop3.setAttributeNS (null, "offset", "52%" ) ;
          stop3.setAttributeNS (null, "stop-color", couleur ) ;
          stop4.setAttributeNS (null, "offset", "100%" ) ;
          stop4.setAttributeNS (null, "stop-color", couleurInterieur ) ;

          degrade.appendChild (stop1);
          degrade.appendChild (stop2);
          degrade.appendChild (stop3);
          degrade.appendChild (stop4);
          return degrade ;
        }
    }

} // roueGenerer


    //
    // faire tourner la roue et tirer un lot
    //

    // initialiser et lancer le tirage au sort - déclenché par la targette
    function startChange( event ) {
      event.preventDefault();

      // tirage limite ?
      if ( isMaxTirage() ) {
        return callback.play(
          {
            label: "Alerte",
            description : 'Le nombre limite de tirages est dépassé.',
            couleur: 'yellow',
            gain: -1
            } );
        }

      // charger le callback
      initCallback() ;

      //lancer le tirage
      if ( isTransitionEnded ) {
        isTransitionEnded = false ;
        tirerAuSort( targetValue(event) ) ;
        }
        else {event.target.value = 0 ;}
    }

    // caclule l'affichage du lot gagnant
    function tirerAuSort(tours) {

      var jeuGagnant =  doJeuGagnant() ;

      // Enregistrer le lot
      lotGagnant = lots[jeuGagnant] ;
      lotGagnant['index'] = jeuGagnant ;
      lotGagnant['classPortion'] = 'portion-' + jeuGagnant ;

      // valeur de la rotation de la roue
      var rot = doRot() ;
      // lancer l'animation
      vendor.set( rfConteneurRoue, 'Transform', "rotateZ(" + rot + "deg)" ) ;

      function doRot(){
        // faire varier l'arret de la roue sur la portion pour un effet naturel
        var arcVariation = ( randomFromTo( ( 2/10*arc ), ( arc-( 2/10*arc ) ) )  ) ;
        // valeur de la rotation en degrés 0 -> 360°
        tourne = 360 - ( jeuGagnant * arc ) - arcVariation ;
        // ajouter le nombre de tours de roue pour la valeur finale
        return ( (tours - 1) * 360 )  +  tourne ;
      }
      function doJeuGagnant(){
        // filtrer la liste en ne gardant que les gains autorisés
        var jeuTirage = lots.filter(function(val){return 1 === val.gain ; } );
        // index désigne la position du lot gagnant (donné ou tiré au sort)
        var index = gagnant || randomFromTo ( 0, jeuTirage.length - 1 ) ;
        // donner le résultat du tirage au sort
        return jeuTirage[index].index ;
       }
      }


    // initialiser la presentation du résultat
    function initCallback(){

      if ( 0 === nbeTirages ) {
        callback.init(_id) ;
        }
      // effacer le précédent résultat, augmenter le compteur de tirages
      nbeTirages++ ;
      callback.reset() ;
      }

    // prendre la valeur de la targette, puis raz
    function targetValue(event){
      event.preventDefault() ;
      var tours = 3 ; //valeur par défaut

      // console.log("EVENT", event) ;
      if (event.type === 'mousedown'){
        tours = Math.floor( Math.random() * 6 ) + 1 ;
      }
      else {
        tours = Math.floor(event.target.value /10 ) + 1 ;
        event.target.value = 0 ;
      }
        return tours ;
      }

    // conversion degrés vers radians
    function deg2rad(degres) {
        var radians = (degres-90) * Math.PI / 180.0 ;
        return {
          x: cX + (cR * Math.cos(radians)),
          y: cY + (cR * Math.sin(radians))
        };
      }

    // retirer le nombre de tours de roue supplémentaires
    function resetTransition(){
        // une valeur proche de zéro maintient la transition, tout en restant insensible à l'oeil.
        if (vendor.get(rfConteneurRoue, 'transitionDuration' ) === "0.002s"){
          vendor.set(rfConteneurRoue, 'transitionDuration', "4s" ) ;
          return ;
        }
        // ramener la rotation à son modulo de 360, par une transition  imperceptible
        vendor.set(rfConteneurRoue, 'transitionDuration', "0.002s" ) ;
        vendor.set(rfConteneurRoue, 'Transform', "rotateZ(" + tourne + "deg)" ) ;
        isTransitionEnded = true ;

        // sortir le lot gagnant vers la callback
        return callback.play( lotGagnant )  ;
      }


    return  init() ;
    }   // fin de roueSVG


  // fallback de la roue
  function roueLegacy () {

    var positionConteneur = refPosition( _id ),
        corde = positionConteneur.corde,
        badges = [],
        maxTours = 5
    ;

    //console.log('positionConteneur', positionConteneur ) ;
    fRoueGenerer( _id ) ;


    function tirerAuSort( ){

      var _tirageAuSort = choisirLot ( maxTours, lotGagnant ) ;
      console.log( 'Tirage', _tirageAuSort ) ;
      fRoueAnimer( _tirageAuSort ) ;
      return _tirageAuSort ;
    }

    /*
    Animer la roue
    - parcourir la liste de pastilles
        - creer un tableau pour y accéder de suite
    - ajouter une classe à l'objet courant,
    - retirer la classe à l'objet précedent
    - changer au timeout
    - valeur de timeout croissante jusqu'a figer l'inmation.
    */
    function fRoueAnimer( tirage ){
      var i = 0,
          index = 0,
          badge,
          badgePrec
          ;

      highlight() ;

      function highlight( temps ){
        setTimeout( setHighlight , temps ) ;
      }

      function setHighlight(){
        badge = badges[index] ;

       // console.log('badge',badge) ;
        if (badgePrec) {
        badgePrec.classList.remove('badge--highlight') ;
          }
        badge.classList.add('badge--highlight') ;
        badgePrec = badge ;

        i++ ;
        index = i % portions ;

          // si tours = maxtours et i= cible -> return
        if ( i === tirage ) return ;

        var temps = easeInCubic( i, tirage, 42, 50 ) ;
        console.log ( index, i, tirage, temps  ) ;
        highlight( temps  ) ;
      }

    }
    // calcul de la deceleration
    function easeInCubic(t, b, c, d) {
      // t= current time, b = start value, c = change in value, d= duration
     // t=index, d = maxtours + indexfinal, b= 42, c= 1
      t /= d;
      return c*t*t*t  + b;
    }
    // tire un lot au sort
    function choisirLot( maxTours, lotGagnant ){
      var _maxTours = Math.floor ( Math.random() * (maxTours -2) + 2 )  * portions ;
      var _indexLot = lotGagnant || Math.floor ( Math.random() * portions + 1 ) ;
      return _indexLot + _maxTours ;
    }
    // coordonnées  et references de la roue
    function refPosition() {
      var pos = document.getElementById( _id ).getBoundingClientRect(),
          rayon = ( pos.width <= pos.height ) ?
                 ( pos.width / 2  ) :
                 ( pos.height / 2 ) ,
          arcRadians = (arc /2)  * Math.PI / 180.0 ,
          corde = Math.round( 2 * rayon * Math.sin( arcRadians ) ) ,
          adjust = corde / 2
          ;
    //     console.log( 'ROUE-position ', pos) ;

      return {
        posX : pos.left,
        posY : pos.top,
        rayon : rayon - adjust ,
        centreX : pos.width / 2  - adjust ,
        centreY : pos.height / 2 - adjust ,
        corde : corde
        } ;
    }
    // fournir les coordonnées du badge en fonction de sa position dans la liste
    function placerBadge( index ){
      var angle = index * arc ;
      var pos = deg2rad2( angle ) ;
   //   console.log( 'POSITION', index, angle, pos.x, pos.y ) ;
          return {
        posX : pos.x ,
        posY : pos.y
      } ;
    }
    // creer le déclencheur
    function creerBouton(){
      var _bouton = document.createElement('button') ;
      _bouton.textContent = "Jouer" ;
      _bouton.setAttribute("class", "jouez") ;

      if (_bouton.addEventListener) {
        _bouton.addEventListener("click", tirerAuSort, false) ;
        } else {
          _bouton.attachEvent("onclick", tirerAuSort) ;
          }
      return _bouton ;
      }
    // creer la roue
    function fRoueGenerer( _id ){
      var bouton = creerBouton() ;
      var roue = document.createDocumentFragment();
    //  console.log ('arrayLots', arrayLots ) ;

      for ( var index = 0 ; index < portions ; index++ ) {
       roue.appendChild( creerBadge( lots[ index ] , index ) ) ;
        }

      document.getElementById( _id ).appendChild( roue ) ;
      document.getElementById( _id ).appendChild( bouton ) ;


      //    return roue ;
      }
    // crer un disque
    function creerBadge( el, index ){
      //  {label: "1000€", couleur: "darkblue", gain:1 },
      // console.log ('element : %s , index : %s', el , index ) ;

      var position = placerBadge( index ) ;
      //console.log ('position : ', position ) ;
      var badge = document.createDocumentFragment();

    //////////////
      var itemBadge = document.createElement('div') ,
          cssItemBadge ;
      itemBadge.setAttribute( 'class' , 'badge badge--' + index  ) ;

      cssItemBadge  = 'top: ' + position.posX + 'px ; ' ;
      cssItemBadge += 'left: ' + position.posY + 'px ; ' ;
      cssItemBadge += 'width: ' + corde + 'px ; ' ;
      cssItemBadge += 'height: ' + corde + 'px ; ' ;
      itemBadge.style.cssText = cssItemBadge ;
    //////////////
      var fondBadge = document.createElement('span'),
          cssFondBadge ;
      fondBadge.setAttribute('class', 'badge--fond') ;

      cssFondBadge  = 'color: ' + el.couleur + '; ';
      cssFondBadge += 'font-size:' + corde * 3.5 + 'px ;' ;
      fondBadge.style.cssText = cssFondBadge ;
    /*
      fondBadge.style.color = el.couleur ;
      fondBadge.style.fontSize = corde * 4.5 + 'px' ;
    */
      fondBadge.innerHTML = '&#8226;' ;

      itemBadge.appendChild( fondBadge ) ;
      badges[index] = fondBadge ;
    //////////////
      var valeurBadge = document.createElement('span') ;
      valeurBadge.setAttribute('class', 'badge--label') ;
      valeurBadge.textContent = el.label ;

      valeurBadge.style.cssText = 'width: ' + corde + 'px ;' ;
    /*
      valeurBadge.style.width = corde + 'px' ;
    */
      itemBadge.appendChild( valeurBadge ) ;

    //////////////
      badge.appendChild( itemBadge ) ;

      // console.log('BADGE', badge) ;
      return badge ;
    }
    // placer disque
    function deg2rad2(degres) {
      var radians = (degres-90) * Math.PI / 180.0 ;
      return {
        x: positionConteneur.centreX + ( positionConteneur.rayon * Math.cos(radians)),
        y: positionConteneur.centreY + ( positionConteneur.rayon * Math.sin(radians))
        };
      }

  }



    //
    // fonctions communes
    //

  // distribuer les lots sur la roue
  function parseListe( liste ){
    // copier les lots selon la quantité
    var parseLots = liste.lot
    .map( function( lot ) {
      var lotPortions = [],
          i=0,
          q = lot.quantite ;
      for (i ; i < q ; i++ ){
        lotPortions.push( lot ) ;
      }
      return lotPortions ;
      } )
    .reduce(function( a, b ) {
      return a.concat( b );
      } )
    ;

    parseLots = bienMelanger(parseLots) ;

    // bien-bien mélanger
    function bienMelanger(arr) {
      for (var j=1 ; j < 10 ; j++){
        arr.sort(function(){ return Math.random() - 0.5 ; } ) ;
      }
      return arr ;
    }

    // répartir les lots parmi les valeurs par défaut
    var qReparti = liste.portions / parseLots.length,
        indexReparti = [] ;

    for (var k=0 ; k < parseLots.length ; k++) {
     indexReparti[ k ] = Math.floor( k * qReparti ) ;
    }

    // parcourir le tableau entier et distribuer les elements :
    // si  index = indexReparti[i] -> ajouter depuis parseListe, sinon ajouter defaut
    var distribLots = [] ;
    //console.log ("liste.portions", liste.portions ) ;
    for ( var l = 0 ; l < liste.portions ; l++) {
      var ii = indexReparti.indexOf( l ) ;
      distribLots[ l ] = (-1 === ii ) ? liste.defaut : parseLots[ii] ;
    }

    return addIndex(distribLots) ;
  }
  // ajouter un index
  function addIndex(arr) {
    var res = dCopy( arr ) ;
    for ( var i = 0 ; i < arr.length ; i++) {
      res[i].index = i ;
    }
    return res ;
    }
  // accepter lots sous forme de test, de tableau ou d'objet
  function testLots(obj){
   // console.log('LOT', obj ) ;
   if (obj === "test") { /* à faire : lots = donnees de test*/}

   if (obj instanceof Array){ return addIndex(obj) ; }

   if (obj instanceof Object){ return parseListe(obj) ; }
     else throw new Error("la liste de lots n'est pas valide.");
   }

  function defaultCallback(lot){
    console.log ('LOT: vous avez gagné %s', lot.label, lot) ;
    }


  //
  //  fonctions utils
  //

  // deep copy d'un tableau
  function dCopy(o) {
     var out, v, key;
     out = Array.isArray(o) ? [] : {};
     for (key in o) {
         v = o[key];
         out[key] = (typeof v === "object") ? dCopy(v) : v;
     }
     return out;
  }

  // est true si max tirages est atteint
  function isMaxTirage() {
    if (maxTirages) return !(maxTirages - nbeTirages) ;
    return false ;
  }

  // FONCTIONS COULEUR

  // get a random number integer between two low/high extremes
  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  // convertir une expression couleur en notation 'rgb(nr,ng,nb)'
  function couleurToRgb(couleur){

      var cool = document.createElement ("div");
      cool.style.color = couleur ;
      document.body.appendChild(cool) ;

      var cooleur =  window.getComputedStyle(cool).color ;
      document.body.removeChild(cool) ;

      return cooleur ;
    }

  //  transformer le string 'rgb(nr,ng,nb)' en [nr,nv,nb] puis en sens inverse.
  function modifieCouleur (rgb, val){

      function separeRGB(couleur){
        var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        var match = matchColors.exec(couleur);
        return [ match[1], match[2], match[3] ] ;
        }
      function joinRGB(rgb){
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')' ;
      }
      // rgb: couleur [r,g,b] , v = valeur de la modification
      function modifierRGB( rgb,val ){
        return rgb.map( function(d){
          d = Number(d) ;
          return( d += val ) < 0 ? 0 : d > 255 ? 255 : d | 0 ;
        });
      }

     return joinRGB ( modifierRGB( separeRGB(rgb) , val ) ) ;
    }
  /*
      http://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
      https://css-tricks.com/snippets/javascript/lighten-darken-color/

    */


 // TESTS NAVIGATEURS ET FEATURES

 // ajouter un événement avec prefixes vendors
  function prefixedEvent(element, type, callback) {

    var pfx = ["webkit", "moz", "MS", "o", ""];
    for (var p = 0; p < pfx.length; p++) {
      if (!pfx[p]) type = type.toLowerCase();
      element.addEventListener(pfx[p]+type, callback, false);
    }
  }

 // ajouter un style avec prefixes vendors
  var vendor = {
    // set property
    set: function( element, prop, value ) {
      var property = this.conformProp(prop) ;
      element.style[prop.toLowerCase()] = value;
      element.style["webkit" + property] = value;
      element.style["Moz" + property] = value;
      element.style["ms" + property] = value;
      element.style["o" + property] = value;
      // console.log( property, ': ', element.style[prop.toLowerCase()] ) ;
    },
      // get property
    get: function( element, prop ) {
      var property = this.conformProp(prop) ;
      var rep =
          element.style[prop.toLowerCase()]   ||
          element.style["webkit" + property]  ||
          element.style["Moz" + property]     ||
          element.style["ms" + property]      ||
          element.style["o" + property] ;
      // console.log( 'getVendor :', rep ) ;
      return rep ;
      },
    // conformer propriété
    conformProp: function(prop) {
     return prop.charAt(0).toUpperCase() + prop.substr(1);
     }
   } ;

  function is(nav){
    // https://gist.github.com/lanqy/8514345
    var browser = {
      // Opera 8.0+
      Opera : !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 ,
      // Firefox 1.0+
      Firefox : typeof InstallTrigger !== 'undefined' ,
      // At least Safari 3+: "[object HTMLElementConstructor]"
      Safari : Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ,
      // Internet Explorer 6-11
      IE : /*@cc_on!@*/false || !!document.documentMode ,
      // Edge 20+
      Edge : '', //!this.IE && !!window.StyleMedia ,
      // Chrome 1+
      Chrome : !!window.chrome && !!window.chrome.webstore  ,
      // Blink engine detection
    //   Blink : (this.Chrome || this.Opera) && !!window.CSS
    };

    return browser[nav] ;
  }

  // test du support du texte vertical
  /*
  function supportTextVertical(){
    return document.createElement("detect").style.glyphOrientationVertical === "" ;
   }
*/
  // test support du SVG
  function supportsSvg() {
    return !! document.createElementNS &&
           !! document.createElementNS (
                'http://www.w3.org/2000/svg',"svg"
              ).createSVGRect ;
  }

    return {
    utils:{
      vendor:vendor,
      supportsSvg: supportsSvg,
      prefixedEvent : prefixedEvent
    }
  };
   }



//////////////////

// http://www.y3dev.com/fr/dessiner-en-svg-un-graphique-camembert-pie-chart-avec-javascript/

//////////////////
