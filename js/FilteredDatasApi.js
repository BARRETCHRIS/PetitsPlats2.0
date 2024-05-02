import { DatasApi } from './main.js';

export default class FilteredDatasApi {
    constructor() {
        this.filteredRecipes = DatasApi.getAllRecipes(); // Pour stocker les recettes filtrées

        // Écouter l'événement filteredRecipesChanged
        document.addEventListener('filteredRecipesChanged', (event) => {
            this.filteredRecipes = event.detail.filteredRecipes;
            console.log('Recettes filtrées mises à jour :', this.filteredRecipes);
            this.getAllIngredients();
            this.getAllAppliances();
            this.getAllUstensils();
        });

        // console.log('Total recipes : ', this.filteredRecipes);
    }

    // Méthode pour normaliser un tableau de mots
    normalizeWords(words) {
        return words.map(word => word.toLowerCase());
    }

    // Méthode pour obtenir tous les ingrédients uniques
    getAllIngredients() {
        const ingredientsSet = new Set();
        this.filteredRecipes.map(recipe => recipe.ingredients.map(ingredient => {
            const normalizedIngredient = ingredient.ingredient.toLowerCase();
            ingredientsSet.add(normalizedIngredient);
            return normalizedIngredient;
        }));

        return Array.from(ingredientsSet);
    }

    // Méthode pour obtenir tous les appareils uniques
    getAllAppliances() {
        const appliancesSet = new Set();
        this.filteredRecipes.map(recipe => {
            const normalizedAppliance = recipe.appliance.toLowerCase();
            appliancesSet.add(normalizedAppliance);
            return normalizedAppliance;
        });

        return Array.from(appliancesSet);
    }

    // Méthode pour obtenir tous les ustensiles uniques
    getAllUstensils() {
        const ustensilsSet = new Set();
        this.filteredRecipes.map(recipe => recipe.ustensils.map(ustensil => {
            const normalizedUstensil = ustensil.toLowerCase();
            ustensilsSet.add(normalizedUstensil);
            return normalizedUstensil;
        }));

        return Array.from(ustensilsSet);
    }

    // Méthode pour obtenir les éléments par type
    getItemsByType(type) {
        switch (type) {
            case 'ingredients':
                return this.getAllIngredients();
            case 'appliance':
                return this.getAllAppliances();
            case 'ustensils':
                return this.getAllUstensils();
            default:
                console.error('Type de filtre non reconnu');
        }
    }
}