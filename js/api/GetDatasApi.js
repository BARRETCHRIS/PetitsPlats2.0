import Api from './Api.js';

export default class GetDatasApi extends Api {
    constructor(url) {
        super(url);
        this.recipes = [];
    }

    async getAllRecipes() {
        this.recipes = await this.fetch();
        return this.recipes;
    }

    normalizeWords(words) {
        const normalizedWords = [];

        words.forEach(word => {
            // Convertit chaque mot en minuscules et l'ajoute à la liste normalisée
            normalizedWords.push(word.toLowerCase());
        });

        return normalizedWords;
    }

    getIngredients() {
        const ingredients = new Set();

        this.recipes.forEach(recipe => {
            // Utilise la fonction normalizeWords pour convertir les ingrédients en minuscules
            const normalizedIngredients = [];
            recipe.ingredients.forEach(ingredient => {
                // Utilise la fonction normalizeWords pour convertir chaque ingrédient en minuscules
                this.normalizeWords([ingredient.ingredient]).forEach(normalizedIngredient => {
                    normalizedIngredients.push(normalizedIngredient);
                });
            });

            normalizedIngredients.forEach(ingredient => {
                ingredients.add(ingredient);
            });
        });

        return Array.from(ingredients);
    }

    getAppliance() {
        const appliance = new Set();

        this.recipes.forEach(recipe => {
            // Utilise la fonction normalizeWords pour convertir les appareils en minuscules
            const normalizedAppliance = this.normalizeWords([recipe.appliance]);
            normalizedAppliance.forEach(app => {
                appliance.add(app);
            });
        });

        return Array.from(appliance);
    }

    getUstensils() {
        const ustensils = new Set();

        this.recipes.forEach(recipe => {
            // Utilise la fonction normalizeWords pour convertir les ustensiles en minuscules
            const normalizedUstensils = this.normalizeWords(recipe.ustensils);
            normalizedUstensils.forEach(ustensil => {
                ustensils.add(ustensil);
            });
        });

        return Array.from(ustensils);
    }
}