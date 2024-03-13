import RecipeTemplate from "../templates/RecipeTemplate.js";

export default class DisplayRecipes {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    displayRecipeCard(recipe) {
        const recipeTemplate = new RecipeTemplate(recipe);
        const articleContent = recipeTemplate.renderRecipeCard();

        const recipeArticle = document.createElement('article');
        recipeArticle.classList.add('recipe_card');
        recipeArticle.appendChild(articleContent);

        this.container.appendChild(recipeArticle);
    }

    displayRecipes(recipes) {
        recipes.forEach(recipe => {
            this.displayRecipeCard(recipe);
        });
    }

    emptyContainer() {
        this.container.innerHTML = "";
    }
}