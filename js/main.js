// les imports
import Api from "./Api.js";
import FilteredDatasController from "./controllers/FilteredDatasController.js";

import FormFilterComponent from "./components/FormFilterComponent.js"
import FiltersListController from "./controllers/FiltersListController.js";
import MainSearchComponent from "./components/MainSearchComponent.js";
import TagsController from "./controllers/tagsController.js";
import RecipesController from "./controllers/RecipesController.js";

import ListClickComponent from './components/ListClickComponent.js';

// Envoie des données aux autres fichiers
export const DatasApi = new Api();
export const FilteredDataApi = new FilteredDatasController(); // Exporte FilteredDatasController

// Initialisation du contrôleur de tags
const tagsController = new TagsController();

// Fonction pour retourner le tableau this.tagsList
export function getTagsList() {
    return tagsController.getTagsList();
}

// Initialisation des composants
new FormFilterComponent('ingredients');
new FormFilterComponent('appliance');
new FormFilterComponent('ustensils');
new MainSearchComponent();

// Initialisation du contrôleur de listes
new FiltersListController('ingredients');
new FiltersListController('appliance');
new FiltersListController('ustensils');

// Initialisation du gestionnaire de clics sur les listes
new ListClickComponent();

// document.addEventListener('ItemListSelected', event => {
//     const { value, type, element } = event.detail;
//     const itemDetails = { value, type, element };
//     console.log('item list selected', itemDetails);
// });

// document.addEventListener('foundRecipesChange', (event) => {
//     const recipesArray = event.detail.foundRecipes;
//     console.log('Main recipes array changed:', recipesArray);
// });

// Initialisation du contrôleur de recettes
new RecipesController();




// //  les imports
// import Api from "./Api.js";
// import FilteredDatasController from "./controllers/FilteredDatasController.js";

// import FormFilterComponent from "./components/FormFilterComponent.js"
// import FiltersListController from "./controllers/FiltersListController.js";
// import MainSearchComponent from "./components/MainSearchComponent.js";
// import TagsController from "./controllers/tagsController.js";
// import RecipesController from "./controllers/RecipesController.js";

// import ListClickComponent from './components/ListClickComponent.js';

// // Envoie des données aux autres fichers
// export const DatasApi = new Api();
// // export const DataApiFiltred = new FilteredDatasController();
// // export const tagsSelected = [];

// // Initialisation du contrôleur de tags
// const tagsController = new TagsController();

// // Fonction pour retourner le tableau this.tagsList
// export function getTagsList() {
//     return tagsController.getTagsList();
// }

// // Initialisation des composants
// new FormFilterComponent('ingredients');
// new FormFilterComponent('appliance');
// new FormFilterComponent('ustensils');
// new MainSearchComponent();

// // Initialisation du contrôleur de listes
// new FiltersListController('ingredients');
// new FiltersListController('appliance');
// new FiltersListController('ustensils');

// // Initialisation du gestionnaire de clics sur les listes
// new ListClickComponent();

// // document.addEventListener('ItemListSelected', event => {
// //     const { value, type, element } = event.detail;
// //     const itemDetails = { value, type, element };
// //     console.log('item list selected', itemDetails);
// // });

// // document.addEventListener('mainSearchChange', (event) => {
// //     const wordsArray = event.detail.wordsArray;
// //     // Faites ce que vous voulez avec le tableau wordsArray
// //     console.log('Main words array changed:', wordsArray);
// //     // Par exemple, vous pouvez appeler une fonction ou effectuer d'autres traitements
// // });

// // Initialisation du contrôleur de recettes
// new RecipesController();