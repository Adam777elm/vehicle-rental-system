# Master Prompt & Spécifications du Projet - AA Motors

Ce document compile toutes les spécifications fonctionnelles, techniques et esthétiques du projet **AA Motors** (système de location et de vente de véhicules). Il peut être utilisé comme prompt de référence pour recréer le projet ou l'expliquer en détail à un modèle de langage.

---

## 1. Vision et Identité Visuelle

**AA Motors** est un concessionnaire et service de location de motos et véhicules marins haut de gamme basé au Maroc.
- **Thème esthétique** : Premium Dark (Abyss). Le site utilise des fonds sombres et profonds, agrémentés de lueurs néons rouges (Yamaha Racing) et bleues (Yamaha Marine), avec des polices modernes (*Inter* et *Outfit*).
- **Light Mode** : Un basculement global est géré via la classe `body.light-mode` qui surcharge les couleurs de fond en blanc/gris clair et adapte les textes en noir/anthracite.
- **Animations** : Transitions fluides en fondu (`fadeInPage` via CSS animations) lors du chargement des pages pour un effet moderne et "wow".

---

## 2. Architecture Technique et Dépendances

### Backend (`/backend`)
- **Framework** : Node.js avec Express.
- **Base de données** : MongoDB via Mongoose.
- **Sécurité & Authentification** : Cryptage des mots de passe avec `bcryptjs` et gestion des sessions avec JSON Web Tokens (`jsonwebtoken`).
- **Uploads d'images** : Gestion via `multer` stockant les fichiers dans un dossier public d'images.
- **Moteur d'IA** : Intégration de l'API Google Gemini via `@google/generative-ai`.
- **Variables d'environnement (`.env`)** :
  ```env
  PORT=5000
  MONGO_URL=<connection_string>
  JWT_SECRET=<jwt_secret>
  GEMINI_API_KEY=<gemini_api_key>
  ```

### Frontend (`/frontend`)
- **Framework** : React.js.
- **Routage** : `react-router-dom` pour la navigation entre les pages.
- **Stylisation** : Fichiers CSS vanille dédiés par page (dans `/pages/CSS/`) et styles globaux dans `index.css`.
- **Persistance** : Utilisation du `localStorage` pour stocker le panier (`pfa_cart`), les jetons d'authentification (`token`) et les informations promotionnelles.

---

## 3. Fonctionnalités Clés et Rôles des Pages

### A. Navigation & En-tête (`Navbar.js`)
- **Barre de navigation supérieure** : Sticky, s'efface lors du défilement vers le bas et réapparaît lors de la remontée.
- **Menu mobile plein écran** : Overlay accessible via un bouton hamburger.
- **Recherche prédictive** : Autocomplétion dynamique se basant sur le catalogue de véhicules pour suggérer instantanément des modèles lors de la saisie.
- **Barre de navigation inférieure (Mobile)** : Fixée en bas de l'écran avec 4 onglets tactiles rapides (Accueil, Motos, Panier, Profil).

### B. Assistant IA Virtuel
- **Système de Chat** : L'activation de l'interrupteur "Ai Agent" dans le menu affiche une barre de prompt en bas de l'écran. La soumission d'une question ouvre un panneau de discussion coulissant (drawer) à droite.
- **Backend d'IA (`chatRoutes.js`)** : Interroge le modèle `gemini-2.5-flash`.
- **Prompt Système** : Restreint l'IA aux sujets liés à AA Motors (gammes neuves, location, circuits guidés au Maroc, marketplace d'occasion et contact WhatsApp). Si l'utilisateur pose une question hors-sujet, l'IA décline poliment en expliquant son rôle. Les comparaisons de modèles sont obligatoirement formatées sous forme de tableaux Markdown.

### C. Fiche Produit Vente & Spécifications (`MotoDetail.js`)
- **Choix de couleur dynamique** : Des pastilles interactives affichent les images correspondantes. *Note : Pour la MT-09 SP et la MT-10 SP, seule la couleur exclusive "Icon Performance" est disponible.*
- **Fiche Technique Collapsible** : Une liste verticale très propre contenant au moins 10 spécifications clés de la moto. Le conteneur se replie/déplie de manière animée via un bouton d'en-tête doté d'une flèche (up/down).
- **Showcase Image** : Une bannière grand format présentant une vue officielle haute définition de la moto (comme l'image officielle pour la MT-10 SP).

### D. Espace Location & Trips Guidés (`LocationTrips.js` & `RentalDetail.js`)
- **Location de véhicules** : Grille filtrable par catégorie (Scooters, Roadsters, Tous).
- **Formulaire de réservation** : Calculateur de prix dynamique basé sur les dates choisies avec récapitulatif du total et envoi du devis directement pré-rempli vers le WhatsApp officiel de AA Motors.
- **Trips Organisés** : Présentation de packs touristiques (Route de l'Atlas, Essaouira Ride, Sahara Express) avec durées et tarifs par personne.

### E. Marketplace d'occasion (`Marketplace.js`)
- Espace communautaire permettant aux utilisateurs connectés de publier des petites annonces, d'ajouter des photos, des détails (kilométrage, année, ville) et de contacter les vendeurs.

### F. Panier d'achat (`Cart.js`)
- Récapitulatif des articles sélectionnés avec option de quantité, retrait, calcul du sous-total, application de codes promotionnels (code `AA3PROMO` offrant 3% de remise) et envoi de la commande finale formatée sur WhatsApp.

---

## 4. Règles Cruciales de Réactivité Mobile (Design System Mobile)

Voici les techniques d'adaptation mobile appliquées pour garantir un affichage premium et sans débordement (overflow) :

1. **Stacking Vertical des Boutons et CTA** : 
   - Sur mobile (largeur `< 768px`), les boutons disposés côte à côte (ex: boutons "Explore Fleet" et "Plan a Trip" de la page d'accueil ou "Découvrir la flotte" et "Mes réservations" sur Location) doivent s'empiler verticalement avec `flex-direction: column` et prendre `width: 100%`.
2. **Gestion du Z-Index de la Navigation Mobile** :
   - La classe `.bottom-nav` doit posséder un `z-index` très élevé (`10010`) et la propriété `pointer-events: auto` pour rester cliquable et visible au-dessus des animations de fondu de page (`fadeInPage`) et des éléments de pied de page (`Footer`).
3. **Optimisation des Images Produit** :
   - Afin d'éviter que l'image du véhicule ne repousse les contrôles d'achat (Ajouter au panier, sélection de quantité) sous la ligne de flottaison (fold) sur mobile, la hauteur du conteneur d'image `.main-image-container` est contrainte à un aspect ratio de `4/3` avec un `max-height` (ex: `280px`).
4. **Centrage du Contenu des Cartes** :
   - Les informations textuelles et les boutons d'action des cartes produits/catégories s'alignent au centre sur mobile (`display: flex; flex-direction: column; align-items: center; text-align: center;`) pour une meilleure symétrie visuelle sur une seule colonne.
5. **Formulaires et Codes Promos** :
   - Les formulaires dotés de champs côte à côte s'empilent verticalement sur mobile (`.cart-promo-form` de la page panier ou `.trips-form-row` du formulaire de devis).
