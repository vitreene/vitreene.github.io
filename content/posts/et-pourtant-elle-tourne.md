---
title: "Et pourtant elle tourne\_! (ma\_roue\_en\_SVG)"
published: 2016-02-01
parentDir: articles
collection: posts
layout: Post
draft: false
js:
  - loterie-1
css:
  - roue-fortune
soundCloud: 33201372
siteDescription: "un module javascript et svg d'un jeu de loterie, personnalisable"
excerpt:
  text: "Comment un test sur la rotation d'un objet finit par produire un petit jeu…"
  photo: img/rot-roue_de_la_fortune.png
  photoAlt: roue de loterie
---

Au départ, ce simple exercice d’animatique aurait pu être réalisé avec Flash, mais Flash est mort. Les navigateurs qui s'appuyaient dessus ne pourront d'ailleurs pas lire cette version en SVG, une version dégradée est prévue dans ce  cas.

Quitte à faire tourner la roue, autant poursuivre en donnant la possibilité de la  personnaliser. Voici comment définir les lots anisi que le nombre de portions.

<div id="cible2" ></div>

<!--intro-->

## Comment utiliser la roue

Le  mode d'emploi est intuitif : tirer la targette plus ou moins fortement, et relâcher pour faire tourner la roue. Le lot gagnant est ensuite annoncé. Et on recommence !

**La liste de lots est personnalisable.** Pour chaque lot, Il faut renseigner un label qui contient la valeur du lot, par exemple : «&nbsp;500€&nbsp;», «&nbsp;cadeau&nbsp;», «&nbsp;Trek 7j.&nbsp;». Ils doivent être courts, pas plus d’une dizaine de caractères.

