import GetDatasApi from "./api/GetDatasApi.js";
import ToggleFormChevron from "./utils/ToggleFormChevron.js";
import RecipeCounter from "./utils/RecipeCounter.js";
import FiltersSearchManager from "./utils/FiltersSearchManager.js";

// Importez la classe DisplayFiltersItems depuis votre fichier approprié
import DisplayFiltersItems from "./utils/DisplayFiltersItems.js";

class App {
    constructor() {
        this.getDatas = new GetDatasApi('datas/recipes.json');

        // Créez des instances de DisplayFiltersItems pour chaque type de filtre
        this.displayFiltersItemsIngredients = new DisplayFiltersItems('ingredients_list', 'ingredients');
        this.displayFiltersItemsAppliance = new DisplayFiltersItems('appliance_list', 'appliance');
        this.displayFiltersItemsUstensils = new DisplayFiltersItems('ustensils_list', 'ustensils');

        // Passez ces instances à la classe FiltersSearchManager lors de son instanciation
        this.filtersSearchManager = new FiltersSearchManager(this.getDatas, {
            ingredients: this.displayFiltersItemsIngredients,
            appliance: this.displayFiltersItemsAppliance,
            ustensils: this.displayFiltersItemsUstensils
        });

        // Ajoutez ces lignes pour écouter les événements personnalisés
        document.addEventListener('update', (event) => {
            const { type, updatedItems } = event.detail;
            this.handleUpdateEvent(type, updatedItems);
        });

        this.ingredients = [];
        this.appliance = [];
        this.ustensils = [];
        this.tagsList = [];
        this.recipes = [];

        this.updatedIngredients = [];
        this.updatedAppliance = [];
        this.updatedUstensils = [];

        this.recipeCounter = new RecipeCounter('.display_recipes');

        // Ajout des gestionnaires de clic aux chevrons en utilisant ToggleFormChevron
        ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_chevron");
        ToggleFormChevron.addToggleEventListener("appliance_chevron", "appliance_form", "appliance_chevron");
        ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_chevron");
    }

    async initializeRecipes() {
        this.recipes = await this.getDatas.getAllRecipes();
    }

    async main() {
        await this.initializeRecipes();

        this.ingredients = await this.getDatas.getIngredients();
        this.appliance = await this.getDatas.getAppliance();
        this.ustensils = await this.getDatas.getUstensils();

        // Initialise RecipeCounter après avoir affiché toutes les recettes
        this.recipeCounter.updateRecipeCount();

        // Utilisez les données comme nécessaire
        console.log("Ingredients:", this.ingredients);
        console.log("Appliance:", this.appliance);
        console.log("Ustensils:", this.ustensils);

        // Ajoutez cet appel pour charger les éléments au moment de l'initialisation
        this.filtersSearchManager.loadAllItems();
    }

    // Ajoutez cet appel pour charger les éléments au moment de l'initialisation
    
}

const app = new App();
app.main();