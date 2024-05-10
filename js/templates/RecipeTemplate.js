export default class RecipeTemplate {
    constructor(recipe) {
        this.recipe = recipe;
    }

    renderRecipeCard(recipe) {
        const card = document.createElement('article');
        card.classList.add('recipe_card');

        const cardContent = `
            <div class="recipe_time">${recipe.time} min</div>
            <div class="recipe_img_wrap">
                <img src="assets/imagesPlats/${recipe.image}" alt="" class="recipe_img">
            </div>
            <div class="recipe_infos">
                <h2 class="title_recipe">${recipe.name}</h2>
                <div class="recipe_describe">
                    <h3 class="subtitle_recipe">Recette</h3>
                    <p class="description">${recipe.description}</p>
                </div>
                <div class="recipe_uses">
                    <h3 class="subtitle_recipe">Ingredients</h3>
                    <ul>
                    </ul>
                </div>
            </div>
        `;

        card.innerHTML = cardContent; // Utilise innerHTML pour ajouter le contenu HTML

        // Sélectionne la liste des ingrédients
        const ingredientsList = card.querySelector('.recipe_uses ul');

        // Ajoute chaque ingrédient à la liste
        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i];
            const ingredientItem = document.createElement('li');
            ingredientItem.classList.add('ingredient');
            ingredientItem.innerHTML = `
                <h4 class="title_ingredient">${ingredient.ingredient}</h4>
                <p class="ingredient_info">${ingredient.quantity || ''} ${ingredient.unit || ''}</p>
            `;
            ingredientsList.appendChild(ingredientItem);
        }

        return card;
    }
}