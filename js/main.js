//  les imports
import Api from "./Api.js";


import FormFilterComponent from "./components/FormFilterComponent.js"

// Envoie des données aux autres fichers
export const DatasApi = new Api();


new FormFilterComponent('ingredients');
new FormFilterComponent('appliance');
new FormFilterComponent('ustensils');