
# TP2 – Application Web de Téléséries

## Général

Ce projet consiste à développer un site web de type Netflix/Crunchyroll où des utilisateurs peuvent s'inscrire, consulter et regarder des téléséries.

- **API utilisée** : [https://tvshowdbapi.herokuapp.com/](https://tvshowdbapi.herokuapp.com/)

---

## Objectifs

- Développer un site web interactif pour l’affichage et le visionnement de téléséries.
- Appliquer les bonnes pratiques React :
  - Un seul composant par fichier
  - Code clair et maintenable
  - Pas d’erreurs ni de warnings React
  - Pas de violations ESLint

---

## Structure du projet

### Pages principales

#### Home.jsx

- Affiche toutes les téléséries disponibles via `/tvshows`.
- Filtres disponibles :
  - **Titre** : recherche insensible à la casse
  - **Studio** : sélection à partir d’une liste récupérée via `/studios`
- Affichage responsive :
  - Desktop : 4 séries/ligne
  - Tablette : 3 séries/ligne
  - Mobile : 2 séries/ligne
- Pagination : 8 séries par page par défaut, ajustable à 4, 8, 12 ou 16 séries.

#### Details.jsx

- Affiche les détails d’une série via `/tvshow?tvshowId=X`
- Informations visibles :
  - Titre, année, nombre d’épisodes, genres, studio, description, image
  - Lecture automatique de la bande sonore (audioURL)
- Affichage des acteurs avec barre de défilement horizontale
- Affichage des saisons avec barre de défilement horizontale et composants dédiés

#### Season.jsx

- Affiche les épisodes d’une saison via `/episodes?seasonId=X`
- Affichage responsive :
  - Desktop : 4 épisodes/ligne
  - Tablette : 3 épisodes/ligne
  - Mobile : 2 épisodes/ligne
- Pagination : 8 épisodes par page
- Indication des épisodes déjà visionnés pour les utilisateurs connectés

#### JouerEpisode.jsx

- Permet de regarder un épisode via `/viewepisode?episodeId=X`
- Utilise un jeton pour authentification
- Les épisodes visionnés sont ajoutés à l’historique de l’utilisateur

#### History.jsx

- Affiche l’historique de visionnement via `/user/history`
- Pagination : 6 épisodes par page
- Affichage responsive :
  - Tablette ou supérieur : 3 épisodes/ligne
  - Mobile : 2 épisodes/ligne
- Stockage des données dans un contexte global pour réutilisation dans Season

#### Login.jsx

- Authentifie l’utilisateur et récupère un jeton
- Validation des champs obligatoire
- Jeton sauvegardé dans le contexte global et localStorage
- Bouton annuler redirige vers Home

#### SignUp.jsx

- Permet de créer un compte via `/auth/register`
- Validation complète des champs :
  - Courriel valide (@, 5-50 caractères)
  - Username obligatoire, commence par une lettre, 5-30 caractères
  - Mot de passe avec caractères spéciaux, 8-30 caractères, non compromis
  - Mot de passe de confirmation identique
- Redirige vers Login après inscription réussie

#### About.jsx

- Suggestions pour améliorations ou fonctionnalités supplémentaires

---

### Composants réutilisables

- **Menu** : visible sur toutes les pages
  - Non-authentifié : Home, SignUp, Login, About
  - Authentifié : Home, History, Profile, Logout, About
- **TvShow** : affichage d’une série
- **Episode** : affichage d’un épisode
- **Actor** : affichage d’un acteur avec son rôle
- **Season** : affichage d’une saison

---

## Accessibilité

- Utilisation de l’attribut `role` pour identifier les parties de la page
- `alt` pour toutes les images
- `aria-required` pour les champs obligatoires
- `aria-describedby` pour les messages d’erreur
- Messages d’erreur accessibles via tabulation et focus

---

## Technologies

- React
- Bulma CSS pour le style
- API REST externe
- Context API pour le stockage global du jeton et de l’historique

---

## Déploiement

1. Générer l’application :

```bash
npm run build
```
