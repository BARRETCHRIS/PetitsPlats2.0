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

    async getIngredients() {
        const ingredients = new Set();

        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.add(ingredient.ingredient);
            });
        });
        
        return Array.from(ingredients);
    }

    async getAppareils() {
        const appareils = new Set();

        this.recipes.forEach(recipe => {
            appareils.add(recipe.appliance);
        });

        return Array.from(appareils);
    }

    async getUstensils() {
        const ustensils = new Set();

        this.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                ustensils.add(ustensil);
            });
        });

        return Array.from(ustensils);
    }
}
