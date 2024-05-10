import FiltersItemTemplate from '../templates/FiltersItemTemplate.js';
import { NewDatasApi } from "../main.js"

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
        this.updateList(this.filteredItem.length > 0 ? this.filteredItem : NewDatasApi.getItemsByType(this.type));
    }

    updateList(values) {
        this.listElement.innerHTML = ''; // Clear previous items

        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            const listItem = this.filtersItemTemplate.filteritemCard(value, this.type);
            this.listElement.appendChild(listItem);
        }
    }

    initializeEventListeners() {
        document.addEventListener('FilteredValuesChanged', event => {
            const { type, values } = event.detail;
            if (type === this.type) {
                this.filteredItem = values;
                this.updateLists();
            }
        });
    }
}