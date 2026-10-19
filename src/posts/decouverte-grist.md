---
title: Grist, un game-changer pour le service public ?
date: 2026-10-19
description: Six mois à construire une application avec Grist et à échanger avec des agents qui l’utilisent de trois façons différentes.
---

## 1. Ma découverte de Grist

### 1.1. Nouvelle mission, nouvel outil.

Avril 2026, je trouve une nouvelle mission pour l’incubateur d’un ministère de l’État. L’objectif est de construire de zéro un outil pour un groupe de travail inter-administration de l’État : les Cellules Régionales Biomasse (CRB). Les agents CRB instruisent les demandes de subventions pour des projets utilisant de la biomasse. Par exemple, la mairie de ma ville (Anglet, dans le 64) a fait la demande de cette subvention lorsqu’elle a entrepris la construction de sa piscine municipale chauffée au bois.

L’application que l’on souhaite construire vise, entre autres, à centraliser et structurer les données de ces demandes de subvention, permettant aux agents d’avoir des données plus robustes pour leurs analyses et de produire un avis solide pour la préfecture.

Dans la description de cette mission, une consigne claire : construire le M.V.P. (Minimum Valuable Product, le produit avec une valeur ajoutée minimale) à l’aide de l’outil Grist.

Bien que Grist fasse partie des services de LaSuite depuis fin 2022, je ne le découvre qu’au moment de postuler pour la mission. Je découvre une façon intuitive et rapide de créer des tables de données.

> 👉 Pour ceux et celles qui ne connaissent pas Grist, il s’agit d’un outil open source à la croisée des chemins entre un tableur et une base de données. Il permet de créer des tables de données, avec des colonnes typées, de lier ces tables entre elles, avec des références, et d’afficher ces données sous différentes formes (tables, formulaires, cartes…), tout ça sans coder. (Pour en savoir plus, je vous invite à consulter la documentation officielle).

> 👉 À noter : il faut distinguer Grist créé par Grist Labs, le logiciel libre et open source, de Grist, l’outil de LaSuite. Grist (LaSuite) est une instance de Grist (l’outil open source) hébergée par la direction interministérielle du numérique (DINUM). Les agents de la fonction publique utilisent donc Grist, qui est un « dérivé ».

### 1.2. Grist un outil no-code… ou presque.

Utiliser Grist pour construire l’application était à la fois un atout et un frein.

Il était pratique et flexible pour la construction de la base de données. Dans le cadre de cette mission, nous étions une équipe de 3 dont un seul profil « tech » et les spécifications métiers encadrant les besoins des utilisateurs n’étaient pas précisément décrites. Chaque CRB a sa propre manière de fonctionner et d’instruire des dossiers, chaque agent a ses propres critères.

Je délègue à Grist la gestion de l’authentification et des permissions, grâce à sa fonctionnalité de permissions avancées.

Grist propose des widgets « tables », « formulaires » et d’autres widgets personnalisés approuvés par la DINUM.

Le problème, c’est que l’on souhaite créer une application avec des fonctionnalités avancées, comme la recherche avancée de dossiers selon certains critères, des statistiques selon des paramètres dynamiques personnels à chaque utilisateur et un formulaire complexe en plusieurs étapes avec des champs liste, liste multiple…

C’est là que le code rentre en jeu, car on décide d’utiliser la fonctionnalité des « widgets personnalisés ».

> 👉 Un widget personnalisé dans Grist est un bout de code qui permet d’afficher n’importe quelle donnée du document Grist de la manière que l’on souhaite, grâce à l’API plugin de Grist.

### 1.3. Des limites dans la création d’une application web

Dans ce contexte, l’interface de Grist semble bloquante :

- Limitée à l’instance hébergée par la DINUM, il est impossible de personnaliser l’aspect ou le contenu de la barre de navigation, de l’en-tête et des boutons d’actions.
- La navigation entre les pages d’un document Grist via un bouton sur le widget personnalisé ne peut pas se faire de manière fluide sans rechargement.
- La sélection d’une ligne sur une table entre deux pages n’est pas conservée. Dans notre cas concret, on souhaite rendre fluide la création d’un plan d’approvisionnement lié à une demande de subvention. Il faut donc : créer le plan, créer les pièces jointes, créer les approvisionnements (les lignes qui décrivent qui fournit combien de biomasse pour la demande), créer la subvention à laquelle le plan est lié, créer les instructions (qui instruit la demande et quelles étapes de l’instruction ont été faites). Au total, 5 tables à modifier. On a donc pensé à créer plusieurs pages définissant chaque étape de l’intégration d’un nouveau plan, mais comme la sélection du plan n’est pas conservée entre chaque page, l’utilisateur doit resélectionner le plan à chaque étape.
- Les widgets personnalisés sont limités à la fenêtre qui les entoure, ce qui oblige à créer des interfaces très légères ou compactes. Après des itérations vaines à utiliser plusieurs petits widgets personnalisés sur une même page, on décide de poser la règle : « un seul widget personnalisé par page ».

