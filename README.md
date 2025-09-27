# 📑 Smartlinks

Smartlinks est une petite application web qui permet de répertorier et organiser des sites web utiles pour le dev web principalement.  
L’objectif est d’avoir un **répertoire personnel de liens**, facilement consultable et filtrable par catégories.

---

## ✨ Fonctionnalités

- 📂 **Ajout de sites web** via un formulaire (nom, URL, catégorie).
- 🖼️ **Affichage automatique des favicons** des sites ajoutés.
- 🔎 **Recherche et filtrage par catégories** (CSS, Icônes, Outils, React, Design, etc.).
- ❌ **Suppression de liens** directement depuis l’interface.
- 💾 Données stockées en **LocalStorage**, potentiellement améliorable en SQLite.

---

## 🛠️ Technologies utilisées

- **TailwindCSS** → structure et design moderne et responsive (pas encore sur mobile).
- **TypeScript** → logique front-end typée.
- **LocalStorage** → stockage des sites en local.
- **Favicon Fetching** via l’API Google (`https://www.google.com/s2/favicons`).

---

## 🛠️ Améliorations futures

- **Responsive mobile** → Pas nécéssaire pour le moment étant donné que le dev se fait sur ordinateur, mais pourrait être utilisé comme simple répertoire de liens a l'avenir.
- **SQLite** → Pour éviter la perte des sites enregistrées (a cause d'un localStorage.clear() par exemple).
- **Création des catégories** → Fonctionnalité permettant de créer ses propres catégories au lieu d'être limité a celle déja en place.

  
