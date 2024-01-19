import GetDatasApi from "./api/GetDatasApi.js";
import DisplayRecipes from './utils/DisplayRecipes.js';
import DisplayFiltersItems from './utils/DisplayFiltersItems.js';
import ToggleFormChevron from "./utils/ToggleFormChevron.js";
import FiltersSearch from "./utils/FiltersSearch.js";

// TEST CALCUL NBR RECETTES
// FIN TEST CALCUL NBR RECETTES
// OTHER TEST CALCUL NBR RECETTES
// FIN OTHER TEST CALCUL NBR RECETTES

// TEST CALCUL NBR RECETTES
// import NbrRecipes from "./utils/NbrRecipes.js";
// FIN TEST CALCUL NBR RECETTES

// OTHER TEST CALCUL NBR RECETTES
import RecipeCounter from "./utils/RecipeCounter.js";
// FIN OTHER TEST CALCUL NBR RECETTES
class App {
    constructor() {
        this.getDatas = new GetDatasApi('datas/recipes.json');
        this.displayRecipes = new DisplayRecipes('.display_recipes');
        this.displayFilters = new DisplayFiltersItems();
        this.filtersSearch = new FiltersSearch(this.getDatas, this.displayFilters);
        // TEST CALCUL NBR RECETTES
        // this.nbrRecipes = new NbrRecipes('.display_recipes');
        // FIN TEST CALCUL NBR RECETTES
        // OTHER TEST CALCUL NBR RECETTES
        this.recipeCounter = new RecipeCounter('.display_recipes');
        // FIN OTHER TEST CALCUL NBR RECETTES
    }

    async main() {
        const recipes = await this.getDatas.getAllRecipes();
        this.displayRecipes.displayAllRecipes(recipes);

        // TEST CALCUL NBR RECETTES
        // Met à jour le nombre de recettes après avoir affiché toutes les recettes
        // this.nbrRecipes.updateRecipeCount();
        // FIN TEST CALCUL NBR RECETTES
        // OTHER TEST CALCUL NBR RECETTES
        // Initialise RecipeCounter après avoir affiché toutes les recettes
        this.recipeCounter.updateRecipeCount();
        // FIN OTHER TEST CALCUL NBR RECETTES

        const ingredients = await this.getDatas.getIngredients();
        this.displayFilters.displayFilterItems('ingredients', ingredients, 'ingredients_form');

        const appareils = await this.getDatas.getAppareils();
        this.displayFilters.displayFilterItems('appareils', appareils, 'appareils_form');

        const ustensils = await this.getDatas.getUstensils();
        this.displayFilters.displayFilterItems('ustensils', ustensils, 'ustensils_form');

        // Utilisez les données comme nécessaire
        // console.log(recipes);
        // console.log(ingredients);
        // console.log(appareils);
        // console.log(ustensils);

    }

}

const app = new App();
// app.main()

// Ajout des gestionnaires de clic aux chevrons en utilisant ToggleFormChevron
ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_chevron");
ToggleFormChevron.addToggleEventListener("appareils_chevron", "appareils_form", "appareils_chevron");
ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_chevron");

app.main();