Il faut aussi renseigner une couleur à attribuer au fond de la portion, sous forme d’un nom css[1](#note01)  ou d‘une couleur hexadécimale.

```javascript
    { label: "100€", couleur: "#5078ff"}
```
 En option, d’autres infos peuvent être ajoutées, comme un message en cas de gain.

Il existe deux façons de transmettre cette liste : la  plus simple  étant de lister chaque lot un par un&nbsp;:

```javascript
  lot: [
    { label: "100€", couleur: "#5078ff" },
    { label: "200€", couleur: "#6262be" },
    // etc
    ]
```

Cependant, il est courant dans ce type de jeu de multiplier un même lot, alors que le gros lot n’y sera qu’une seule fois. Plutôt que de dupliquer le même lot,  il suffit d’indiquer pour chacun la quantité voulue. La liste ressemble alors à ceci&nbsp;:

```javascript
  lot:[
    { label: "100€", couleur: "#5078ff", quantité:6 },
    { label: "200€", couleur: "#6262be", quantité:3 },
    { label: "500€", couleur: "#cc26a0", quantité:1 },
    // etc
    ] ;
```

Il est possible de définir un nombre total de portions plus élevé&nbsp;; dans ce cas, un élément supplémentaire est défini à part, qui sera utilisé comme remplissage par défaut&nbsp;:

```javascript
lots = {
  portions: 20,
  defaut: {label: "Perdu", couleur: "#87af1b"},
  lot: [
    { label: "100€", couleur: "#5078ff", quantité:6 },
    // etc
   ]
}
```

Dans cet exemple, la roue est divisée en 20 portions, les lots sont répartis selon la quantité demandée. Le restant de places est rempli par la valeur «&nbsp;défaut&nbsp;» de façon homogène et aléatoire.

## Tricher&nbsp;? ou pas.
Dans le cas où les lots en jeu sont en quantité limitée, il est nécessaire d’empêcher de sortir un lot déjà gagné dans un précédent tirage. La gestion des lots n’est pas le sujet de ce module, et devrait être traité coté serveur&nbsp;; cependant, il est prévu une possibilité de bloquer la sortie d’un lot en ajoutant un drapeau :

```javascript
    { label: "100€", couleur: "#5078ff", quantité:6, gain:0 }
```

Dans cette logique, forcer tous les lots, sauf un, à «&nbsp;gain:0&nbsp;» reviendra à désigner à l’avance un lot gagnant…
Plus simplement,  une option permet de passer un paramètre  pour désigner à l’avance le lot gagnant ; dans ce cas, le mécanisme de tirage au sort est effectué coté serveur, et ce module ne sert qu'à l’animation.

## Comment intégrer ce module
La fonction n’a pas de dépendances&nbsp;; elle s’appelle par un constructeur&nbsp;:

```javascript
var roue = new roueFortune( id, listeLots, [ lotGagnant, callback  ]  ) ;

```

- où «&nbsp;id&nbsp;» désigne la balise conteneur où sera créé la roue,
  «&nbsp;listeLots&nbsp;» est soit un tableau listant les lots, soit un objet définissant la nature des lots et leur quantité.
- «&nbsp;lotGagnant&nbsp;» est l’index du lot désigné comme gagnant dans la liste  ; il faut noter que cette valeur ne fonctionnera pas si la liste est passée comme un objet, car les lots y sont distribués aléatoirement. Il faut utiliser le parterre « gain » dans ce cas.

- «&nbsp;callback&nbsp;» est une fonction qui récupère l’élément gagnant de la liste ; elle est destinée à générer, par exemple, une animation de victoire, ou de perte, c’est vous qui voyez. Elle est prioritaire sur l’animation par défaut.

A noter, il est possible d’ajouter d’autres informations à la liste, qui seront utilisées par la callback&nbsp;:

```javascript
   {label:"500€", description:"Bravo !  vous avez gagné le gros lot.", quantite:6, couleur:"#5078ff", gain:1}
```

  «&nbsp;description&nbsp;» sera utilisé pour adresser un mot de félicitations.
La fonction crée pour chaque portion une classe CSS dédiée qui est ajoutée à l’objet lot ; cela permet, par exemple de faire clignoter le lot gagnant sur la roue.

## Compatibilité
Le support est étendu aux navigateurs qui reconnaissent le svg, soit la plupart des navigateurs récents et mobiles, mais pas les anciens IE, pour lesquels ce type d’animation était généralement traité par Flash. Un fallback est prévu pour ces navigateurs. On peut forcer l'activation sur les autres en nommant l'id du conteneur "legacy".

## Coté technique
*  Conçu comme un module autonome : plusieurs roues peuvent être utilisées sur une même page. pas de dépendance à une librairie js.
*  Le rendu de la roue est personnalisable par css ;
*  On l’a vu, des données personnalisables.


# Quelques remarques

## Firefox, capricieux avec SVG.
L’implémentation du SVG n’est pas homogène et souffre de nombreux bugs. Pour ce qui concerne la simple rotation d’un objet, chaque navigateur propose sa propre solution… s’il en existe une !
Sur Firefox (<43), la propriété transform-origin est ignorée : la roue ne tourne plus sur son axe [2](#note02) !


Ce bug est connu[3](#note3) et son contournement nécessite quelques astuces. La roue doit être incorporée dans une balise englobante, sur laquelle va être appliquée la propriété transform-origin, avec pour valeurs «&nbsp;50% 50%&nbsp;», c’est à dire son point central. Par héritage, cet axe sera utilisé par l’objet englobé sur lequel sera appliquée la rotation.

```svg
<g class="ff-correct"> 	//  -moz-transform: translate(100px, 100px) ;
	<g id="cible-roue" class="wheel">  // transform-origin: center center;
		<g class="ff-c-correct">  // -moz-transform: translate(-100px, -100px);
			// -moz-transform-origin: 0 0;
		// code de la roue
		</g>
	</g>
</g>
```
Safari perd ses repères lorsque le zoom est actif, quant à IE, il ignore tout simplement les propriétés transform appliquées au SVG.

Quand ça fonctionne, les performances ne sont pas au rendez-vous : si les versions desktop donnent le change, l’affichage sur mobile est franchement poussif et se dégrade très vite si l’on augmente le nombre de portions.
*Et pourtant elle tourne…*

La meilleure solution est finalement de créer une div qui contiendra le SVG. sur la quelle sera appliquée la rotation. Miracle, les performances sont retrouvées, les incompatibilités disparues !

## Réinitialiser une transition
L’animation de la roue est une simple transition CSS, qui produit une rotation selon un angle calculé à partir du tirage au sort.

```css
  wheel { transition: transform 4s cubic-bezier(.36, -0.09, .23, .99)  ; }
```

La transition est déclenchée en ajoutant un style en-ligne&nbsp;:
 ```html
 <div id="cible2-roue" style="transform: rotateZ(300deg);">
 ```
 ce qui évite de modifier dynamiquement les déclarations css.


Le nombre de tours est calculé en multipliant ce nombre par 360&nbsp;; pour une valeur de 1600 degrés par exemple, cela représentera  4&nbsp;x&nbsp;360 plus 160°, soit 4 tours complets plus le déplacement vers le lot gagnant.

Si, au tirage suivant, la rotation fait seulement 3 tours par exemple, la roue va tourner… à reculons ! il est nécessaire de retirer les tours complets, mais tout changement de valeur re-enclenchera une animation. L’astuce va consister à modifier la durée de transition pour qu’elle soit extrêmement brève et imperceptible.

Cela fonctionne très bien la première fois, mais la transition doit être remise à zéro pour fonctionner les fois suivantes. Il ne suffit pas de supprimer et réattribuer la classe supportant la transition.

Le truc consiste à modifier la durée de transition, en la passant à une fraction de seconde, le temps de mettre une valeur de rotation débarrassée de ses tours superflus. Le mouvement est imperceptible.


## Bilan technique

Ce projet m’a fait découvrir quelques rouages de l’animation avec javascript, sans l’aide d’une librairie. J’ai passé beaucoup de temps à détecter et contourner les bugs d’une animation très simple, pour aboutir à utiliser un simple élément html pour le faire. Pour de prochains projets, le recours à une bibliothèque est quasi-obligatoire.

SVG est une norme très ancienne, qui devient populaire à mesure que les derniers navigateurs l’ignorant disparaissent. J’ai depuis longtemps préféré utiliser le vectoriel au pixel pour la création de maquettes, cette approche est désormais celle du web responsive. Malheureusement, la construction d’une animation basée sur SVG est freinée par des bugs non résolus, sur des opérations somme toute assez courantes.

La modification à la volée d’une animation css par javascript souffre de ne pas utiliser d’API. Celles ci commencent à peine à apparaitre, et ne seront sans doute pas finalisées avant quelque temps : il faut encore utiliser nombre de hacks et prefixes vendeurs pour modifier quoi que ce soit. Les transitions sont plus simples à gérer et convienne parfaitement pour ce projet.  

Le recours à une librairie spécialisée comme Velocity.js ou Greensock est nécessaire pour des projets plus complexes, sans pouvoir tout résoudre.

## Connecter le module à un gestionnaire en back-end
En cas d’usage comme un jeu-concours, la sécurité d'un tel module ne peut etre assurée que par un système en back-end. Ses principales fonctions seraient&nbsp;:

- authentifier l’utilisateur pour éviter un usage abusif du jeu ;
- limiter l’usage à un nombre déterminé de tirages, ainsi qu’un délai avant de  tenter un nouvel essai ;
- contrôler les lots mis en jeu : la liste peut être générée par le back-end, qui sera informé des stocks de lots disponibles.

Par exemple, un seul gros lot est gagnable par jour ; il doit être visible dans le jeu, mais il ne peut être gagné qu’une seule fois ; le drapeau permet de gérer le cas. Sauf à forcer le gain, il reste soumis à un tirage au sort.

## D'autres usages
Comme ce module est personnalisable, il est possible de trouver un usage dans tout jeu qui utilise le tirage au sort.
En ajoutant une interface de saisie pour les lots, on pourra, par exemple, s’en servir pour des petits jeux de gages… pour prochain gouter d’anniversaire de ma fille&nbsp;!



<aside class="notes">
<h2>Notes</h2>
<ul>
<li id="note01">

Les noms de couleurs en [css](https://fr.wikipedia.org/wiki/Couleur_du_Web). Connaissez-vous l'histoire tragique de [rebeccapurple](http://meyerweb.com/eric/thoughts/2014/06/19/rebeccapurple/) ?
</li>
<li id="note02">

voir l’article [css-tricks](https://css-tricks.com/svg-animation-on-css-transforms/).
</li>
<li id="note03">

le bug de firefox sur [stackoverflow]( http://stackoverflow.com/questions/15139090/setting-transform-origin-on-svg-group-not-working-in-firefox ).
</li>
</ul>
</aside>
