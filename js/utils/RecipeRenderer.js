function RecipeRenderer() {
    this._recipeName = '';
    this._recipeTime = '';
    this._recipeIngredients = [];

    this.renderRecipes = async function () {
        try {
            const recipesApi = new RecipesApi('datas/recipes.json');
            const recipes = await recipesApi.getRecipes();
            for (const recipe of recipes) {
                this._recipeName = recipe.name;
                this._recipeTime = recipe.time;
                this._recipeIngredients = recipe.ingredients;

                this.render(); // Appel de la fonction render pour chaque recette
            };
        } catch (error) {
            console.error('An error occurred while rendering recipes:', error);
        }
    };

    this.render = function () {
        const recipesContainer = document.getElementById('recipes-container');
        const recipeHTML = generateRecipeHTML({
            name: this._recipeName,
            time: this._recipeTime,
            ingredients: this._recipeIngredients,
            // Ajoutez d'autres propriétés nécessaires pour chaque recette
        });

        recipesContainer.innerHTML += recipeHTML; // Utilisez += pour ajouter au contenu existant
    };
}
