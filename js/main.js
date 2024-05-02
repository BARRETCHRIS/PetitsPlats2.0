// les imports
import Api from "./Api.js";
import FilteredDatasApi from "./FilteredDatasApi.js";

import FilteredDatasController from "./controllers/FilteredDatasController.js";

import FormFilterComponent from "./components/FormFilterComponent.js"
import FiltersListController from "./controllers/FiltersListController.js";
import MainSearchComponent from "./components/MainSearchComponent.js";
import TagsController from "./controllers/TagsController.js";
import RecipesController from "./controllers/RecipesController.js";

// Envoie des données aux autres fichiers
export const DatasApi = new Api();
export const NewDatasApi = new FilteredDatasApi();
new FilteredDatasController();

// Initialisation du contrôleur de tags
new TagsController();

// Initialisation des composants
new FormFilterComponent('ingredients');
new FormFilterComponent('appliance');
new FormFilterComponent('ustensils');
new MainSearchComponent();

// Initialisation du contrôleur de listes
new FiltersListController('ingredients');
new FiltersListController('appliance');
new FiltersListController('ustensils');

// Initialisation du contrôleur de recettes
new RecipesController();