//  les imports
import Api from "./Api.js";
import FormFilterComponent from "./components/FormFilterComponent.js"
import FiltersListController from "./controllers/FiltersListController.js";

import MainSearchComponent from "./components/MainSearchComponent.js";

import ListClickComponent from './components/ListClickComponent.js';

// Envoie des données aux autres fichers
export const DatasApi = new Api();
export const tagsSelected = [];

// Initialisation des composants
new FormFilterComponent('ingredients');
new FormFilterComponent('appliance');
new FormFilterComponent('ustensils');
new MainSearchComponent();

// Initialisation du contrôleur de tags
// new TagsController();
// addTag()

// Initialisation du contrôleur de listes
new FiltersListController('ingredients');
new FiltersListController('appliance');
new FiltersListController('ustensils');

// Initialisation du gestionnaire de clics sur les listes
new ListClickComponent('ingredients');
new ListClickComponent('appliance');
new ListClickComponent('ustensils');

// Dans un autre fichier
document.addEventListener('SelectedValuesChanged', event => {
    const { type, values } = event.detail;
    console.log(`Nouvelles valeurs sélectionnées pour ${type}:`, values);
});

// Initialisation du contrôleur de recettes
// new RecipesController();





// //  les imports
// import Api from "./Api.js";
// import FormFilterComponent from "./components/FormFilterComponent.js"
// import FiltersListController from "./controllers/FiltersListController.js";

// import MainSearchComponent from "./components/MainSearchComponent.js";

// import ListClickComponent from './components/ListClickComponent.js';

// // Envoie des données aux autres fichers
// export const DatasApi = new Api();
// export const tagsSelected = [];

// // Initialisation des composants
// new FormFilterComponent('ingredients');
// new FormFilterComponent('appliance');
// new FormFilterComponent('ustensils');
// new MainSearchComponent();

// // Initialisation du contrôleur de tags
// // new TagsController();
// // addTag()

// // Initialisation du contrôleur de listes
// // new FiltersListController();
// new FiltersListController('ingredients');
// new FiltersListController('appliance');
// new FiltersListController('ustensils');

// // Initialisation du contrôleur de recettes
// // new RecipesController();