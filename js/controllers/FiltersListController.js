import FiltersItemTemplate from '../templates/FiltersItemTemplate.js';
import { DatasApi } from '../main.js';

export default class FiltersListController {
    constructor() {
        this.ingredientsList = document.getElementById('ingredients_list');
        this.applianceList = document.getElementById('appliance_list');
        this.ustensilsList = document.getElementById('ustensils_list');

        this.filtersItemTemplate = new FiltersItemTemplate();
        this.filteredIngredients = [];
        this.filteredAppliances = [];
        this.filteredUstensils = [];

        this.initializeEventListeners();
        this.updateLists();
    }

    updateLists() {
        this.updateList('ingredients', this.filteredIngredients.length > 0 ? this.filteredIngredients : DatasApi.getAllIngredients());
        this.updateList('appliance', this.filteredAppliances.length > 0 ? this.filteredAppliances : DatasApi.getAllAppliances());
        this.updateList('ustensils', this.filteredUstensils.length > 0 ? this.filteredUstensils : DatasApi.getAllUstensils());
    }

    updateList(type, values) {
        const listElement = this[type + 'List'];
        listElement.innerHTML = ''; // Clear previous items

        values.forEach(value => {
            const listItem = this.filtersItemTemplate.filteritemCard(value, type);
            listElement.appendChild(listItem);
        });
    }

    initializeEventListeners() {
        document.addEventListener('FilteredValuesChanged', event => {
            const { type, values } = event.detail;
            switch (type) {
                case 'ingredients':
                    this.filteredIngredients = values;
                    break;
                case 'appliance':
                    this.filteredAppliances = values;
                    break;
                case 'ustensils':
                    this.filteredUstensils = values;
                    break;
                default:
                    console.error('Type de filtre non reconnu');
                    break;
            }
            this.updateLists();
        });

        document.addEventListener('InputCleared', event => {
            const { type } = event.detail;
            switch (type) {
                case 'ingredients':
                    this.filteredIngredients = [];
                    break;
                case 'appliance':
                    this.filteredAppliances = [];
                    break;
                case 'ustensils':
                    this.filteredUstensils = [];
                    break;
                default:
                    console.error('Type de filtre non reconnu');
                    break;
            }
            this.updateLists();
        });
    }
}




// import FiltersItemTemplate from '../templates/FiltersItemTemplate.js';
// import { DatasApi } from '../main.js';

// export default class FiltersListController {
//     constructor() {
//         this.ingredientsList = document.getElementById('ingredients_list');
//         this.applianceList = document.getElementById('appliance_list');
//         this.ustensilsList = document.getElementById('ustensils_list');

//         this.filtersItemTemplate = new FiltersItemTemplate();
//         this.updateLists();

//         this.initializeEventListeners();
//     }

//     updateLists(filteredValues = {}) {
//         this.updateList('ingredients', filteredValues.ingredients || DatasApi.getAllIngredients());
//         this.updateList('appliance', filteredValues.appliance || DatasApi.getAllAppliances());
//         this.updateList('ustensils', filteredValues.ustensils || DatasApi.getAllUstensils());
//     }

//     updateList(type, values) {
//         const listElement = this[type + 'List'];
//         listElement.innerHTML = ''; // Clear previous items

//         values.forEach(value => {
//             const listItem = this.filtersItemTemplate.filteritemCard(value, type);
//             listElement.appendChild(listItem);
//         });
//     }

//     initializeEventListeners() {
       
//         document.addEventListener('FilteredValuesChanged', event => {
//             const { type, values } = event.detail;
//             const filteredValues = { [type]: values };
//             this.updateLists(filteredValues);
//         });
//     }
// }
