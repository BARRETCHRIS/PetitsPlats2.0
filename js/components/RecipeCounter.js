export default class RecipeCounter {
    constructor() {
        this.counterElement = document.querySelector('.nbr_recipes');
        this.updateCounter(0); // Initialiser le compteur à 0
    }

    updateCounter(recipeCount) {
        recipeCount = recipeCount || 0; // Assurez-vous que recipeCount est défini, sinon utilisez 0
        const recipeLabel = (recipeCount <= 1) ? 'recette' : 'recettes';
        this.counterElement.textContent = `${recipeCount} ${recipeLabel}`;
    }    
}