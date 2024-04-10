import { DatasApi } from '../main.js'; // Importation de DatasApi depuis le fichier main.js

export default class FilteredDatasController {
    constructor() {
        this.tagsList = []; // Tableau pour enregistrer les tags
        this.MainSeachWord =[] // Tableau pour enregistrer les mots filtres de MainSearchComponents
        this.filteredRecipes = []; // Tableau pour enregistrer les recettes filtrées
        this.filteredRecipesByTag = []; // Tableau pour enregistrer les recettes filtrées par tag
        this.filteredRecipesByMainSearch = []; // Tableau pour enregistrer les recettes filtrées par MainSearchComponent

        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    // Fonction pour initialiser les écouteurs d'événements
    initializeEventListeners() {
        // Écoute de l'événement listTagChanged émis par TagsController.js
        document.addEventListener('listTagChanged', this.handleListTagChanged.bind(this));

        // Écoute de l'événement foundRecipesChange émis par MainSearchComponent.js
        document.addEventListener('foundRecipesChange', this.handleFoundRecipesChange.bind(this));
    }

    // Fonction pour gérer l'événement listTagChanged
    handleListTagChanged(event) {
        const { tagsList } = event.detail;
        // Réinitialise tagsList
        this.tagsList = [];
        // Ajoute les éléments restants de tagsList à tagsList
        tagsList.forEach(tag => {
            this.tagsList.push(tag);
        });
        // Appelle la méthode pour récupérer les recettes filtrées
        this.filterRecipes();
        // this.addFilteredRecipes(); // Ajout des recettes filtrées à this.filteredRecipes
        console.log('Tags List updated:', this.tagsList);
    }

    // Fonction pour filtrer les recettes en fonction des tags sélectionnés
    filterRecipes() {
        const allRecipes = DatasApi.getAllRecipes(); // Obtenir toutes les recettes
        // Réinitialise filteredRecipesByTag
        this.filteredRecipesByTag = [];
        // Parcourir les recettes
        allRecipes.forEach(recipe => {
            // Vérifie si la recette contient tous les tags sélectionnés
            if (this.tagsList.every(tag => this.recipeContainsTag(recipe, tag))) {
                this.filteredRecipesByTag.push(recipe); // Ajoute la recette filtrée à filteredRecipesByTag
            }
        });
        console.log('Filtered Recipes par tags:', this.filteredRecipesByTag);
    }

    // Fonction pour vérifier si une recette contient un tag spécifique
    recipeContainsTag(recipe, tag) {
        switch (tag.type) {
            case 'appliance':
                return recipe.appliance.toLowerCase().includes(tag.value.toLowerCase());
            case 'ustensils':
                return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.value.toLowerCase()));
            case 'ingredients':
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.value.toLowerCase()));
            default:
                return false; // Cas par défaut : retourne false si le type de tag n'est pas reconnu
        }
    }

    // Fonction pour gérer l'événement foundRecipesChange de MainSearchComponent
    handleFoundRecipesChange(event) {
        const { foundRecipes } = event.detail;
        // Enregistre les nouvelles recettes dans un nouveau tableau
        this.filteredRecipesToMainSearch = foundRecipes.slice(); // Copie les éléments de foundRecipes dans filteredRecipesToMainSearch
        console.log('Found Recipes updated by MainSearch:', this.filteredRecipesToMainSearch);
        // this.addFilteredRecipes(); // Ajout des recettes filtrées à this.filteredRecipes
    }
}



// import { DatasApi } from '../main.js'; // Importation de DatasApi depuis le fichier main.js

// export default class FilteredDatasController {
//     constructor() {
//         this.tagsList = []; // Tableau pour enregistrer les tags 
//         this.filteredRecipes = []; // Tableau pour enregistrer les recettes filtrées
//         this.filteredRecipesByTag = []; // Tableau pour enregistrer les recettes filtrées par tag
//         this.filteredRecipesByMainSearch = []; // Tableau pour enregistrer les recettes filtrées par MainSearchComponent

