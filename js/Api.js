import { recipes } from '../datas/recipes.js';

export default class Api {
    normalizeWords(words) {
        return words.map(word => word.toLowerCase());
    }

    getAllRecipes() {
        // console.log(recipes);
        return recipes;
    }

    getAllIngredients() {
        const ingredientsSet = new Set();
        recipes.map(recipe => recipe.ingredients.map(ingredient => {
            this.normalizeWords([ingredient.ingredient]).map(ingredient => {
                ingredientsSet.add(ingredient);
                return ingredient;
            });
        }));

        return Array.from(ingredientsSet);
    }

    getAllAppliances() {
        const appliancesSet = new Set();
        recipes.map(recipe => {
            this.normalizeWords([recipe.appliance]).map(appliance => {
                appliancesSet.add(appliance);
                return appliance;
            });
        });

        return Array.from(appliancesSet);
    }

    getAllUstensils() {
        const ustensilsSet = new Set();
        recipes.map(recipe => recipe.ustensils.map(ustensil => {
            this.normalizeWords([ustensil]).map(ustensil => {
                ustensilsSet.add(ustensil);
                return ustensil;
            });
        }));

        return Array.from(ustensilsSet);
    }

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