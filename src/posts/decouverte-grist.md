---
title: Grist dans le service public (mais pas que) : trois façons de créer une application
date: 2026-10-19
description: Six mois à construire une application avec Grist et à échanger avec des développeurs et des agents de la fonction publique qui l’utilisent. 3 manières d'utiliser Grist dans la création d'application sont ressorties : comme application complète, construite par les agents eux-mêmes ; comme back-end d'une interface développée sur mesure ; ou comme base de données partagée entre plusieurs services.
---

**Sommaire**

- [1. Ma découverte de Grist](#1-ma-decouverte-de-grist)
  - [1.1. Une nouvelle mission Freelance sauvage apparaît](#11-une-nouvelle-mission-freelance-sauvage-apparait)
  - [1.2. Grist un outil no-code… ou presque](#12-grist-un-outil-no-code-ou-presque)
  - [1.3. Des limites dans la création d’une application web](#13-des-limites-dans-la-creation-dune-application-web)
- [2. Trois façons d’utiliser Grist pour créer une application](#2-trois-facons-dutiliser-grist-pour-creer-une-application)
  - [2.1. Mode 1 : Grist comme application complète](#21-mode-1-grist-comme-application-complete-suivre-des-missions-deleguees)
  - [2.2. Mode 2 : Grist comme back-end d’une application sur mesure](#22-mode-2-grist-comme-back-end-dune-application-sur-mesure-gerer-les-arrivees-et-les-departs)
  - [2.3. Mode 3 : Grist comme base de données](#23-mode-3-grist-comme-base-de-donnees-centraliser-les-donnees-de-plusieurs-services)
  - [2.4. Conclusion](#24-conclusion)
- [Bilan : est-ce que Grist est game-changer ?](#bilan-est-ce-que-grist-est-game-changer)
  - [Des problèmes classiques résolus](#des-problemes-classiques-resolus)
  - [Alors pourquoi choisir Grist ?](#alors-pourquoi-choisir-grist)
  - [Pourquoi Grist dans le service public ?](#pourquoi-grist-dans-le-service-public)
  - [Les limites](#les-limites)
  - [Et la suite ?](#et-la-suite)
- [Contacts](#contacts)
- [Glossaire](#glossaire)

## 1. Ma découverte de Grist

### 1.1. Une nouvelle mission Freelance sauvage apparaît

Avril 2026, je commence une nouveau projet pour l’incubateur d’un ministère de l’État : construire un outil numérique de zéro pour les agents publics des Cellules Régionales Biomasse (CRB), un groupe de travail inter-administration de l’État.

Les agents CRB instruisent les demandes de subventions pour des porteur de projets voulant utiliser de la biomasse. Par exemple, la mairie d'Anglet a récemment fait cette demande pour la construction de sa piscine municipale chauffée au bois.

L’objectif est de centraliser et structurer les données de ces demandes de subvention, permettant aux agents de produire des avis solide pour la préfecture.

Une consigne technique claire : construire le M.V.P. (Minimum Valuable Product, le produit avec une valeur ajoutée minimale) sur Grist.

> 👉 Pour ceux et celles qui ne connaissent pas Grist, il s’agit d’un outil open source à la croisée des chemins entre un tableur et une base de données. Plus d'information [ici](https://www.getgrist.com/product/).

Grist possède tout ce qu'il faut pour créer des interfaces sans coder : des outils pour créer et lier des données, des vues pour les afficher, des permissions avancées... Pourtant, mon expérience de développeuse va s'avérer utile pour la suite.

### 1.2. Grist un outil no-code… ou presque

Utiliser Grist pour construire l’application était à la fois un atout et un frein.

Il était pratique et flexible pour la construction de la base de données. Dans le cadre de cette mission, nous sommes une équipe de 3 (une personne produit, une personne tech et un agent public) et les spécifications métiers encadrant les besoins des utilisateurs sont encore en construction. Comme chaque CRB a sa propre manière de fonctionner et d’instruire des dossiers, rien n'est encore gravé dans le marbre.

Je délègue à Grist la gestion de l’authentification et des permissions, grâce à sa fonctionnalité de permissions avancées.

Grist propose des widgets « tables », « formulaires » et d’autres widgets personnalisés approuvés par la DINUM.

Le problème, c’est que l’on souhaite créer une application avec des fonctionnalités avancées.

Par exemple, on veut créer une recherche avancée de dossiers selon certains critères, des statistiques selon des paramètres dynamiques spécifiques à chaque utilisateur et un formulaire complexe en plusieurs étapes avec des champs liste, liste multiple…

C’est là qu'on décide d’utiliser la fonctionnalité des « widgets personnalisés ».

> 👉 Un [widget personnalisé](https://support.getgrist.com/fr/widget-custom/) dans Grist est un bout de code qui permet d’afficher n’importe quelle donnée du document Grist de la manière que l’on souhaite, grâce à l’API plugin de Grist.

### 1.3. Des limites dans la création d’une application web

Dans ce contexte, l’interface de Grist semble bloquante côté expérience utilisateur :

- Limitée à l’instance hébergée par la DINUM, il est impossible de personnaliser l’aspect ou le contenu de la barre de navigation, de l’en-tête et des boutons d’actions.
- La navigation entre les pages d’un document Grist via un bouton sur le widget personnalisé ne peut pas se faire de manière fluide sans rechargement.
- La sélection d’une ligne sur une table entre deux pages n’est pas conservée, ce qui empêche de créer des parcours utilisateurs entre les pages sur une même donnée sélectionnée.
- Les widgets personnalisés sont limités à la fenêtre qui les entoure, ce qui oblige à créer des interfaces très légères ou compactes.

Grist pose aussi des enjeux techniques. Je tente d’appliquer les pratiques classiques à cette application hybride mi-document Grist, mi-base de code classique (celle qui définit les widgets personnalisés).

Le calme de l'été me donne plus de temps à creuser ces questions avec la communauté Grist.

## 2. Trois façons d’utiliser Grist pour créer une application

En échangeant avec des développeurs et des agents utilisant Grist, je me rends compte que l’outil peut être utilisé de 3 manières différentes, qu’on appellera « modes » :

- **Mode 1 : Grist comme application complète.** Grist sert à la fois de base de données, de back-end et d’interface utilisateur. Les agents utilisent directement ses pages, ses tables, ses formulaires et, si besoin, des widgets personnalisés.
- **Mode 2 : Grist comme back-end d’une application sur mesure.** L’interface est développée en dehors de Grist, qui prend en charge les données, les permissions et une partie de la sécurité. Les utilisateurs finaux utilisent l’application sur mesure, sans naviguer dans l’interface native de Grist.
- **Mode 3 : Grist comme base de données.** Grist sert uniquement à stocker et structurer les données. L’interface, la logique métier et le reste du back-end sont développés en dehors de Grist, via son API.

> Ces trois modes ont été présentés en visioconférence à la GristCon 2026 : [voir la vidéo sur YouTube](https://www.youtube.com/watch?v=28M0RIUTzV8&t=20s).

Illustrons ces trois modes à travers des exemples concrets dans le service public.

### 2.1. Mode 1 : Grist comme application complète : suivre des missions déléguées

André Gauffier n’est pas développeur de métier, et pourtant il a construit une partie de son application en un week-end, sur Grist.

Son administration doit suivre et superviser des missions relevant de la responsabilité de l’État, mais dont la réalisation est déléguée à un organisme vétérinaire à vocation technique (OVVT). Elle doit pouvoir collaborer avec les représentants des vétérinaires de la région et suivre les missions prévues par leur convention.

Dans ce contexte, Grist sert à la fois de base de données et d’interface utilisateur. Les utilisateurs naviguent entre les différentes pages du document. Les vues alternent entre les fonctionnalités natives de Grist et des widgets personnalisés. L’application comprend notamment des formulaires et des intégrations avec Démarche Numérique via OTP.

### 2.2. Mode 2 : Grist comme back-end d’une application sur mesure : gérer les arrivées et les départs

L’objectif de cette application est de gérer les arrivées, les départs et les mouvements des agents (changement d’étage, changement de poste, mutation interne…), qui impliquent plusieurs services et interlocuteurs. Il faut organiser leurs interventions et construire un workflow adapté.

Kada Sahnine, chef du pôle informatique du service des douanes, utilise Grist pour gérer ce processus d’arrivée et de départ.

Dans cette configuration, Kada est la seule personne à manipuler le document Grist. Les utilisateurs finaux n’ont accès qu’au custom widget, dont l’interface est configurable dans les tables du document.

### 2.3. Mode 3 : Grist comme base de données : centraliser les données de plusieurs services

Christophe Cardona n’est pas développeur, c’est un agent des impôts (plus précisément, de la DRFiP). Lui et son équipe viennent en support des agents de la S.I.E., les agents qui s’occupent des problèmes des impôts des entreprises.

Christophe Cardona conçoit alors PILOT qui utilise Grist comme base de données et comme back-office d’audit. Grist permet de construire rapidement un socle commun de données structurées. Les tables, les colonnes et l’API REST permettent de mettre ces données à disposition de plusieurs services et applications. Les données sont stockées dans un environnement souverain fourni par la DGFiP.

Un serveur Python récupère ensuite les données de ce socle commun pour proposer des fonctionnalités plus avancées. Plusieurs documents Grist partagent les données, ce qui permet de les rendre accessibles aux différents services.

### 2.4. Conclusion

Chaque mode a ses compromis. Le mode 1 permet à des non-développeurs de construire leur propre application, mais demande de former les utilisateurs. Le mode 2 offre une interface sur mesure sans construire de back-end, mais ralentit quand les données grossissent. Le mode 3 crée un socle de données commun à plusieurs services, mais nécessite des développeurs. Dans tous les cas, Grist s’adapte à un budget serré, reste simple pour les agents et, comme il fait partie de LaSuite, couvre déjà la sécurité et la souveraineté, ce qui accélère le développement.

## Bilan : est-ce que Grist est game-changer ?

Après plus de 6 mois à utiliser Grist dans mon travail et à échanger avec des utilisateurs aux profils techniques et non techniques, est-ce que je peux affirmer que Grist est l’outil à adopter pour créer des applications ou des projets ?

### Des problèmes classiques résolus

Je constate qu’il résout des problèmes classiques :

- Il permet de structurer la donnée et donc savoir ce qu’on fait et de normaliser les processus. Comme l’outil est simple d’utilisation, et que chaque colonne est typée, il oblige à se poser des questions et à homogénéiser les pratiques. Pour un agent CRB comment je définis un plan qui répond à une demande ? Quelles sont les ressources de biomasse qui peuvent être mises en jeu ?
- Il permet de collaborer sur un même document entre plusieurs services facilement. Fini les excels avec les versions divergentes, ressaisies, absence d’historique fiable, risques d’écrasement, de suppression ou de déplacement involontaire des fichiers principaux, consolidations manuelles longues et pratiques hétérogènes entre services.
- Il centralise la donnée : les données manipulées par les agents dans la plupart des services ne sont pas centralisées ni structurées. Par exemple, dans le cadre des agents des SIE : une entreprise est radiée, cette information est entrée dans un outil A mais comme cet outil n’est pas forcément lié aux autres outils, l’information n’est pas communiquée.

Mais c’était déjà le cas avec des applications fullstack classiques.

### Alors pourquoi choisir Grist ?

De manière générale, je trouve que Grist est un bon outil pour remplacer Excel lorsqu’on souhaite gérer des données structurées et n’afficher que des tables et des formulaires. À titre personnel, je l’utilise maintenant quotidiennement : j’ai migré mon suivi de dépenses et je l’utilise aussi pour planifier et gérer mes voyages.

Je pense que Grist est aussi un outil intéressant pour créer des MVP. J’ai parlé à quelques agents qui ont pu répondre rapidement à un besoin urgent grâce à un document Grist.

Mais pour créer des fonctionnalités plus complexes, je suis encore en cours de réflexion.

### Pourquoi Grist dans le service public ?

La question est peut-être plutôt… pourquoi choisir Grist dans le service public ?

Je vois 3 raisons :

- Grist est un outil qui fonctionne très bien avec une interface correcte. J’ai constaté très peu de lenteur ou de bug, et l’interface n’est pas celle d’un outil désuet.
- Grist est simple, intuitif et souverain. Il accélère le développement d’applications métiers, qui prend du temps dans une administration : au-delà des difficultés habituelles du développement d’applications, les outils utilisés par les agents publics doivent respecter les exigences de souveraineté et de sécurité des données. De plus, les agents connaissent leur métier et savent ce dont ils ont besoin (ce sont des magiciens de l’Excel), mais ils n’ont pas nécessairement les compétences techniques, ni le temps de les acquérir, pour créer et manipuler des bases de données.
- Grist fait partie de LaSuite. Cela peut paraître anecdotique, mais ce contexte facilite son utilisation auprès des agents et permet des intégrations plus étroites avec les autres outils comme Docs ou Fichiers.

### Les limites

On pourrait alors se dire que Grist est l’outil miracle et encourager son utilisation. Mais la floraison de multiples projets Grist peut poser des problèmes d’encadrement, de maintenance et de contrôle. Cet enjeu sera sûrement pris en compte dans les mois à venir, car l’outil est de plus en plus utilisé dans le service. Il est notamment activement déployé au sein du Ministère de l’éducation.

Pour certains utilisateurs au profil moins tech, la prise en main de l’outil est fastidieuse.

Est-ce que ça vaut le coup de passer du temps à les faire monter en compétence ?

### Et la suite ?

Je reste très enthousiaste quant à l’évolution du produit et devrais être présente au [forum Grist.Gouv à Toulouse le vendredi 13 novembre](https://forum.grist.libre.sh/t/club-utilisateurs-grist-rendez-vous-a-toulouse-le-13-novembre-2026/4290).

## Contacts

- **André Gauffier**, agent public : [andre.gauffier@agriculture.gouv.fr](mailto:andre.gauffier@agriculture.gouv.fr)
- **Kada Sahnine**, agent public : [kada.sahnine@finances.gouv.fr](mailto:kada.sahnine@finances.gouv.fr)
- **Christophe Cardona**, agent des impôts (DGFiP), créateur de PILOT : [christophe.cardona@dgfip.finances.gouv.fr](mailto:christophe.cardona@dgfip.finances.gouv.fr)
- **Clémence Fernandez**, développeuse : [clemencefrz@gmail.com](mailto:clemencefrz@gmail.com) · [LinkedIn](https://www.linkedin.com/in/clemencefernandez/) · [forum Grist](https://community.getgrist.com/u/Clemence_Fernandez)

## Glossaire

- **API** (_Application Programming Interface_) : interface qui permet à des programmes d’échanger des données entre eux.
- **API REST** : API qui suit les conventions du web (adresses et requêtes HTTP) pour lire et modifier des données.
- **CRB** : Cellules Régionales Biomasse.
- **DGFiP** : Direction générale des Finances publiques.
- **DINUM** : Direction interministérielle du numérique.
- **DRFiP** : Direction régionale des Finances publiques.
- **MVP** (_Minimum Viable Product_) : première version d’un produit, avec juste assez de fonctionnalités pour être utilisée et recueillir des retours.
- **OVVT** : organisme vétérinaire à vocation technique.
- **SIE** : Service des impôts des entreprises.
