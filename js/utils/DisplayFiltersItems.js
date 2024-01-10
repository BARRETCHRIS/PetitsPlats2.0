import FilterTemplate from "../templates/FilterTemplate.js";
import DisplayTags from "./DisplayTags.js";


export default class DisplayFiltersItems {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.displayTags = new DisplayTags('.filters_tags', ['ingredients', 'appareils', 'ustensiles']);
    }

    displayFilterItems(filterType, items, parentFormId) {
        const filterTemplate = new FilterTemplate(filterType, items);
        const filterList = filterTemplate.generateHTML();

        const parentForm = document.getElementById(parentFormId);
        const filterContainer = parentForm.querySelector(`#${filterType}_btn`);

        // TEST FILTER SEARCH
        this.clearLists(parentForm);
        // FIN TEST FILTER SEARCH

        filterContainer.insertAdjacentElement('afterend', filterList);

        filterList.querySelectorAll('li').forEach((listItem) => {
            listItem.addEventListener('click', () => {
                const tagName = listItem.textContent;
                this.displayTags.createTag(tagName, listItem);
            });
        });
    }  

    // TEST FILTER SEARCH
    clearLists(parentForm) {
        // Nettoyez toutes les listes sous le formulaire
        const lists = parentForm.querySelectorAll('ul');
        lists.forEach(list => {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        });
    }
    // FIN TEST FILTER SEARCH  
}