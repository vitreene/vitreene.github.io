// PICTIONARY
var pictioLots = {
  portions: 16,
  defaut: {label: "Passer", description:false, couleur: "#87af1b", gain:1 },
  lot: [
    { label: "Objet", description:"Objet", quantite : 4 , couleur: "#5078ff", gain:1 },
    { label: "Expression", description:"Expression", quantite : 2 , couleur: "#373784", gain:1 },
    { label: "Action", description:"Action", quantite : 1 , couleur: "#cc26a0", gain:1 },
    { label: "Original", description:"Original", quantite : 1 , couleur: "#ff0000", gain:1 },
    { label: "Animal", description:"Animal", quantite : 4 , couleur: "#ffa700", gain:1 }
    ]
  };
var pictioGages = ["Faire le tour de la table sur les genoux",
"Nommer toutes les personnes présentes dans l'ordre et les yeux fermés",
"Toucher les quatre murs de la pièce en un temps donné",
"Embrasser chaque participant ",
"Embrasser son gros orteil",
"Imiter le président de la république",
"Parler pendant 3 minutes sans s’arrêter",
"Mettre des chaussettes sur ses mains",
"Imiter sa mère pendant 1 minute",
"Imiter un épouvantail dans un champs pendant tout un tour ",
"Dire à quelles personnalités ressemblent chaque joueur dans la salle",
"Dessiner une caricature de son voisin de droite",
"Boire un verre d'eau chaude",
"Serrer un ballon entre ses mains jusqu'à ce qu'il explose",
"Sauter à cloche pieds autour de la table",
"Donner 10 animaux qui commencent par C",
"Mettre sa tête dans son T-shirt en attendant son prochain tour",
"Faire une déclaration d'amour à son voisin de gauche",
"Faire le clown tout en comptant jusqu'à 30",
"Trouver 5 mots qui riment avec son prénom",
"Dessiner un joueur présent que les autres devront deviner",
"Rester sur les genoux du joueur en face pendant un tour",
"Réciter les mois de l'année à l'envers en 20 secondes",
"Masser le dos de son voisin pendant 1 minute ou 1 tour",
"Fermer les yeux jusqu'à son prochain tour"
] ;
var pictioThemes = {
Objet:[
	"Cabine téléphonique",
	"Sac à dos",
	"Lime à ongles",
	"Panneau",
	"Café",
	"Prise de courant",
	"Lumière",
	"Système solaire",
	"Porte parapluie",
	"Éventail",
	"WC ",
	"Machine à laver",
	"Poubelle",
	"Porte monnaie",
	"Tapis",
	"GPS",
	"Lecteur MP3",
	"Réfrigérateur",
	"Distributeur de billets",
	"Bavoir",
	"Éponge"
	],
Expression :[
	"Pierre qui roule n'amasse pas mousse",
	"Prendre son pied",
	"Pisser dans un violon",
	"Prendre des vessies pour des lanternes",
	"Tomber dans les pommes",
	"Couper les cheveux en quatre",
	"Avoir un chat dans la gorge",
	"Se ressembler comme deux gouttes d'eau",
	"Être haut comme trois pommes",
	"Se prendre un rateau"
	],
Action:[
	"Faire une bataille de boules de neige",
	"Faire les courses",
	"Manger des spaghettis"
	],
Original: [
	"Carte aux trésors",
	"Spaghetti",
	"Escalator",
	"Estomac"
	],
Animal: [
	"Chauve souris",
	"Piranha",
	"Poisson-chat",
	"Limace",
	"Chihuahua",
	"Phoque",
	"Pieuvre",
	"Pigeon",
	"Araignée",
	"Dinosaure",
	"Pingouin",
	"Autruche",
	"Singe",
	"Poule"
	]
} ;
// http://www.idees-gages.com

