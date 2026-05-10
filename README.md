# 💻 Digital Banking Web

Interface frontend moderne pour une application bancaire en ligne, développée avec **Angular 21** et **Bootstrap 5**. Ce projet constitue la partie client (SPA) qui consomme l'API REST du backend [ebanking-backend](https://github.com/GHIZLANETHR/ebanking-backend).

---

## 📋 Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancer l'application](#lancer-lapplication)
- [Build de production](#build-de-production)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)
- [Connexion avec le backend](#connexion-avec-le-backend)
- [Authentification JWT](#authentification-jwt)

---

## 📌 Aperçu du projet

**Digital Banking Web** est une Single Page Application (SPA) Angular qui offre une interface utilisateur intuitive pour :

- **Authentification** sécurisée via JWT (décodage avec `jwt-decode`)
- **Gestion des clients** : liste, création, modification, suppression, recherche
- **Gestion des comptes bancaires** : consultation des comptes et de leurs détails
- **Opérations bancaires** : débit, crédit, virement entre comptes
- **Historique des transactions** avec pagination
- **Visualisation graphique** des données avec Chart.js

---

## 🛠️ Technologies utilisées

| Technologie | Version | Rôle |
|---|---|---|
| Angular | ^21.2.0 | Framework SPA principal |
| TypeScript | ~5.9.2 | Langage typé pour Angular |
| Bootstrap | ^5.3.8 | Framework CSS responsive |
| Bootstrap Icons | ^1.13.1 | Icônes vectorielles |
| Chart.js | ^4.5.1 | Graphiques et visualisation de données |
| jwt-decode | ^4.0.0 | Décodage des tokens JWT |
| RxJS | ~7.8.0 | Programmation réactive (Observables) |
| Angular CLI | ^21.2.9 | Outils de génération et build |
| Vitest | ^4.0.8 | Tests unitaires |
| Prettier | ^3.8.1 | Formatage du code |

---

## 🏗️ Architecture

L'application suit l'architecture standard **Angular** basée sur des modules, composants et services :

```
┌──────────────────────────────────────────────────────┐
│                   Navigateur (SPA)                   │
│                                                      │
│  ┌────────────┐   ┌────────────┐  ┌───────────────┐  │
│  │ Components │──▶│  Services  │──▶│  HttpClient   │  │
│  │ (UI/View)  │   │ (Logique)  │  │  (API Calls)  │  │
│  └────────────┘   └────────────┘  └──────┬────────┘  │
│                                          │            │
│  ┌────────────────────────────────────┐  │            │
│  │        Angular Router              │  │            │
│  │  (navigation entre les pages)      │  │            │
│  └────────────────────────────────────┘  │            │
└─────────────────────────────────────────┼────────────┘
                                          │ HTTP + JWT
                              ┌───────────▼────────────┐
                              │   Spring Boot Backend   │
                              │  http://localhost:8085  │
                              └────────────────────────┘
```

---

## ✅ Prérequis

Avant de démarrer, assurez-vous d'avoir :

- **Node.js** v18+ (recommandé : v20 LTS)
- **npm** v10.9.2+
- **Angular CLI** v21+ (installé globalement)
- Le **backend** [ebanking-backend](https://github.com/GHIZLANETHR/ebanking-backend) en cours d'exécution

Vérifier les versions installées :

```bash
node -v
npm -v
ng version
```

Installer Angular CLI globalement (si pas déjà fait) :

```bash
npm install -g @angular/cli
```

---

## 📦 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/GHIZLANETHR/digital-banking-web.git
cd digital-banking-web
```

### 2. Installer les dépendances

```bash
npm install
```

---

## 🚀 Lancer l'application

### Mode développement

```bash
ng serve
# ou
npm start
```

L'application sera accessible sur : **http://localhost:4200/**

Le rechargement automatique est activé : toute modification du code source relance la compilation à chaud.

### Mode développement avec port personnalisé

```bash
ng serve --port 4300
```

### Mode watch (recompilation continue sans serveur)

```bash
npm run watch
```

---

## 🏭 Build de production

```bash
ng build
# ou
npm run build
```

Les fichiers compilés et optimisés seront générés dans le dossier `dist/`. Le build de production inclut :

- Minification et optimisation du code
- Tree-shaking (suppression du code inutilisé)
- Output hashing (cache busting automatique)

### Limites de taille configurées

| Type | Avertissement | Erreur |
|---|---|---|
| Bundle initial | 500 KB | 1 MB |
| Style par composant | 4 KB | 8 KB |

---

## 🧪 Tests

### Tests unitaires (Vitest)

```bash
ng test
# ou
npm test
```

### Tests end-to-end

```bash
ng e2e
```

> Angular CLI ne fournit pas de framework e2e par défaut. Vous pouvez intégrer Cypress ou Playwright selon vos besoins.

---

## 📁 Structure du projet

```
digital-banking-web/
├── .vscode/                    # Configuration éditeur VS Code
├── public/                     # Assets statiques (favicon, images, ...)
├── src/
│   ├── app/
│   │   ├── components/         # Composants Angular réutilisables
│   │   │   ├── customers/      # Module gestion des clients
│   │   │   ├── accounts/       # Module gestion des comptes
│   │   │   ├── operations/     # Module opérations bancaires
│   │   │   ├── navbar/         # Barre de navigation
│   │   │   └── login/          # Page de connexion
│   │   ├── services/           # Services Angular (appels HTTP)
│   │   │   ├── customer.service.ts
│   │   │   ├── account.service.ts
│   │   │   └── auth.service.ts
│   │   ├── models/             # Interfaces TypeScript (DTOs)
│   │   ├── guards/             # Guards de navigation (auth)
│   │   ├── interceptors/       # HTTP Interceptors (ajout du token JWT)
│   │   ├── app.routes.ts       # Configuration du routeur Angular
│   │   ├── app.component.ts    # Composant racine
│   │   └── app.config.ts       # Configuration de l'application
│   ├── styles.css              # Styles globaux
│   └── main.ts                 # Point d'entrée de l'application
├── .editorconfig               # Configuration éditeur
├── .prettierrc                 # Règles de formatage Prettier
├── angular.json                # Configuration Angular CLI
├── package.json                # Dépendances npm
├── tsconfig.json               # Configuration TypeScript globale
├── tsconfig.app.json           # TypeScript pour l'app
└── tsconfig.spec.json          # TypeScript pour les tests
```

---

## 🔗 Connexion avec le backend

Ce frontend consomme l'API REST du projet [ebanking-backend](https://github.com/GHIZLANETHR/ebanking-backend).

Assurez-vous que le backend tourne sur `http://localhost:8085` avant de démarrer le frontend.

Pour configurer l'URL de base de l'API, modifiez le fichier d'environnement :

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  backendHost: 'http://localhost:8085'
};
```

---

## 🔐 Authentification JWT

L'application utilise `jwt-decode` pour décoder les tokens JWT côté client.

Le flux d'authentification :

1. L'utilisateur soumet ses identifiants sur la page `/login`
2. Le backend (ou Keycloak) retourne un **access token JWT**
3. Le token est stocké (localStorage ou mémoire)
4. Un **HTTP Interceptor** Angular ajoute automatiquement le token dans les headers de chaque requête :

```
Authorization: Bearer <jwt_token>
```

5. Les routes protégées sont gardées par un **AuthGuard** Angular qui vérifie la validité du token avant la navigation.

---

## 🎨 Styles et UI

- **Bootstrap 5.3.8** est intégré via `angular.json` (CSS + JS bundle)
- **Bootstrap Icons 1.13.1** pour les icônes
- **Chart.js 4.5.1** pour les graphiques (évolution des soldes, statistiques)

---

## 👩‍💻 Auteur

**GHIZLANETHR** — [GitHub](https://github.com/GHIZLANETHR)

---

## 🔗 Projets liés

| Projet | Description | Lien |
|---|---|---|
| ebanking-backend | API REST Spring Boot (backend) | [Voir le repo](https://github.com/GHIZLANETHR/ebanking-backend) |
| digital-banking-web | Interface Angular (frontend) | Ce projet |

---

## 📄 Licence

Ce projet est développé à des fins éducatives. Libre d'utilisation pour l'apprentissage et le développement.
