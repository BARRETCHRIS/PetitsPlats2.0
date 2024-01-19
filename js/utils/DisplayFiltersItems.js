import FilterTemplate from "../templates/FilterTemplate.js";
import DisplayTags from "./DisplayTags.js";


export default class DisplayFiltersItems {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.displayTags = new DisplayTags('.filters_tags', ['ingredients', 'appareils', 'ustensiles']);

        // Ajoute une propriété pour stocker les tags mis à jour
        this.updatedTags = [];
    }

    displayFilterItems(filterType, items, parentFormId) {
        const filterTemplate = new FilterTemplate(filterType, items);
        const filterList = filterTemplate.generateHTML();

        const parentForm = document.getElementById(parentFormId);
        const filterContainer = parentForm.querySelector(`#${filterType}_btn`);

        this.clearLists(parentForm);

        filterContainer.insertAdjacentElement('afterend', filterList);

        // filterList.querySelectorAll('li').forEach((listItem) => {
        //     listItem.addEventListener('click', () => {
        //         const tagName = listItem.textContent;
        //         const updatedTags = this.displayTags.createTag(tagName, listItem);
        //         console.log(updatedTags);
        //         return updatedTags;
        //     });
        // });

        filterList.querySelectorAll('li').forEach((listItem) => {
            listItem.addEventListener('click', () => {
                const tagName = listItem.textContent;
                const updatedTags = this.displayTags.createTag(tagName, listItem);
                
                // Met à jour la propriété updatedTags
                this.updatedTags = updatedTags;

                // Émet un événement personnalisé avec les tags mis à jour
                const event = new CustomEvent('filtersUpdated', { detail: updatedTags });
                document.dispatchEvent(event);
            });
        });
    }  

    clearLists(parentForm) {
        // Nettoye toutes les listes sous le formulaire
        const lists = parentForm.querySelectorAll('ul');
        lists.forEach(list => {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        });
    }
}