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
        // console.log(recipes);
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

        // console.log('Ingrédients origine :', ingredients);
        return ingredients;
    }

    getAllAppliances() {
        const appliances = new Set();
        recipes.forEach(recipe => {
            this.normalizeWords([recipe.appliance]).forEach(appliance => {
                appliances.add(appliance);
            });
        });

        // console.log('appliances origine :', appliances);
        return Array.from(appliances);
    }

    getAllUstensils() {
        const ustensils = new Set();
        recipes.forEach(recipe => {
            this.normalizeWords(recipe.ustensils).forEach(ustensil => {
                ustensils.add(ustensil);
            });
        });

        // console.log('ustensils origine :', ustensils);
        return Array.from(ustensils);
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