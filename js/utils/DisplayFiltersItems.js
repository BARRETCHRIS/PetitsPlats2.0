import FilterTemplate from "../templates/FilterTemplate.js";
// import DisplayTags from "./DisplayTags.js";


export default class DisplayFiltersItems {
    // constructor(containerSelector) {
    //     this.container = document.querySelector(containerSelector);
    //     this.displayTags = new DisplayTags('.filters_tags', ['ingredients', 'appliance', 'ustensiles']);
    // }
    constructor(containerSelector, displayTags) {
        this.container = document.querySelector(containerSelector);
        this.displayTags = displayTags;
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
        //         return updatedTags;
        //     });
        // });
        filterList.querySelectorAll('li').forEach((listItem) => {
            listItem.addEventListener('click', () => {
                const tagName = listItem.textContent;
                const updatedTags = this.displayTags.createTag(tagName);
                console.log(updatedTags);
                return updatedTags;
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

    // getTagsList() {
    //     const tagsList = this.displayTags.getTags();
    //     // console.log(tagsList);
    //     return tagsList;
    // }
}