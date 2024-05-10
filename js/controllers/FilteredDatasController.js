import { DatasApi } from '../main.js'; // Importation de DatasApi depuis le fichier main.js

export default class FilteredDatasController {
    constructor(type) {
        this.type = type;
        this.tagsList = []; // Tableau pour enregistrer les tags
        this.MainSeachWord =[] // Tableau pour enregistrer les mots filtres de MainSearchComponents
        this.originalRecipes = DatasApi.getAllRecipes(); // Appel de la fonction getAllRecipes
        this.filteredRecipes = []; // Tableau pour enregistrer les recettes filtrées
        this.fileredListsFilters = []; // Tableau pour enregistrer les lists d'items de filtres des recettes filtrées

        this.mainErrorMsg = document.getElementById('main_error_msg');
        this.errorMessage = 'Pas de recette correspondante';

        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    showErrorMessage() {
        this.mainErrorMsg.textContent = this.errorMessage;
    }

    hideErrorMessage() {
        this.mainErrorMsg.textContent = '';
    }

    // Fonction pour gérer l'événement listTagChanged
    handleListTagChanged(event) {
        const { tagsList } = event.detail;
        this.tagsList = tagsList.slice(); // Copie de tagsList
        this.filterRecipes(); // Filtrer les recettes   
    }

    // Fonction pour gérer l'événement mainWordsChanged
    handleMainWordsChanged(event) {
        const { mainWordsArray } = event.detail;
        this.MainSeachWord = mainWordsArray.slice(); // Copie de mainWordsArray
        this.filterRecipes(); // Filtrer les recettes
    }

    // Fonction pour filtrer les recettes en fonction des critères
    filterRecipes() {
        this.filteredRecipes = []; // Réinitialisation de filteredRecipes

        let anySearchMatch = false; // Variable pour vérifier s'il y a au moins une correspondance

        for (let i = 0; i < this.originalRecipes.length; i++) {
            const recipe = this.originalRecipes[i];

            // Vérification des critères de tagsList
            const tagMatches = this.tagsList.every(tag => {
                switch(tag.type) {
                    case 'ingredients':
                        return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.value.toLowerCase());
                    case 'appliance':
                        return recipe.appliance.toLowerCase() === tag.value.toLowerCase();
                    case 'ustensils':
                        return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tag.value.toLowerCase());
                    default:
                        return false;
                }
            });

            // Vérification des mots-clés de MainSeachWord dans le titre, la description et les ingrédients
            const searchMatches = this.MainSeachWord.every(word =>
                recipe.name.toLowerCase().includes(word.toLowerCase()) ||
                recipe.description.toLowerCase().includes(word.toLowerCase()) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word.toLowerCase()))
            );

            // Si au moins une recette correspond à la recherche, définir anySearchMatch à true
            if (searchMatches) {
                anySearchMatch = true;
            }

            // Si la recette correspond à tous les critères de tagsList et contient tous les mots-clés de MainSeachWord, l'ajouter à filteredRecipes
            if (tagMatches && searchMatches) {
                this.filteredRecipes.push(recipe);                
            }
        }

        // Afficher ou masquer le message d'erreur en fonction de la valeur de anySearchMatch
        if (anySearchMatch) {
            this.hideErrorMessage();
        } else {
            this.showErrorMessage();
        }

        this.emitFilteredRecipesChangedEvent();
    }

    // Fonction pour émettre un événement personnalisé lorsque filteredRecipes est modifié
    emitFilteredRecipesChangedEvent() {
        const event = new CustomEvent('filteredRecipesChanged', { detail: { filteredRecipes: this.filteredRecipes} });
        document.dispatchEvent(event);
    }

    // Fonction pour initialiser les écouteurs d'événements
    initializeEventListeners() {
        // Écoute de l'événement listTagChanged émis par TagsController.js
        document.addEventListener('listTagChanged', (event) => {
            this.handleListTagChanged(event);
        }); 

        // Écoute de l'événement mainWordsChanged émis par MainSearchComponent.js
        document.addEventListener('mainWordsChanged', (event) => {
            this.handleMainWordsChanged(event);
        }); 
    }    
}