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
        const normalizedWords = [];
        words.forEach(word => {
            const normalizedWord = word.toLowerCase();
            normalizedWords.push(normalizedWord);
            // console.log('Mot normalisé :', normalizedWord);
        });
        return normalizedWords;
    }

    // Méthode pour obtenir tous les ingrédients uniques
    getAllIngredients() {
        const ingredientsSet = new Set();
        this.filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const normalizedIngredient = ingredient.ingredient.toLowerCase();
                ingredientsSet.add(normalizedIngredient);
                // console.log('Ingrédient ajouté à l\'ensemble :', normalizedIngredient);
            });
        });

        const uniqueIngredients = Array.from(ingredientsSet);
        // console.log('Ingrédients uniques :', uniqueIngredients);
        return uniqueIngredients;
    }

    // Méthode pour obtenir tous les appareils uniques
    getAllAppliances() {
        const appliancesSet = new Set();
        this.filteredRecipes.forEach(recipe => {
            const normalizedAppliance = recipe.appliance.toLowerCase();
            appliancesSet.add(normalizedAppliance);
            // console.log('Appareil ajouté à l\'ensemble :', normalizedAppliance);
        });

        const uniqueAppliances = Array.from(appliancesSet);
        // console.log('Appareils uniques :', uniqueAppliances);
        return uniqueAppliances;
    }

    // Méthode pour obtenir tous les ustensiles uniques
    getAllUstensils() {
        const ustensilsSet = new Set();
        this.filteredRecipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                const normalizedUstensil = ustensil.toLowerCase();
                ustensilsSet.add(normalizedUstensil);
                // console.log('Ustensile ajouté à l\'ensemble :', normalizedUstensil);
            });
        });

        const uniqueUstensils = Array.from(ustensilsSet);
        // console.log('Ustensiles uniques :', uniqueUstensils);
        return uniqueUstensils;
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