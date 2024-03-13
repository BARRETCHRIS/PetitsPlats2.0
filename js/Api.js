import { recipes } from '../datas/recipes.js';

export default class Api {
    normalizeWords(words) {
        const normalizedWords = [];
        words.forEach(word => {
            normalizedWords.push(word.toLowerCase());
        });
        return normalizedWords;
    }

    getAllRecipes() {
        return recipes;
    }

    getAllIngredients() {
        const ingredientsSet = new Set();
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                this.normalizeWords([ingredient.ingredient]).forEach(ingredient => {
                    ingredientsSet.add(ingredient);
                });
            });
        });

        const ingredients = Array.from(ingredientsSet);
        return ingredients;
    }

    getAllAppliances() {
        const appliances = new Set();
        recipes.forEach(recipe => {
            this.normalizeWords([recipe.appliance]).forEach(appliance => {
                appliances.add(appliance);
            });
        });
        return Array.from(appliances);
    }

    getAllUstensils() {
        const ustensils = new Set();
        recipes.forEach(recipe => {
            this.normalizeWords(recipe.ustensils).forEach(ustensil => {
                ustensils.add(ustensil);
            });
        });
        return Array.from(ustensils);
    }
}
