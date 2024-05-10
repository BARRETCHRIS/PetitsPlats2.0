# PetitsPlats2.0
P7 JS 2.0 Les petits plats


main.js :
Importe les différentes classes et modules nécessaires.
Exporte deux instances d'API, une instance d'API principale (DatasApi) et une instance d'API filtrée (NewDatasApi).
Initialise plusieurs contrôleurs et composants :
FilteredDatasController pour gérer les données filtrées.
TagsController pour gérer les tags associés aux filtres.
Plusieurs composants pour les formulaires de filtres, la recherche principale, etc.
Chaque contrôleur ou composant initialisé écoute des événements spécifiques et réagit en conséquence.

Api.js :
Fournit des méthodes pour récupérer toutes les recettes, tous les ingrédients, tous les appareils et tous les ustensiles.
Normalize les mots en minuscules.
Chaque méthode parcourt les données de recettes, normalise les valeurs et les stocke dans des ensembles pour éviter les doublons.
Fournit une méthode getItemsByType pour récupérer les éléments en fonction du type demandé.

FilteredDatasApi.js :
Importe DatasApi depuis main.js pour obtenir toutes les recettes.
Écoute un événement filteredRecipesChanged.
Lorsque l'événement est déclenché, met à jour les recettes filtrées et les éléments filtrés (ingrédients, appareils, ustensiles).
Normalize les valeurs et les stocke dans des ensembles pour éviter les doublons.
Fournit une méthode getItemsByType pour récupérer les éléments filtrés en fonction du type demandé.

FilteredDatasController.js :
Initialise avec une référence à DatasApi pour récupérer toutes les recettes.
Gère les filtres appliqués par l'utilisateur et filtre les recettes en conséquence.
Écoute les événements émis par TagsController pour les filtres de tag et par MainSearchComponent pour la recherche principale.
Met à jour les recettes filtrées en fonction des critères de filtre.
Émet un événement filteredRecipesChanged avec les recettes filtrées mises à jour.

FormFilterComponent.js :
Initialise les formulaires de filtre.
Gère l'ouverture et la fermeture des formulaires.
Écoute les événements pour ouvrir ou fermer les formulaires en fonction des interactions de l'utilisateur.

FilterInputComponent.js :
Gère les entrées de filtre (par exemple, ingrédients, appareils, ustensiles).
Filtre les valeurs en fonction de l'entrée utilisateur.
Écoute les événements d'entrée utilisateur et met à jour les valeurs filtrées en conséquence.

FiltersListController.js :
Gère la liste des filtres (par exemple, liste des ingrédients, liste des appareils, liste des ustensiles).
Met à jour la liste en fonction des valeurs filtrées.
Écoute l'événement FilteredValuesChanged pour mettre à jour la liste en fonction des valeurs filtrées.

MainSearchComponent.js :
Gère la recherche principale.
Écoute les événements d'entrée utilisateur et filtre les recettes en conséquence.
Émet un événement mainWordsChanged avec les mots-clés de recherche mis à jour.

TagsController.js :
Gère les tags associés aux filtres.
Ajoute ou supprime des tags en fonction des interactions de l'utilisateur.
Écoute les événements émis par d'autres composants pour mettre à jour les tags.

RecipesController.js :
Gère l'affichage des recettes.
Écoute l'événement filteredRecipesChanged pour mettre à jour la liste des recettes affichées en fonction des recettes filtrées.
Met à jour l'affichage en fonction des recettes filtrées ou non.

Cet ensemble de fichiers constitue un système complexe de gestion des données de recettes, de filtrage et d'affichage dynamique. Chaque fichier joue un rôle spécifique dans le processus global, en réagissant aux événements, en filtrant les données et en mettant à jour l'interface utilisateur en conséquence.


Algorithme:

Début

1. Initialisation de la page :
    1.1. Afficher toutes les recettes, ingrédients, appareils et ustensiles sur la page.
    1.2. Initialiser les écouteurs d'événements.

2. Gestion de la recherche principale :
    2.1. Sur événement "input" dans l'input de recherche principale :
        2.1.1. Si la saisie est valide :
            2.1.1.1. Vérifier les correspondances avec les recettes :
                2.1.1.1.1. Si des correspondances sont trouvées :
                            Émettre un événement "mainWordsChanged" avec les mots-clés saisis.
                2.1.1.1.2. Sinon :
                            Afficher toutes les recettes et un message d'erreur indiquant qu'aucune recette correspondante n'a été trouvée.
        2.1.2. Sinon :
            Afficher un message d'erreur indiquant que la saisie est invalide.

3. Gestion des filtres :
    3.1. Sur sélection d'un filtre dans l'un des composants de filtre :
        3.1.1. Ajouter le filtre sélectionné à la liste des filtres.
        3.1.2. Émettre un événement "listTagChanged" avec la liste des filtres sélectionnés.
    3.2. Sur suppression d'un filtre :
        3.2.1. Supprimer le filtre de la liste des filtres.
        3.2.2. Émettre un événement "listTagChanged" avec la liste mise à jour des filtres.

4. Mise à jour des recettes filtrées :
    4.1. Sur événement "listTagChanged" :
        4.1.1. Filtrer les recettes en fonction des filtres sélectionnés.
        4.1.2. Afficher les recettes filtrées sur la page.
    4.2. Sur événement "mainWordsChanged" :
        4.2.1. Filtrer les recettes en fonction des mots-clés de recherche principale.
        4.2.2. Afficher les recettes filtrées sur la page.

Fin

