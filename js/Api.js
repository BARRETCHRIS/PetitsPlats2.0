import { recipes } from '../datas/recipes.js';

export default class Api {
    normalizeWords(words) {
        const normalizedWords = [];
        const length = words.length;
        for (let i = 0; i < length; i++) {
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
        const recipesLength = recipes.length;
        for (let i = 0; i < recipesLength; i++) {
            const recipe = recipes[i];
            const ingredientsLength = recipe.ingredients.length;
            for (let j = 0; j < ingredientsLength; j++) {
                const ingredient = recipe.ingredients[j];
                const normalizedIngredient = this.normalizeWords([ingredient.ingredient]);
                const normIngLength = normalizedIngredient.length;
                for (let k = 0; k < normIngLength; k++) {
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
        const recipesLength = recipes.length;
        for (let i = 0; i < recipesLength; i++) {
            const recipe = recipes[i];
            const normalizedAppliance = this.normalizeWords([recipe.appliance]);
            const normApplLength = normalizedAppliance.length;
            for (let j = 0; j < normApplLength; j++) {
                appliances.add(normalizedAppliance[j]);
            }
        }

        // console.log('appliances origine :', appliances);
        return Array.from(appliances);
    }

    getAllUstensils() {
        const ustensils = new Set();
        const recipesLength = recipes.length;
        for (let i = 0; i < recipesLength; i++) {
            const recipe = recipes[i];
            const normalizedUstensils = this.normalizeWords(recipe.ustensils);
            const normUstLength = normalizedUstensils.length;
            for (let j = 0; j < normUstLength; j++) {
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