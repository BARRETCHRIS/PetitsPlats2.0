export default class RecipeCounter {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.recipeCount = 0;
        this.initializeObserver();
    }

    initializeObserver() {
        // Utilise MutationObserver pour détecter les changements dans la section display_recipes
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    // Met à jour le nombre d'articles lorsque des enfants sont ajoutés ou supprimés
                    this.updateRecipeCount();
                }
            });
        });

        // Observe les changements dans le nœud de la section display_recipes
        observer.observe(this.container, { childList: true, subtree: true });
    }

    updateRecipeCount() {
        const recipeCards = this.container.querySelectorAll('.recipe_card');
        this.recipeCount = recipeCards.length;
        this.updateDisplay();
    }

    updateDisplay() {
        const nbrRecipesDiv = document.querySelector('.nbr_recipes');
        nbrRecipesDiv.textContent = `${this.recipeCount} recettes`;
    }
}