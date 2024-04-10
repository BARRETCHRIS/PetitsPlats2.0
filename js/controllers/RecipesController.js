import RecipesComponent from '../components/RecipesComponent.js';
import { DatasApi } from '../main.js';

export default class RecipesController {
    constructor() {
        this.originalRecipes = DatasApi.getAllRecipes();
        // console.log('Recettes Original', this.originalRecipes);

        this.filteredRecipes = [];
        // console.log('Recettes Filtrées', this.filteredRecipes);
    }
}