//         // Initialisation des écouteurs d'événements
//         this.initializeEventListeners();
//     }

//     // Fonction pour initialiser les écouteurs d'événements
//     initializeEventListeners() {
//         // Écoute de l'événement listTagChanged émis par TagsController.js
//         document.addEventListener('listTagChanged', this.handleListTagChanged.bind(this));

//         // Écoute de l'événement foundRecipesChange émis par MainSearchComponent.js
//         document.addEventListener('foundRecipesChange', this.handleFoundRecipesChange.bind(this));
//     }

//     // Fonction pour gérer l'événement listTagChanged
//     handleListTagChanged(event) {
//         const { tagsList } = event.detail;
//         // Réinitialise tagsList
//         this.tagsList = [];
//         // Ajoute les éléments restants de tagsList à tagsList
//         tagsList.forEach(tag => {
//             this.tagsList.push(tag);
//         });
//         // Appelle la méthode pour récupérer les recettes filtrées
//         this.filterRecipes();
//         console.log('Tags List updated:', this.tagsList);
//     }

//     // Fonction pour filtrer les recettes en fonction des tags sélectionnés
//     filterRecipes() {
//         const allRecipes = DatasApi.getAllRecipes(); // Obtenir toutes les recettes
//         // Réinitialise filteredRecipesByTag
//         this.filteredRecipesByTag = [];
//         // Parcourir les recettes
//         allRecipes.forEach(recipe => {
//             // Vérifie si la recette contient tous les tags sélectionnés
//             if (this.tagsList.every(tag => this.recipeContainsTag(recipe, tag))) {
//                 this.filteredRecipesByTag.push(recipe); // Ajoute la recette filtrée à filteredRecipesByTag
//             }
//         });
//         console.log('Filtered Recipes par tags:', this.filteredRecipesByTag);
//     }

//     // Fonction pour vérifier si une recette contient un tag spécifique
//     recipeContainsTag(recipe, tag) {
//         switch (tag.type) {
//             case 'appliance':
//                 return recipe.appliance.toLowerCase().includes(tag.value.toLowerCase());
//             case 'ustensils':
//                 return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.value.toLowerCase()));
//             case 'ingredients':
//                 return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.value.toLowerCase()));
//             default:
//                 return false; // Cas par défaut : retourne false si le type de tag n'est pas reconnu
//         }
//     }

//     // Fonction pour gérer l'événement foundRecipesChange de MainSearchComponent
//     handleFoundRecipesChange(event) {
//         const { foundRecipes } = event.detail;
//         // Enregistre les nouvelles recettes dans un nouveau tableau
//         this.filteredRecipesToMainSearch = foundRecipes.slice(); // Copie les éléments de foundRecipes dans filteredRecipesToMainSearch
//         console.log('Found Recipes updated by MainSearch:', this.filteredRecipesToMainSearch);
//     }

//     addFilteredRecipes() {
//         // Réinitialise filteredRecipes
//         this.filteredRecipes = [];
        
//         // Ajoute les recettes filtrées par tag
//         this.filteredRecipesByTag.forEach(recipe => {
//             if (!this.filteredRecipes.includes(recipe)) {
//                 this.filteredRecipes.push(recipe);
//             }
//         });

//         // Ajoute les recettes filtrées par la recherche principale
//         this.filteredRecipesByMainSearch.forEach(recipe => {
//             if (!this.filteredRecipes.includes(recipe)) {
//                 this.filteredRecipes.push(recipe);
//             }
//         });

//         // Si aucun filtre n'est appliqué, ajoute toutes les recettes
//         if (this.tagsList.length === 0 && this.filteredRecipesByMainSearch.length === 0) {
//             const allRecipes = DatasApi.getAllRecipes();
//             allRecipes.forEach(recipe => {
//                 this.filteredRecipes.push(recipe);
//             });
//         }

//         console.log('Filtered Recipes added:', this.filteredRecipes);
//     }
// }