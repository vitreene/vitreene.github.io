---
title: "Wordpress : protéger l’accès d’une page par mot de passe"
published: 2017-07-03T00:00:00.000Z
date: 2017-07-03T00:00:00.000Z
collection: articles
layout: Post
draft: false
soundCloud: 33200703
siteDescription: 'Wordpress: protéger l’accès d’une page par mot de passe.'
excerpt:
  text: "Retour sur l’utilisation de cette fonction un peu oubliée"
  photo: img/WP-prtected_DSC_0079.jpg
  photoAlt: 'Protéger sa page par un code d’accès.'
---

Pour la refonte du site d’un client, j’ai eu besoin de créer une page contenant un accès simplifié à ses activités. Il souhaitait en réserver l’accès à ses collaborateurs, aussi cette page n’est pas liée au reste du site. 

![page protégée](../../assets/img/WP-prtected_DSC_0079.jpg "page protégée")

<!--intro-->

La page ne contient pas d’informations sensibles, mais il n’est pas souhaitable que l’on puisse la consulter accidentellement. 

Wordpress propose depuis très longtemps de protéger une page par mot de passe. Le niveau de sécurité n’est pas très élevé, mais largement suffisant pour ce cas.
Du coté de l’administration, dans les options de publication d’une page ou d’un post, l’option de visibilité doit être réglée à « protection par mot de passe » Au meme endroit, un champ renseigne le mot de passe.

Et cela fonctionne… en principe. Car si le mot de passe est bien demandé, la majeure partie du contenu de cette page apparait quand même. Que se passe-t-il ?

## Protéger les contenus personnalisés
Le tableau de mon client est créé à partir d’un contenu personnalisé, ajouté en fin du template. La protection ne contrôle, par défaut, que les contenus standard de Wordpress : le titre, le contenu, et le résumé. 

Il faut intervenir dans le template de la page et demander à Wordpress de vérifier si un mot de passe est requis pour cette page, c’est l’objet de la fonction *post_password_required()* qui retournera true ou false. 
La page du codex[1](#note01). consacrée à cette fonction manque d’exemple sur l’emploi de la fonction.  

Après quelques tests, il suffit d’encadrer le contenu personnalisé par une condition, et demander d’afficher à la place le formulaire du mot de passe tant que la condition n’est pas remplie : 

```php
<?php 
if ( post_password_required() ) :
    echo get_the_password_form();
else : ?>
  … contenu…
<?php endif; ?>
```

Plus simple encore : si la page utilise les fonctions, *the_title()* ou *the_content()*, elle vont déclencher automatiquement l’apparition du formulaire.
Sur la page du codex, se trouve les options permettant de personnaliser le formulaire et les messages d’avertissement.

Cette fonction ancienne et un peu oubliée garde de l’intérêt par sa simplicité de mise en oeuvre (pas de plugin, disponible par défaut) et se justifie si l’on a besoin d’un simple cadenas plutôt que d’un coffre-fort !

<aside class="notes">
<h2>Notes</h2>
<ul>
<li id="note01">

Codex Wordpress : [using password protection](https://codex.wordpress.org/Using_Password_Protection)

</li>
</ul>
</aside>
