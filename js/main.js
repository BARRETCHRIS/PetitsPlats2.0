import GetDatasApi from "./api/GetDatasApi.js";
import DisplayRecipes from './utils/DisplayRecipes.js';
import DisplayFiltersItems from './utils/DisplayFiltersItems.js';
import ToggleFormChevron from "./utils/ToggleFormChevron.js";
import FiltersSearch from "./utils/FiltersSearch.js";

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

        // // Ajoute un gestionnaire d'événements pour l'événement personnalisé
        // document.addEventListener('filtersUpdated', (event) => {
        //     const updatedTags = event.detail;

        //     // Filtre les recettes en fonction des tags mis à jour
        //     const filteredRecipes = this.filterRecipesWithTags(recipes, updatedTags);

        //     // Met à jour l'affichage avec les recettes filtrées
        //     this.displayRecipes.displayAllRecipes(filteredRecipes);
        // });

        // // Affiche toutes les recettes au départ
        // this.displayRecipes.displayAllRecipes(recipes);

        // Accéde à la propriété updatedTags après avoir créé l'instance de DisplayFiltersItems
        console.log('Initial Updated Tags:', this.displayFilters.updatedTags);

        // Ajoute un gestionnaire d'événements pour l'événement personnalisé
        document.addEventListener('filtersUpdated', (event) => {
            const updatedTags = event.detail;

            // Accéde à la propriété updatedTags lorsqu'elle est mise à jour
            console.log('Updated Tags:', updatedTags);

            // Filtre les recettes en fonction des tags mis à jour
            const filteredRecipes = this.filterRecipesWithTags(recipes, updatedTags);

            // Met à jour l'affichage avec les recettes filtrées
            this.displayRecipes.displayAllRecipes(filteredRecipes);
        });

        // Affiche toutes les recettes au départ
        this.displayRecipes.displayAllRecipes(recipes);

        
    }

    // Ajoute une méthode pour filtrer les recettes avec les tags mis à jour
    filterRecipesWithTags(recipes, tags) {
        // Si le tableau de tags est vide, retournez toutes les recettes
        if (tags.length === 0) {
            return recipes;
        }

        // Filtre les recettes en fonction des tags
        const filteredRecipes = recipes.filter(recipe => {
            // Vérifier si tous les tags sont présents dans la recette
            return tags.every(tag => {
                // Vérifie si le tag est présent dans la liste d'ingrédients, appareils ou ustensils de la recette
                return recipe.ingredients.some(ingredient => ingredient.ingredient === tag) ||
                       recipe.appliance === tag ||
                       recipe.ustensils.includes(tag);
            });
        });

        return filteredRecipes;
    }

    // // Ajoute une méthode pour filtrer les recettes avec les tags mis à jour
    // filterRecipesWithTags(recipes, tags) {
    //     // Si le tableau de tags est vide, retournez toutes les recettes
    //     if (tags.length === 0) {
    //         return recipes;
    //     }

    //     // Filtre les recettes en fonction des tags
    //     const filteredRecipes = recipes.filter(recipe => {
    //         // Vérifie si tous les tags sont présents dans la recette
    //         return tags.every(tag => {
    //             // Vérifie si le tag est présent dans la liste d'ingrédients, appareils ou ustensils de la recette
    //             return recipe.ingredients.some(ingredient => ingredient.ingredient === tag) ||
    //                    recipe.appliance === tag ||
    //                    recipe.ustensils.includes(tag);
    //         });
    //     });

    //     return filteredRecipes;
    // }
        
}

const app = new App();
// app.main()

// Ajout des gestionnaires de clic aux chevrons en utilisant ToggleFormChevron
ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_chevron");
ToggleFormChevron.addToggleEventListener("appareils_chevron", "appareils_form", "appareils_chevron");
ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_chevron");

app.main();