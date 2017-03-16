
// données sous forme d'objet ou de tableau

export const lots = [
  {label: "1000€", couleur: "darkblue", gain:1 },

  {label: "500€", couleur: "darkred", gain:1 },
  {label: "200€", couleur: "darkgreen", gain:1 },
  {label: "100€", couleur: "coral", gain:1 },

  {label: "500€", couleur: "red", gain:0 },
  {label: "200€", couleur: "darkgreen", gain:1 },
  {label: "100€", couleur: "coral", gain:1 },

  {label: "500€", couleur: "darkred", gain:1 },
  {label: "200€", couleur: "darkgreen", gain:1 },
  {label: "100€", couleur: "coral", gain:1 },

  {label: "500€", couleur: "darkred", gain:1 },
  {label: "200€", couleur: "darkgreen", gain:1 },
  {label: "100€", couleur: "coral", gain:1 },

  {label: "500€", couleur: "darkred", gain:1 },
  {label: "200€", couleur: "darkcyan", gain:0 },
  {label: "100€", couleur: "coral", gain:1 },
];

export const lotsOBJ = {
  portions: 20,
  defaut: {label: "Perdu",description:"Perdu ! vous passez un tour", couleur: "#87af1b", gain:1 },
  lot: [
    { label: "100€", description:"Vous avez gagné 100€", quantite : 6 , couleur: "#5078ff", gain:1 },
    { label: "200€", description:"Vous avez gagné 200€ : pas mal !", quantite : 3 , couleur: "#6262be", gain:1 },
    { label: "-500€", description:"Vous avez perdu 500€ : pas de chance ! ", quantite : 2 , couleur: "#cc26a0", gain:1 },
    { label: "1000€", description:"Vous avez gagné 1000€ : Fantastique !", quantite : 1 , couleur: "#ff0000", gain:1 }
    ]
  };

export const lolots = [

  {label: "Choux", couleur: "darkred",   description:"1000€", gain:1 },
  {label: "Genoux",  couleur: "indigo",    description: "200€", gain:1 },
  {label: "Hiboux",  couleur: "#9b9b1a",   description: "200€", gain:1 },
  {label: "Joujoux",  couleur: "darkgreen", description: "100€", gain:1 },
  {label: "Poux",  couleur: "darkcyan",  description: "500€", gain:0 },
  {label: "Bijoux",  couleur: "violet",    description: "100€", gain:1 },
  {label: "Cailloux",  couleur: "orangered", description: "500€", gain:1 },
];


// callBack
export const annonceGagnant = {
  annonce: document.createElement('div'),
  idAnnonce : '',

  init: function(_id){
    this.idAnnonce = _id + '-annonce' ;
    this.annonce.id = this.idAnnonce ;
    document.getElementById(_id).appendChild(this.annonce) ;
    return 'annonce créée' ;
    },

  play: function(lot){
    // message spécial si limite atteinte
    if (lot.gain < 0 ) return this.limit(lot) ;

    this.annonce.textContent = lot.description ;
    this.annonce.classList.add(this.idAnnonce) ;
    return lot ;
    },

  reset: function(){
    this.annonce.textContent = "" ;
    this.annonce.classList.remove(this.idAnnonce) ;
    return 'RAZ' ;
    },

  limit: function(lot){
    this.annonce.textContent = lot.description ;
    this.annonce.classList.add(this.idAnnonce + '-alert' ) ;
    return lot ;

}
  }



//var roue02= new RoueFortune( "legacy", lotsOBJ, annonceGagnant ) ;
// var roue03= new RoueFortune( "cible2", lotsOBJ, annonceGagnant ) ;
//var roue04= new RoueFortune( "cible2", lolots, annonceGagnant ) ;
//var roue04= new RoueFortune( "cible2", lots, annonceGagnant ) ;
