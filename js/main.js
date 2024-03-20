//  les imports
import Api from "./Api.js";

import FormFilterComponent from "./components/FormFilterComponent.js"

import FiltersListController from "./controllers/FiltersListController.js";

// Envoie des données aux autres fichers
export const DatasApi = new Api();

// Initialisation des composants
new FormFilterComponent('ingredients');
new FormFilterComponent('appliance');
new FormFilterComponent('ustensils');

// Initialisation du contrôleur de listes
new FiltersListController();