De mon côté, je tente d’appliquer les pratiques classiques de développement à cette application hybride mi-document Grist, mi-base de code classique (celle qui définit les widgets personnalisés).

- Comment créer et gérer un environnement de développement, un environnement de préproduction et un environnement de production ?
- Comment suivre les interactions des utilisateurs dans ce contexte ?
- Comment remonter et suivre les erreurs ?
- Comment faire une mise en production propre ?

Pendant l’été, je profite du calme des bureaux pour passer plus de temps à creuser ces questions avec la communauté Grist.

## 2. Trois façons d’utiliser Grist pour créer une application

En échangeant avec des développeurs et des agents utilisant Grist, je me rends compte que l’outil peut être utilisé de 3 manières différentes, qu’on appellera « modes ».

**Mode 1 : Grist comme application complète.** Grist sert à la fois de base de données, de back-end et d’interface utilisateur. Les agents utilisent directement ses pages, ses tables, ses formulaires et, si besoin, des widgets personnalisés.

**Mode 2 : Grist comme back-end d’une application sur mesure.** L’interface est développée en dehors de Grist, qui prend en charge les données, les permissions et une partie de la sécurité. Les utilisateurs finaux utilisent l’application sur mesure, sans naviguer dans l’interface native de Grist.

**Mode 3 : Grist comme base de données.** Grist sert uniquement à stocker et structurer les données. L’interface, la logique métier et le reste du back-end sont développés en dehors de Grist, via son API.

J’ai notamment eu l’occasion d’échanger avec 3 agents qui ont chacun crée une application avec Grist dans ces trois modes de fonctionnements.

### 2.1 Mode 1 : Grist comme application complète : suivre des missions déléguées

André Gauffier n’est pas développeur de métier, et pourtant il a construit une partie de son application en un week-end, sur Grist.

Son administration doit suivre et superviser des missions relevant de la responsabilité de l’État, mais dont la réalisation est déléguée à un organisme vétérinaire à vocation technique (OVVT). Elle doit pouvoir collaborer avec les représentants des vétérinaires de la région et suivre les missions prévues par leur convention.

Dans ce contexte, Grist sert à la fois de base de données et d’interface utilisateur. Les utilisateurs naviguent entre les différentes pages du document. Les vues alternent entre les fonctionnalités natives de Grist et des widgets personnalisés. L’application comprend notamment des formulaires et des intégrations avec Démarche Numérique via OTP.

En revanche, André remonte que la courbe d’apprentissage a été complexe pour les utilisateurs. Des tutoriels et des fiches ont été nécessaires, et la construction de l’outil a demandé de nombreuses itérations. La communication entre plusieurs documents Grist constitue également une limite, notamment pour partager des tables de données de référence.

### 2.2 Mode 2 : Grist comme back-end d’une application sur mesure : gérer les arrivées et les départs

L’objectif de cette application est de gérer les arrivées, les départs et les mouvements des agents (changement d’étage, changement de poste, mutation interne…) impliquent plusieurs services et interlocuteurs. Il faut organiser leurs interventions et construire un workflow adapté.

Kada Sahnine, chef du pôle informatique du service des douanes, utilise Grist pour gérer ce processus d’arrivée et de départ.

Dans cette configuration, Kada est la seule personne à manipuler le document Grist. Les utilisateurs finaux n’ont accès qu’au custom widget, dont l’interface est configurable dans les tables du document.

Pour Kada, cette approche permet de développer facilement une interface adaptée aux besoins, en utilisant des bibliothèques JavaScript. Il constate des problèmes de lenteur et le même besoin faire communiquer les documents Grists entre eux.

### 2.3 Mode 3 : Grist comme base de données : centraliser les données de plusieurs services

Christophe Cardona n’est pas développeur, c’est un agent des impôts (plus précisément, de la DRFiP). Lui et son équipe vient en support des agents de la S.I.E., les agents qui s’occupent des problèmes des impôts des entreprises.

Christophe Cardona conçoit alors PILOT qui utilise Grist comme base de données et comme back-office d’audit. Grist permet de construire rapidement un socle commun de données structurées. Les tables, les colonnes et l’API REST permettent de mettre ces données à disposition de plusieurs services et applications. Les données sont stockées dans un environnement souverain fourni par la DGFiP.

