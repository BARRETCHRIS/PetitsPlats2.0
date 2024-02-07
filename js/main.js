import GetDatasApi from "./api/GetDatasApi.js";
import DisplayRecipes from './utils/DisplayRecipes.js';
import DisplayFiltersItems from './utils/DisplayFiltersItems.js';
import FiltersSearch from "./utils/FiltersSearch.js";

import Search from "./utils/MainSearch.js";

import ToggleFormChevron from "./utils/ToggleFormChevron.js";

import RecipeCounter from "./utils/RecipeCounter.js";

class App {
    constructor() {
        this.getDatas = new GetDatasApi('datas/recipes.json');
        this.displayRecipes = new DisplayRecipes('.display_recipes');
        this.displayFilters = new DisplayFiltersItems();
        this.filtersSearch = new FiltersSearch(this.getDatas, this.displayFilters);

        this.search = new Search(this.getDatas, this.displayRecipes);

        this.tagsList = [];
        this.recipes = []; 
        this.recipeCounter = new RecipeCounter('.display_recipes');

        // Ajout des gestionnaires d'événements
        document.addEventListener('tagsUpdated', async () => {
            // Met à jour la liste des tags lorsque l'événement est émis
            await this.getAndLogTagsList();
            await this.initializeRecipes(); 
        });

        // Ajout des gestionnaires de clic aux chevrons en utilisant ToggleFormChevron
        ToggleFormChevron.addToggleEventListener("ingredients_chevron", "ingredients_form", "ingredients_chevron");
        ToggleFormChevron.addToggleEventListener("appliance_chevron", "appliance_form", "appliance_chevron");
        ToggleFormChevron.addToggleEventListener("ustensils_chevron", "ustensils_form", "ustensils_chevron");
    }

    async getAndLogTagsList() {
        // Attend la mise à jour des tags
        this.tagsList = this.displayFilters.getTagsList();

        // Ajoute l'écouteur d'événement à l'intérieur de la fonction
        this.tagsListUpdate = document.addEventListener('tagsUpdated', async () => {
            // Met à jour la liste des tags lorsque l'événement est émis
            await this.getAndLogTagsList();
            console.log('Calling filterRecipesByTags from tagsUpdated event');
            this.filterRecipesByTags(this.tagsList);
        });
        console.log('Tableau tag à jour', this.tagsList);
        console.log('Taille tableau tag à jour',this.tagsList.length);   
    }

    async initializeRecipes() {
        console.log('initializeRecipes called');

        // Initialise le tableau des recettes uniquement si tagsList est vide
        if (this.tagsList.length === 0) {
            this.recipes = await this.getDatas.getAllRecipes();
        }else {
            this.recipes = this.filterRecipesByTags(this.tagsList);
        }

        this.displayRecipes.emptyContainer();
        this.displayRecipes.displayAllRecipes(this.recipes);
        
        console.log('Tableau recette à jour',this.recipes);
        console.log('Tableau tags',this.tagsList);
    }

    filterRecipesByTags(tagsList) {
        // Copie les recettes initiales pour ne pas modifier l'objet d'origine
        let filteredRecipes = [...this.getDatas.recipes];
        console.log('Recettes filtrées copie init', filteredRecipes);

        tagsList.forEach(tag => {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (tag.nameList === 'ingredients') {
                    const hasIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient === tag.tagName);
                    console.log(`Recipe "${recipe.name}" has ingredient "${tag.tagName}": ${hasIngredient}`);
                    return hasIngredient;
                } else {
                    const hasTag = recipe[tag.nameList].includes(tag.tagName);
                    console.log(`Recipe "${recipe.name}" has tag "${tag.tagName}" in ${tag.nameList}: ${hasTag}`);
                    return hasTag;
                }
            });
        });

        console.log('Number of recipes after filtering:', filteredRecipes.length);
        return filteredRecipes;
    }

    async main() {
        await this.initializeRecipes();
        // this.displayRecipes.displayAllRecipes(this.recipes); !!!!! 3 JOURS DE GALERES !!!!!

        const ingredients = this.getDatas.getIngredients();
        this.displayFilters.displayFilterItems('ingredients', ingredients, 'ingredients_form');

        const appliance = this.getDatas.getAppliance();
        this.displayFilters.displayFilterItems('appliance', appliance, 'appliance_form');

        const ustensils = this.getDatas.getUstensils();
        this.displayFilters.displayFilterItems('ustensils', ustensils, 'ustensils_form');

        // Initialise RecipeCounter après avoir affiché toutes les recettes
        this.recipeCounter.updateRecipeCount();

        // Utilisez les données comme nécessaire
        // console.log(recipes);
        // console.log(ingredients);
        // console.log(appliance);
        // console.log(ustensils);    
    }
}

const app = new App();
app.main();