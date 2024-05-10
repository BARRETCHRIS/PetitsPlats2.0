import { recipes } from '../datas/recipes.js';

export default class Api {
    normalizeWords(words) {
        const normalizedWords = [];
        for (let i = 0; i < words.length; i++) {
            normalizedWords.push(words[i].toLowerCase());
        }
        return normalizedWords;
    }

    getAllRecipes() {
        // console.log(recipes);
        return recipes;
    }

    getAllIngredients() {
        const ingredientsSet = new Set();
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                const normalizedIngredient = this.normalizeWords([ingredient.ingredient]);
                for (let k = 0; k < normalizedIngredient.length; k++) {
                    ingredientsSet.add(normalizedIngredient[k]);
                }
            }
        }

        const ingredients = Array.from(ingredientsSet);

        // console.log('Ingrédients origine :', ingredients);
        return ingredients;
    }

    getAllAppliances() {
        const appliances = new Set();
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const normalizedAppliance = this.normalizeWords([recipe.appliance]);
            for (let j = 0; j < normalizedAppliance.length; j++) {
                appliances.add(normalizedAppliance[j]);
            }
        }

        // console.log('appliances origine :', appliances);
        return Array.from(appliances);
    }

    getAllUstensils() {
        const ustensils = new Set();
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const normalizedUstensils = this.normalizeWords(recipe.ustensils);
            for (let j = 0; j < normalizedUstensils.length; j++) {
                ustensils.add(normalizedUstensils[j]);
            }
        }

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