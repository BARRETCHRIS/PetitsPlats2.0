function generateRecipeHTML(recipe) {
    return `
        <article class="recipe_card">
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
                        ${recipe.ingredients.map(ingredient => `
                            <li class="ingredient">
                                <h4 class="title_ingredient">${ingredient.ingredient}</h4>
                                <p class="ingredient_info">
                                    <span>${ingredient.quantity}</span>
                                    <span>${ingredient.unit || ''}</span>
                                </p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </article>
    `;
}
