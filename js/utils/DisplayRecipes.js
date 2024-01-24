import RecipeTemplate from "../templates/RecipeTemplate.js";

export default class DisplayRecipes {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    displayRecipe(recipe) {
        const recipeTemplate = new RecipeTemplate(recipe);
        const articleContent = recipeTemplate.generateHTML();

        const recipeArticle = document.createElement('article');
        recipeArticle.classList.add('recipe_card');
        recipeArticle.appendChild(articleContent);

        this.container.appendChild(recipeArticle);
    }

    displayAllRecipes(recipes) {
        recipes.forEach(recipe => {
            this.displayRecipe(recipe);
        });
    }
}