var pictioDessinerQuoi = {

  blocMessage: {},
  message: '',
  
  play: function (lot){
    console.log('PLAY', lot ) ;
    if (lot.gain < 0 ) return this.limit(lot) ;
    this.message =  this.choixMessage(lot) ;
    this.blocMessage.tirageCat.textContent = (!!lot.description) ? lot.description : ':-/' ;
    this.blocMessage.tirageMessage.innerHTML = '&ldquo; ' + this.message  + ' &rdquo;';
    
    this.blocMessage.tirage.classList.add('tirage-message-down') ;
    
    //console.log ('Message : ', this.blocMessage.tirage );
  },
  
  reset: function(){ 
  },
  
  limit:  function (lot){
    console.log('LIMIT', lot ) ;
    this.blocMessage.tirageCat.textContent = lot.label ;
    this.blocMessage.tirageMessage.textContent = lot.description ;
    this.blocMessage.tirageMessage.classList.add('tirage-message-alert') ;
    this.blocMessage.tirage.classList.add('tirage-message-down') ;
  },
  
  init: function (_id){
    var bloc = this ;
    this.blocMessage = this.creerBlocMessage(_id) ;
    //console.log ('init bouton' , this.blocMessage.tirageClose ) ;
    this.blocMessage.tirageClose.addEventListener("click", function(event){
      bloc.blocMessage.tirage.classList.remove('tirage-message-down') ;
      bloc.blocMessage.tirageMessage.classList.remove('tirage-message-alert') ;
    });
    
    this.blocMessage.tirageMessageFond.addEventListener("click", function(event){
      bloc.blocMessage.tirageMessage.style.opacity = '1' ;
      });
  },

  choixMessage: function (lot){
  var message = "Passez votre tour…";
  if (lot.description){
    var type = pictioThemes[lot.description] ; 
   // console.log ('type :', type ) ;
    message = type[ Math.floor ( Math.random() * type.length )  ] ;
  }
  return message ;
},

  creerBlocMessage: function(_id){
  var blocMessage = document.createDocumentFragment() ;
  
  var tirage = document.createElement('div') ;
  tirage.id = 'tirage' ;
  tirage.classList.add('tirage') ;
  
  var tirageCat = document.createElement('p') ;
  tirageCat.id = 'tirage-cat' ;
  tirageCat.classList.add('tirage-cat') ;

  var tirageMessageFond = document.createElement('p') ;
  tirageMessageFond.id = 'tirage-message-fond' ;
  tirageMessageFond.classList.add('tirage-message-fond') ;
  
  var tirageMessage = document.createElement('span') ;
  tirageMessage.id = 'tirage-message' ;
  tirageMessage.classList.add('tirage-message') ;
  
  var tirageClose = document.createElement('button') ;
  tirageClose.id = 'tirage-close' ;
  tirageClose.classList.add('tirage-close') ;
  tirageClose.innerHTML = '&times;' ;
  
  
  blocMessage.appendChild(tirage);
  tirage.appendChild(tirageCat);
  tirage.appendChild(tirageMessageFond);
  tirage.appendChild(tirageClose);
  tirageMessageFond.appendChild(tirageMessage);
  
  var cible = document.getElementById(_id) ;
  cible.appendChild(blocMessage);
  
  return {
    tirage : tirage,
    tirageCat : tirageCat,
    tirageMessage : tirageMessage,
    tirageMessageFond : tirageMessageFond,
    tirageClose : tirageClose    
  };
  
  
/* RESULTAT 
  <div id="cible"> 
  <div id="tirage" class='tirage'>
    <p id="tirage-cat" class="tirage-cat"></p>
    <p id="tirage-message-fond" class="tirage-message-fond"><span id="tirage-message" class="tirage-message"></span></p>
    <button id="tirage-close" class="tirage-close">&times;</button>
  </div>
  </div>
  
  */
}
  } ;

/////////////////////////
var roue01= new RoueFortune( "cible1", pictioLots, pictioDessinerQuoi ) ;

