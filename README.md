# AA Motors 🏍️ - Vehicle Rental & Sales System

![Project Status](https://img.shields.io/badge/Status-En_Production-success) 
![Stack](https://img.shields.io/badge/Stack-MERN-blue) 
![Frontend Deploy](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![Backend Deploy](https://img.shields.io/badge/Render-Deployed-purple?logo=render)

Un projet complet Full-Stack (MERN) développé dans le cadre d'un **Projet de Fin d'Études (PFA)**. L'application "*AA Motors*" permet aux utilisateurs de parcourir, louer ou acheter des motos, scooters, jet-skis et équipements avec un design ultra professionnel orienté "Mobile-First".

---

## 📸 Aperçu du Projet
Le projet présente une esthétique "*Dark Mode Native*" inspirée de la scène moto haut de gamme (Yamaha, TMAX). 
Il inclut un design adaptatif fluide (Responsive), des barres de navigation natives pour mobile (Bottom Nav), du menu Hamburger, des "Skeletons" de chargement et un bouton flottant de contact WhatsApp.

## 🛠 Données Techniques (Stack)

Le projet utilise l'architecture technologique **MERN** (*MongoDB, Express, React, Node.js*).

### 🖥 Frontend (Dossier `/frontend`)
- **React.js** : Librairie principale pour construire les interfaces dynamiques.
- **React Router DOM** : Gestion de la navigation entre les pages de véhicules.
- **Axios** : Client HTTP intelligent avec requêtes dynamiques vers Vercel ou IP locale.
- **CSS Vanilla (Flexbox & Grid)** : Utilisation poussée de CSS pur sans frameworks lourds pour assurer des performances maximales et un design sur-mesure hyper fluide.
- **Animations** : Effets de scroll "Reveal", Skeletons UI pour l'attente du chargement réseau.
- **Hébergement :** Déployé automatiquement via **[Vercel](https://vercel.com/)**.

### ⚙️ Backend (Dossier `/backend`)
- **Node.js & Express.js** : Architecture de l'API RESTful.
- **Bcrypt (bcryptjs)** : Cryptage sécurisé unidirectionnel des mots de passe.
- **JWT (JSON Web Token)** : Gestion des tokens de session sécurisés pour la connexion et persistance de l'utilisateur.
- **Mongoose** : Modélisation (ODM) orientée objet de l'architecture base de données.
- **CORS** : Configuration réseau acceptant des connexions mobiles (Vercel) et locales (HTTP).
- **Hébergement :** Déployé via **[Render.com](https://render.com/)**.

### 🗄 Base de Données
- **MongoDB Atlas** : Base de données NoSQL distribuée dans le Cloud (Cluster). Utilisée pour stocker les véhicules, l'inventaire, les réservations et les identifiants utilisateurs.

---

## 🗂 Architecture des Dossiers

```text
projet-pfa/
├── backend/                  # Serveur API Node.js/Express
│   ├── config/               # Connexion DB (db.js)
│   ├── controllers/          # Logique d'affaire (ex: userController)
│   ├── models/               # Schémas Mongoose (User, Vehicle, Reservation)
│   ├── routes/               # Endpoints de l'API
│   └── server.js             # Point d'entrée principal du serveur
│
├── frontend/                 # Application client React
│   ├── public/               # Logos AA Motors et fichier HTML central
│   └── src/
│       ├── assets/           # Médias locaux (HOME_IMG, MOTO_IMG, MARINE_IMG...)
│       ├── components/       # Composants réutilisables (Navbar, Footer...)
│       ├── pages/            # Écrans Vue (Home, Motos, Login, Marine...)
│       ├── services/         # Appels Axios vers le backend (api.js)
│       ├── App.js            # Routage principal
│       └── index.css         # Reset CSS global et classes partagées
│
└── README.md                 # Documentation globale
```

---

## 🚀 Guide d'Installation (Local)

Pour faire tourner le projet confortablement sur votre machine :

### 1. Cloner le Projet
```bash
git clone https://github.com/Adam777elm/vehicle-rental-system.git
cd projet-pfa
```

### 2. Démarrer le Backend
```bash
cd backend
npm install
npm start
```
*(Le backend tourne sur `http://localhost:5000`)*

### 3. Démarrer le Frontend (Ouvrir un 2ème terminal)
```bash
cd frontend
npm install
npm start
```
*(Le navigateur s'ouvrira sur `http://localhost:3000` avec l'application fonctionnelle !)*

---

## 🌟 Fonctionnalités Principales Développées
1. **Compte Utilisateur** : Création et Connexion sécurisées de l'emprunteur (JWT stockés dans le stockage local).
2. **Interface Mobile-First** : Expérience ergonomique pour smartphone avec la *Bottom Navigation Bar* et le menu glissant sans aucun lag horizontal.
3. **Logique Réseau Intelligente** : Détection auto (soit `.vercel.app`, soit IP Réseau Local ex.`192.168.1.X`) permettant le test au doigt par Wifi ou de s'interfacer spontanément à la base de données.
4. **Catalogue Varié** : 
   - Gamme Yamaha Motos (Supersport, Roadster, Touring, Off-Road) et Scooters (TMAX).
   - Gamme Marine (Jetski).
   - Équipements de course et lifestyle.

---
*Ce projet démontre une pleine maîtrise du développement Full-Stack, de l'UX/UI Design moderne (mode sombre premium) ainsi que de l'implémentation de processus Cloud (Vercel/Render/Atlas).*
