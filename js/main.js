import GetDatasApi from "./api/GetDatasApi.js";
import DisplayRecipes from './utils/DisplayRecipes.js';
import DisplayFiltersItems from './utils/DisplayFiltersItems.js';
import FiltersSearch from "./utils/FiltersSearch.js";
import ToggleFormChevron from "./utils/ToggleFormChevron.js";

// OTHER TEST CALCUL NBR RECETTES
import RecipeCounter from "./utils/RecipeCounter.js";
// FIN OTHER TEST CALCUL NBR RECETTES
class App {
    constructor() {
        this.getDatas = new GetDatasApi('datas/recipes.json');
        this.displayRecipes = new DisplayRecipes('.display_recipes');
        this.displayFilters = new DisplayFiltersItems();
        this.filtersSearch = new FiltersSearch(this.getDatas, this.displayFilters);
        this.tagsList = [];
        this.recipes = []; 
        // OTHER TEST CALCUL NBR RECETTES
        this.recipeCounter = new RecipeCounter('.display_recipes');
        // FIN OTHER TEST CALCUL NBR RECETTES

        // Ajout des gestionnaires d'événements
        document.addEventListener('tagsUpdated', async () => {
            // Met à jour la liste des tags lorsque l'événement est émis
            await this.getAndLogTagsList();
            await this.initializeRecipes(); 

            // this.main();
        });

        // Ajout des gestionnaires de clic aux chevrons en utilisant ToggleFormChevron
        ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_chevron");
        ToggleFormChevron.addToggleEventListener("appareils_chevron", "appareils_form", "appareils_chevron");
        ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_chevron");
    }

    async getAndLogTagsList() {
        // Attend la mise à jour des tags
        this.tagsList = this.displayFilters.getTagsList();

        // Ajoute l'écouteur d'événement à l'intérieur de la fonction
        this.tagsListUpdate = document.addEventListener('tagsUpdated', async () => {
            // Met à jour la liste des tags lorsque l'événement est émis
            await this.getAndLogTagsList();
        });
        console.log('Tableau tag à jour', this.tagsList);
        console.log('Taille tableau tag à jour',this.tagsList.length);
    }

    async initializeRecipes() {
        // Initialise le tableau des recettes uniquement si tagsList est vide
        this.tagsList = this.displayFilters.getTagsList();

        if (this.tagsList.length === 0) {
            this.recipes = await this.getDatas.getAllRecipes();
        }else {
            this.recipes = [];
        }
        // console.log(this.tagsList);
        console.log('Tableau recette à jour',this.recipes);
    }
    

    async main() {
        // const recipes = await this.getDatas.getAllRecipes();
        await this.initializeRecipes();
        this.displayRecipes.displayAllRecipes(this.recipes);

        const ingredients = await this.getDatas.getIngredients();
        this.displayFilters.displayFilterItems('ingredients', ingredients, 'ingredients_form');

        const appareils = await this.getDatas.getAppareils();
        this.displayFilters.displayFilterItems('appareils', appareils, 'appareils_form');

        const ustensils = await this.getDatas.getUstensils();
        this.displayFilters.displayFilterItems('ustensils', ustensils, 'ustensils_form');

        // OTHER TEST CALCUL NBR RECETTES
        // Initialise RecipeCounter après avoir affiché toutes les recettes
        this.recipeCounter.updateRecipeCount();
        // FIN OTHER TEST CALCUL NBR RECETTES

        // Utilisez les données comme nécessaire
        // console.log(recipes);
        // console.log(ingredients);
        // console.log(appareils);
        // console.log(ustensils);    
    }

}

const app = new App();

app.getAndLogTagsList();

app.main();