# PassionCréa - Générateur d'Affiches de Communication

PassionCréa est une application web moderne et intuitive permettant de créer rapidement des affiches de communication professionnelles pour la Jeune Chambre Internationale (JCI) Sèmè-Podji. L'application offre une interface utilisateur fluide pour personnaliser facilement chaque affiche avec les logos, partenaires, couleurs et textes de votre organisation.

## Fonctionnalités

L'application propose cinq modèles d'affiches distincts conçus pour répondre à tous vos besoins de communication. Le modèle Agenda du Mois permet de présenter les événements planifiés avec un style élégant et professionnel. Le modèle Formation est idéal pour annoncer vos sessions de formation ou webinaires avec une mise en valeur du formateur et des informations pratiques. Le modèle Anniversaire célèbre vos membres avec une touche festive et personnalisée. Le modèle Motivation diffuse des citations inspirantes pour motiver votre communauté. Enfin, le modèle Gratitude permet de remercier publiquement vos partenaires et membres pour leur soutien.

Chaque modèle bénéficie d'un système de personnalisation complet. Vous pouvez modifier les couleurs d'accentuation, la couleur du texte et la couleur d'arrière-plan selon votre charte graphique. Le logo JCI principal peut être affiché en version couleur, blanche ou noire selon le fond utilisé. Les logos partenaires sont entièrement gérables : ajout, suppression, modification et personnalisation des couleurs. Les icônes de réseaux sociaux peuvent être configurées selon vos besoins avec une large gamme de plateformes disponibles. L'intelligence artificielle Gemini génère automatiquement des citations motivantes et des textes d'anniversaire pour vous faire gagner du temps.

## Technologies Utilisées

PassionCréa est construit avec React 19 et TypeScript pour une expérience utilisateur réactive et un code maintenable. Vite est utilisé comme outil de construction pour des temps de développement et de build ultra-rapides. Le styling est assuré par Tailwind CSS, permettant une conception d'interface moderne et responsive. html-to-image permet l'export des affiches en images PNG haute résolution au format carré 1080x1080 pixels parfaitement optimisé pour les réseaux sociaux. L'intégration avec l'API Gemini de Google offre des capacités d'intelligence artificielle pour la génération de contenu créatif.

## Installation et Configuration

Pour installer et exécuter le projet en local, plusieurs étapes sont nécessaires. Commencez par cloner le dépôt GitHub sur votre machine locale. Ouvrez un terminal dans le dossier du projet et installez les dépendances avec la commande `pnpm install` si vous utilisez pnpm, ou `npm install` avec npm. L'utilisation de pnpm est recommandée pour une meilleure gestion des dépendances et des permissions.

Créez un fichier `.env.local` à la racine du projet et ajoutez-y votre clé API Gemini avec la variable `GEMINI_API_KEY=your_api_key_here`. Cette clé est indispensable pour bénéficier des fonctionnalités d'intelligence artificielle. Vous pouvez obtenir une clé API sur le site de Google AI Studio. Une fois la configuration terminée, lancez le serveur de développement avec la commande `pnpm run dev` ou `npm run dev`. L'application sera accessible à l'adresse `http://localhost:5173` dans votre navigateur.

## Structure du Projet

Le projet suit une architecture claire et modulaire qui facilite la maintenance et les évolutions futures. Le dossier `src/` contient l'ensemble du code source de l'application, tandis que le dossier `public/` stocke les ressources statiques comme les images et logos.

Le fichier `App.tsx` constitue le point d'entrée principal de l'application et gère l'ensemble de l'état de l'interface utilisateur. C'est ici que sont définis tous les gestionnaires d'événements pour la modification des données, l'upload d'images et la gestion des partenaires. Le composant `TemplateRenderer.tsx` dans le dossier `components/` est responsable du rendu visuel de chaque modèle d'affiche. Il reçoit les données de configuration et les affiche de manière responsive selon le modèle sélectionné.

Le fichier `constants.ts` centralise toutes les constantes du projet, notamment les chemins des logos, les couleurs officielles JCI, la configuration des modèles et les icônes de réseaux sociaux. Le fichier `types.ts` définit les interfaces TypeScript utilisées dans l'application pour garantir la cohérence des données. Le dossier `services/` contient les appels aux API externes comme le service Gemini pour la génération de contenu par intelligence artificielle.

## Déploiement

L'application est prête pour un déploiement sur tout serveur web standard comme Apache ou Nginx. Pour préparer les fichiers de production, exécutez la commande `pnpm build` ou `npm run build`. Cette commande génère un dossier `dist/` contenant tous les fichiers optimisés pour la production. Les assets statiques comme les logos doivent se trouver dans le dossier `public/logos/` pour être accessibles à l'application déployée.

Pour un déploiement sur un serveur Apache2, copiez le contenu du dossier `dist/` dans le répertoire de votre choix, généralement `/var/www/html/`. Assurez-vous que les permissions des fichiers sont correctement configurées et que le module de réécriture d'URL est activé si nécessaire. L'application peut également être déployée sur des plateformes cloud comme Vercel, Netlify ou tout autre hébergeur compatible avec les applications React statiques.

## Modèles Disponibles

L'application propose cinq modèles d'affiches répondant à des besoins de communication spécifiques. Chaque modèle dispose de champs de personnalisation adaptés à son usage. Le modèle Agenda du Mois affiche le titre "AGENDA DU MOIS" avec une liste d'événements comprenant le jour, le mois et le titre de chaque activité. Le modèle Formation présente une fiche formateur avec photo, nom, fonction, date, heure et localisation, ornée d'un bandeau de couleur personnalisable.

Le modèle Anniversaire célèbre les membres avec un design festif incluant la photo de profil, le nom, la fonction et une date d'anniversaire mise en valeur. Le modèle Motivation affiche une citation inspirante avec un titre personnalisable et le nom de l'auteur ou de la source. Le modèle Gratitude présente un message de remerciement avec un espace pour la photo et les informations du bureau local.

## Personnalisation Avancée

La section Partenaires permet de gérer entièrement les logos affichés en bas de chaque affiche. Vous pouvez ajouter de nouveaux partenaires avec leur nom, logo et couleur d'accentuation. La suppression de partenaires est simple et réversible grâce au bouton de réinitialisation qui restaure la liste par défaut. L'upload de logos partenaires se fait directement via l'interface en sélectionnant un fichier image.

La section Réseaux Sociaux offre une gestion complète des icônes de contact. Un menu déroulant permet de sélectionner les plateformes à afficher parmi Facebook, Instagram, Twitter/X, LinkedIn, YouTube, TikTok et WhatsApp. Chaque icône peut être personnalisée avec une couleur spécifique. Les noms affichés sous les icônes sont également modifiables pour ajouter des mentions de page ou des hashtags.

## Licence

Ce projet est développé pour la Jeune Chambre Internationale (JCI) Sèmè-Podji et est destiné à un usage interne et communautaire. Toute utilisation commerciale ou redistribution est soumise à autorisation préalable de l'organisation.
