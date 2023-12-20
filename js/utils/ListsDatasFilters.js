class ListsDatasFilters {
    constructor() {
        this.recipesApi = new RecipesApi('datas/recipes.json');
        this.ingredientsList = [];
        this.appliancesList = [];
        this.ustensilsList = [];
    }

    async generateArrayLists() {
        try {
            const recipes = await this.recipesApi.getRecipes();
            
            recipes.forEach(recipe => {
                this.extractIngredients(recipe.ingredients);
                this.extractAppliances(recipe.appliance);
                this.extractUstensils(recipe.ustensils);
            });

            // Remove duplicates from lists
            this.ingredientsList = [...new Set(this.ingredientsList)];
            this.appliancesList = [...new Set(this.appliancesList)];
            this.ustensilsList = [...new Set(this.ustensilsList)];

            // console.log("Ingredients:", this.ingredientsList);
            // console.log("Appliances:", this.appliancesList);
            // console.log("Ustensils:", this.ustensilsList);

            return {
                ingredientsList: this.ingredientsList,
                appliancesList: this.appliancesList,
                ustensilsList: this.ustensilsList,
            };
        } catch (error) {
            console.error('An error occurred while generating array lists:', error);
        }
    }

    extractIngredients(ingredients) {
        ingredients.forEach(ingredient => {
            this.ingredientsList.push(ingredient.ingredient.toLowerCase());
        });
    }

    extractAppliances(appliance) {
        this.appliancesList.push(appliance.toLowerCase());
    }

    extractUstensils(ustensils) {
        ustensils.forEach(ustensil => {
            this.ustensilsList.push(ustensil.toLowerCase());
        });
    }
}

const listsDatasFilters = new ListsDatasFilters();
listsDatasFilters.generateArrayLists().then(() => {
    // Access the lists after they are generated
    console.log(listsDatasFilters);
    return listsDatasFilters;
});