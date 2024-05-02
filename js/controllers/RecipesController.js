import { DatasApi } from '../main.js';
import RecipeTemplate from "../templates/RecipeTemplate.js";
import RecipeCounter from '../components/RecipeCounter.js';

export default class RecipesController {
    constructor() {
        this.originalRecipes = DatasApi.getAllRecipes();
        this.displayRecipesList = [];
        this.container = document.getElementById('recipesContainer');

        this.recipeComponent = new RecipeTemplate();

        this.recipeCounter = new RecipeCounter(this.originalRecipes.length);

        // Initialisation de l'affichage des recettes à l'ouverture de la page
        this.renderRecipes();

        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    renderRecipes() {
        this.container.innerHTML = ''; // Vide le conteneur avant d'ajouter de nouvelles recettes

        const recipesToRender = this.displayRecipesList.length > 0 ? this.displayRecipesList : this.originalRecipes;

        recipesToRender.forEach(recipe => {
            const recipeCard = this.recipeComponent.renderRecipeCard(recipe);
            this.container.appendChild(recipeCard);
        });

        // Mettre à jour le compteur de recettes
        this.recipeCounter.updateCounter(recipesToRender.length);
    }

    // Fonction pour gérer l'événement 'filteredRecipesChanged'
    handleFilteredRecipesChanged(event) {
        const { filteredRecipes } = event.detail;
        this.displayRecipesList = filteredRecipes;
        this.renderRecipes(); // Met à jour l'affichage des recettes
    }

    initializeEventListeners(){
        // Écoute de l'événement filteredRecipesChanged émis par TagsController.js
        document.addEventListener('filteredRecipesChanged', (event) => {
            this.handleFilteredRecipesChanged(event);
            // console.log('display recipes', this.displayRecipesList);
            this.renderRecipes();   
        }); 
    }
}