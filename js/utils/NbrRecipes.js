export default class NbrRecipes {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    updateRecipeCount() {
        const recipeCards = this.container.querySelectorAll('.recipe_card');
        const recipeCount = recipeCards.length;
        this.updateDisplay(recipeCount);
    }

    updateDisplay(count) {
        const nbrRecipesDiv = document.querySelector('.nbr_recipes');
        nbrRecipesDiv.textContent = `${count} recettes`;
    }
}
