export default class RecipeTemplate {
    constructor(recipe) {
        this.recipe = recipe;
    }

    generateHTML() {
        const articleContent = document.createElement('div');
        articleContent.innerHTML = `
            <div class="recipe_time">${this.recipe.time} min</div>
            <div class="recipe_img_wrap">
                <img src="assets/imagesPlats/${this.recipe.image}" alt="" class="recipe_img">
            </div>
            <div class="recipe_infos">
                <h2 class="title_recipe">${this.recipe.name}</h2>
                <div class="recipe_describe">
                    <h3 class="subtitle_recipe">Recette</h3>
                    <p class="description">${this.recipe.description}</p>
                </div>
                <div class="recipe_uses">
                    <h3 class="subtitle_recipe">Ingredients</h3>
                    <ul>
                        ${this.recipe.ingredients.map(ingredient => `
                            <li class="ingredient">
                                <h4 class="title_ingredient">${ingredient.ingredient}</h4>
                                <p class="ingredient_info">${ingredient.quantity} ${ingredient.unit || ''}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        return articleContent;
    }
}