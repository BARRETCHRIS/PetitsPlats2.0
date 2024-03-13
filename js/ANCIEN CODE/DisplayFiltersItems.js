import FilterItemsTemplate from '../templates/FilterItemsTemplate.js';
import ListItemsClickHandler from '../utils/ListItemsClickHandler.js';

export default class DisplayFiltersItems {
    constructor(inputId, filterType, filtersSearchManager) {
        this.list = document.getElementById(`${filterType}_list`);
        this.filterType = filterType;
        this.inputId = inputId;
        this.filtersSearchManager = filtersSearchManager;
        this.filterItemsTemplate = new FilterItemsTemplate();
    }
    
    displayFilterItems() {
        const inputValue = document.getElementById(this.inputId).value;
        const updatedItems = this.getUpdatedItems(inputValue);
        this.clearList();

        updatedItems.forEach(item => {
            const listItem = this.filterItemsTemplate.createListItem(item, this.filterType);
            this.list.appendChild(listItem);
        });
    }

    getUpdatedItems(inputValue) {
        switch (this.filterType) {
            case 'ingredients':
                return this.filtersSearchManager.ingredientsListUpdated.length > 0 ?
                    this.filtersSearchManager.ingredientsListUpdated : this.filtersSearchManager.ingredientsListOrigin;

            case 'appliance':
                return this.filtersSearchManager.applianceListUpdated.length > 0 ?
                    this.filtersSearchManager.applianceListUpdated : this.filtersSearchManager.applianceListOrigin;

            case 'ustensils':
                return this.filtersSearchManager.ustensilsListUpdated.length > 0 ?
                    this.filtersSearchManager.ustensilsListUpdated : this.filtersSearchManager.ustensilsListOrigin;

            default:
                return [];
        }
    }

    clearList() {
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }
    }

    filterRecipesByItem(item) {
        console.log(`Filter recipes by ${this.filterType}: ${item}`);
    }
}