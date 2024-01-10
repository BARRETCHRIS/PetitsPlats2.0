import GetDatasApi from "./api/GetDatasApi.js";
import DisplayRecipes from './utils/DisplayRecipes.js';
import DisplayFiltersItems from './utils/DisplayFiltersItems.js';
import ToggleFormChevron from "./utils/ToggleFormChevron.js";

// TEST FILTER SEARCH
import FiltersSearch from "./utils/FiltersSearch.js";
// FIN TEST FILTER SEARCH
class App {
    constructor() {
        this.getDatas = new GetDatasApi('datas/recipes.json');
        this.displayRecipes = new DisplayRecipes('.display_recipes');
        this.displayFilters = new DisplayFiltersItems();
        // TEST FILTER SEARCH
        this.filtersSearch = new FiltersSearch(this.getDatas, this.displayFilters);
        // FIN TEST FILTER SEARCH
    }

    async main() {
        const recipes = await this.getDatas.getAllRecipes();
        this.displayRecipes.displayAllRecipes(recipes);

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