import FiltersItemTemplate from '../templates/FiltersItemTemplate.js';
import { DatasApi } from '../main.js';

export default class FiltersListController {
    constructor(type) {
        this.type = type;

        this.listElement = document.getElementById(`${this.type}_list`);

        this.filtersItemTemplate = new FiltersItemTemplate();
        this.filteredItem = [];

        this.initializeEventListeners();
        this.updateLists();
    }

    updateLists() {
        this.updateList(this.filteredItem.length > 0 ? this.filteredItem : DatasApi.getItemsByType(this.type));
    }

    updateList(values) {
        this.listElement.innerHTML = ''; // Clear previous items

        values.forEach(value => {
            const listItem = this.filtersItemTemplate.filteritemCard(value, this.type);
            this.listElement.appendChild(listItem);
        });
    }

    initializeEventListeners() {
        document.addEventListener('FilteredValuesChanged', event => {
            const { type, values } = event.detail;
            if ( type === this.type ) {
                this.filteredItem = values;
            }
            this.updateLists();
        });

        document.addEventListener('InputCleared', () => {
            this.filteredItem = [];
            this.updateLists();
        });
    }
}