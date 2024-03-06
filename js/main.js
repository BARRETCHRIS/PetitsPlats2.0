import GetDatasApi from "./api/GetDatasApi.js";
import ToggleFormChevron from "./utils/ToggleFormChevron.js";
import RecipeCounter from "./utils/RecipeCounter.js";
import InputsManager from "./utils/InputsManager.js";
import FiltersSearchManager from "./utils/FiltersSearchManager.js";
import DisplayFiltersItems from './utils/DisplayFiltersItems.js';

import ListItemsClickHandler from "./utils/ListItemsClickHandler.js";

class App {
    constructor() {
        this.getDatas = new GetDatasApi('datas/recipes.json');
        this.inputsManager = new InputsManager();

        this.values = {
            main: '',
            ingredients: '',
            appliance: '',
            ustensils: '',
        };

        this.ingredients = [];
        this.appliance = [];
        this.ustensils = [];
        this.tagsList = [];
        this.recipes = [];

        this.recipeCounter = new RecipeCounter('.display_recipes');

        ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_search", "visible_cross");
        ToggleFormChevron.addToggleEventListener("appliance_chevron", "appliance_form", "appliance_search", "visible_cross");
        ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_search", "visible_cross");

        ['main', 'ingredients', 'appliance', 'ustensils'].forEach((type) => {
            document.addEventListener(`${type}ValueChanged`, (event) => {
                this.values[type] = event.detail;
                this.handleValueChanged(type);
            });
        });

        this.filtersSearchManager = new FiltersSearchManager(this.inputsManager, this.getDatas);

        this.displayFiltersItemsIngredients = new DisplayFiltersItems('ingredients_search', 'ingredients', this.filtersSearchManager);
        this.displayFiltersItemsAppliance = new DisplayFiltersItems('appliance_search', 'appliance', this.filtersSearchManager);
        this.displayFiltersItemsUstensils = new DisplayFiltersItems('ustensils_search', 'ustensils', this.filtersSearchManager);

        this.listItemsClickHandler = new ListItemsClickHandler();

        this.initializeFilters();
    }

    async initializeRecipes() {
        this.recipes = await this.getDatas.getAllRecipes();
    }

    async initializeFilters() {
        await this.filtersSearchManager.initializeFilters();

        // Afficher les éléments des filtres au lancement
        this.displayFiltersItemsIngredients.displayFilterItems(this.filtersSearchManager.ingredientsListUpdated);
        this.displayFiltersItemsAppliance.displayFilterItems(this.filtersSearchManager.applianceListUpdated);
        this.displayFiltersItemsUstensils.displayFilterItems(this.filtersSearchManager.ustensilsListUpdated);
    }

    async main() {
        await this.initializeRecipes();

        this.recipeCounter.updateRecipeCount();

        // Obtient les éléments sélectionnés après que l'utilisateur a effectué des sélections
        const selectedItems = this.listItemsClickHandler.getSelectedItems();
        console.log('Selected Items in main.js:', selectedItems);
    }

    handleValueChanged(type) {
        // Mise à jour des filtres lorsqu'une valeur change
        this.filtersSearchManager.checkLengthAndForbiddenCharacters(
            `${type}Value`,
            this.values[type]
        );

        // Afficher les éléments filtrés
        switch (type) {
            case 'ingredients':
                this.displayFiltersItemsIngredients.displayFilterItems(this.filtersSearchManager.ingredientsListUpdated);
                break;

            case 'appliance':
                this.displayFiltersItemsAppliance.displayFilterItems(this.filtersSearchManager.applianceListUpdated);
                break;

            case 'ustensils':
                this.displayFiltersItemsUstensils.displayFilterItems(this.filtersSearchManager.ustensilsListUpdated);
                break;

            default:
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.main();
});

// import GetDatasApi from "./api/GetDatasApi.js";
// import ToggleFormChevron from "./utils/ToggleFormChevron.js";
// import RecipeCounter from "./utils/RecipeCounter.js";
// import InputsManager from "./utils/InputsManager.js";
// import FiltersSearchManager from "./utils/FiltersSearchManager.js";
// import DisplayFiltersItems from './utils/DisplayFiltersItems.js';

// class App {
//     constructor() {
//         this.getDatas = new GetDatasApi('datas/recipes.json');
//         this.inputsManager = new InputsManager();

//         this.values = {
//             main: '',
//             ingredients: '',
//             appliance: '',
//             ustensils: '',
//         };

//         this.ingredients = [];
//         this.appliance = [];
//         this.ustensils = [];
//         this.tagsList = [];
//         this.recipes = [];

//         this.recipeCounter = new RecipeCounter('.display_recipes');

//         ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_search", "visible_cross");
//         ToggleFormChevron.addToggleEventListener("appliance_chevron", "appliance_form", "appliance_search", "visible_cross");
//         ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_search", "visible_cross");

//         ['main', 'ingredients', 'appliance', 'ustensils'].forEach((type) => {
//             document.addEventListener(`${type}ValueChanged`, (event) => {
//                 this.values[type] = event.detail;
//                 this.handleValueChanged(type);
//             });
//         });

//         this.filtersSearchManager = new FiltersSearchManager(this.inputsManager, this.getDatas);

//         this.displayFiltersItemsIngredients = new DisplayFiltersItems('ingredients_search', 'ingredients', this.filtersSearchManager);
//         this.displayFiltersItemsAppliance = new DisplayFiltersItems('appliance_search', 'appliance', this.filtersSearchManager);
//         this.displayFiltersItemsUstensils = new DisplayFiltersItems('ustensils_search', 'ustensils', this.filtersSearchManager);

//         this.initializeFilters();
//     }

//     async initializeRecipes() {
//         this.recipes = await this.getDatas.getAllRecipes();
//     }

//     async initializeFilters() {
//         await this.filtersSearchManager.initializeFilters();

//         // Afficher les éléments des filtres au lancement
//         this.displayFiltersItemsIngredients.displayFilterItems(this.filtersSearchManager.ingredientsListUpdated);
//         this.displayFiltersItemsAppliance.displayFilterItems(this.filtersSearchManager.applianceListUpdated);
//         this.displayFiltersItemsUstensils.displayFilterItems(this.filtersSearchManager.ustensilsListUpdated);
//     }

//     async main() {
//         await this.initializeRecipes();

//         this.recipeCounter.updateRecipeCount();
//     }

//     handleValueChanged(type) {
//         // Mise à jour des filtres lorsqu'une valeur change
//         this.filtersSearchManager.checkLengthAndForbiddenCharacters(
//             `${type}Value`,
//             this.values[type]
//         );

//         // Afficher les éléments filtrés
//         switch (type) {
//             case 'ingredients':
//                 this.displayFiltersItemsIngredients.displayFilterItems(this.filtersSearchManager.ingredientsListUpdated);
//                 break;

//             case 'appliance':
//                 this.displayFiltersItemsAppliance.displayFilterItems(this.filtersSearchManager.applianceListUpdated);
//                 break;

//             case 'ustensils':
//                 this.displayFiltersItemsUstensils.displayFilterItems(this.filtersSearchManager.ustensilsListUpdated);
//                 break;

//             default:
//                 break;
//         }
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const app = new App();
//     app.main();
// });