import { DatasApi } from '../main.js';

export default class FilteredDatasController {
    constructor(type) {
        this.type = type;
        this.tagsList = [];
        this.MainSeachWord = [];
        this.originalRecipes = DatasApi.getAllRecipes();
        this.filteredRecipes = [];
        this.fileredListsFilters = [];

        this.mainErrorMsg = document.getElementById('main_error_msg');
        this.errorMessage = 'Pas de recette correspondante';

        this.initializeEventListeners();
    }

    showErrorMessage() {
        this.mainErrorMsg.textContent = this.errorMessage;
    }

    hideErrorMessage() {
        this.mainErrorMsg.textContent = '';
    }

    handleListTagChanged(event) {
        const { tagsList } = event.detail;
        this.tagsList = tagsList.slice();
        this.filterRecipes();
    }

    handleMainWordsChanged(event) {
        const { mainWordsArray } = event.detail;
        this.MainSeachWord = mainWordsArray.slice();
        this.filterRecipes();
    }

    filterRecipes() {
        this.filteredRecipes = [];

        let anySearchMatch = false;

        this.originalRecipes.map(recipe => {
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

            const searchMatches = this.MainSeachWord.every(word =>
                recipe.name.toLowerCase().includes(word.toLowerCase()) ||
                recipe.description.toLowerCase().includes(word.toLowerCase()) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word.toLowerCase()))
            );

            if (searchMatches) {
                anySearchMatch = true;
            }

            if (tagMatches && searchMatches) {
                this.filteredRecipes.push(recipe);                
            }
        });

        if (anySearchMatch) {
            this.hideErrorMessage();
        } else {
            this.showErrorMessage();
        }

        this.emitFilteredRecipesChangedEvent();
    }

    emitFilteredRecipesChangedEvent() {
        const event = new CustomEvent('filteredRecipesChanged', { detail: { filteredRecipes: this.filteredRecipes} });
        document.dispatchEvent(event);
    }

    initializeEventListeners() {
        document.addEventListener('listTagChanged', (event) => {
            this.handleListTagChanged(event);
        }); 

        document.addEventListener('mainWordsChanged', (event) => {
            this.handleMainWordsChanged(event);
        }); 
    }    
}