Un serveur Python récupère ensuite les données de ce socle commun pour proposer des fonctionnalités plus avancées. Plusieurs documents Grist partagent les données, ce qui permet de les rendre accessibles aux différents services.

**Ce que PILOT utilise :** Les tables, les colonnes, l’API REST, les droits par document, les pièces jointes, et les vues Grist pour l’audit et le dépannage.

**Ce que PILOT n’utilise pas :** Les widgets et les pages Grist comme interface agent, les formules Grist pour la règle métier — elle vit dans le code, testée et versionnée.

#### Les résultats

Les données sont structurées et partagées entre les différents services. Lorsqu’un agent met à jour une donnée, les autres agents peuvent accéder à cette mise à jour. Grist fournit ainsi un socle de données commun, tandis que la logique métier et les fonctionnalités avancées sont développées en dehors de Grist.

## Bilan : est-ce que Grist est game-changer ?

Après plus de 6 mois à utiliser Grist dans mon travail et à échanger avec des utilisateurs aux profils techniques et non techniques, est-ce que je peux affirmer que Grist est l’outil à adopter pour créer des applications ou des projets ?

Je constate qu’il résout des problèmes classiques :

- Il permet de structurer la donnée et donc savoir ce qu’on fait et de normaliser les processus. Comme l’outil est simple d’utilisation, et que chaque colonne est typée, il est oblige à se poser des questions et à homogénéiser les pratiques. Pour un agent CRB comment je définis un plan qui répond à une demande ? Quelles sont les ressources de biomasse qui peuvent être mises en jeu ?
- Il permet de collaborer sur un même document entre plusieurs services facilement. Fini les excels avec les versions divergentes, ressaisies, absence d’historique fiable, risques d’écrasement, de suppression ou de déplacement involontaire des fichiers principaux, consolidations manuelles longues et pratiques hétérogènes entre services.
- Il centralise la donnée : les données manipulées par les agents dans la plupart des services ne sont pas centralisées ni structurées. Par exemple, dans le cadre des agents des SIE : une entreprise est radiée, cette information est entrée dans un outil A mais comme cet outil n’est pas forcément lié aux autres outils, l’information n’est pas communiquée.

Mais c’était déjà le cas avec des applications fullstack classiques.

### Alors pourquoi choisir Grist ?

De manière générale, je trouve que Grist est un bon outil pour remplacer Excel lorsqu’on souhaite gérer des données structurées et n’afficher que des tables et des formulaires. À titre personnel, je l’utilise maintenant quotidiennement : j’ai migré mon suivi de dépenses et je l’utilise aussi pour planifier et gérer mes voyages.

Je pense que Grist est aussi un outil intéressant pour créer des MVP. J’ai parlé à quelques agents qui ont pu répondre rapidement à un besoin urgent grâce à un document Grist.

Mais pour créer des fonctionnalités plus complexes, je suis encore en cours de réflexion.

La question est peut-être plutôt… pourquoi choisir Grist dans le service publique.

Je vois 3 raisons :

- Grist est un outil qui fonctionne très bien avec une interface correcte. J’ai constaté très peu de lenteur ou de bug, et l’interface n’est pas celle d’un outil désuet.
- Grist est simple, intuitif et souverain. Il accélère le développement d’applications métiers prend du temps dans une administration : au-delà des difficultés habituelles du développement d’applications, les outils utilisés par les agents publics doivent respecter les exigences de souveraineté et de sécurité des données. De plus, même si les agents connaissent leur métier et savent ce dont ils ont besoin (ce sont des magiciens de l’Excel) mais ils n’ont pas nécessairement les compétences techniques ou le temps nécessaire pour les acquérir pour créer et manipuler des bases de données.
- Grist fait partie de LaSuite. Cela peut paraître anecdotique, mais ce contexte facilite son utilisation auprès des agents, de plus des intégrations plus étroites entre les autres outils comme Docs ou Fichiers.

On pourrait alors se dire que Grist est l’outil miracle et encourager son utilisation. Mais la floraison de multiples projets Grist peut poser des problèmes d’encadrement, de maintenance et de contrôle. Cet enjeu sera sûrement pris en compte dans les mois à venir, car l’outil est de plus en plus utilisé dans le service. Il est notamment activement déployé au sein du Ministère de l’éducation.

Pour certains utilisateurs au profil moins tech, la prise en main de l’outil est fastidieuse.

Est-ce que ça vaut le coup de passer du temps à les faire monter en compétence ?

Je reste très enthousiaste quand à l’évolution du produit et devrais être présente au forum Grist.Gouv à Toulouse le Vendredi 13 novembre.
