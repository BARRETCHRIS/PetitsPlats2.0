export default class DisplayFiltersItems {
    // Constructeur prenant l'ID de l'input et le type de filtre en paramètres
    constructor(inputId, filterType) {
        this.list = document.getElementById(`${filterType}_list`);
        this.filterType = filterType;
        this.inputId = inputId;
    }

    // Méthode pour afficher les éléments filtrés dans la liste
    displayFilterItems(updatedItems) {
        // Efface le contenu actuel de la liste
        this.clearList();

        // Itère sur les éléments filtrés et crée des balises <li> pour chaque élément
        updatedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.classList.add(`${this.filterType}Item`);

            // Ajoute un écouteur de clic pour filtrer les recettes lorsque l'élément est cliqué
            listItem.addEventListener('click', () => this.filterRecipesByItem(item));

            // Ajoute l'élément à la liste
            this.list.appendChild(listItem);
        });
    }

    // Méthode pour effacer le contenu de la liste
    clearList() {
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }
    }

    // Méthode pour filtrer les recettes par un élément spécifique
    filterRecipesByItem(item) {
        // Dispatche un événement personnalisé 'update' avec le type de filtre et l'élément sélectionné
        const updateEvent = new CustomEvent('update', { detail: { type: this.filterType, updatedItems: [item] } });
        document.dispatchEvent(updateEvent);
    }
}


// // import FilterTemplate from "../templates/FilterTemplate.js";

// // export default class DisplayFiltersItems {
// //     constructor(containerSelector, displayTags) {
// //         this.container = document.querySelector(containerSelector);
// //         this.displayTags = displayTags;
// //     }

// //     displayFilterItems(filterType, items, parentFormId) {
// //         const filterTemplate = new FilterTemplate(filterType, items);
// //         const filterList = filterTemplate.generateHTML();

// //         const parentForm = document.getElementById(parentFormId);
// //         const filterContainer = parentForm.querySelector(`#${filterType}_btn`);

// //         this.clearLists(parentForm);

// //         filterContainer.insertAdjacentElement('afterend', filterList);

// //         filterList.querySelectorAll('li').forEach((listItem) => {
// //             listItem.addEventListener('click', () => {
// //                 const tagName = listItem.textContent;
// //                 const updatedTags = this.displayTags.createTag(tagName, listItem);
// //                 console.log(updatedTags);
// //                 console.log(listItem.textContent)
// //                 return updatedTags;
// //             });
// //         });
// //     }  

// //     clearLists(parentForm) {
// //         // Nettoye toutes les listes sous le formulaire
// //         const lists = parentForm.querySelectorAll('ul');
// //         lists.forEach(list => {
// //             while (list.firstChild) {
// //                 list.removeChild(list.firstChild);
// //             }
// //         });
// //     }
// // }

// export default class DisplayFiltersItems {
//     constructor(ingredientsList, applianceList, ustensilsList) {
//         this.ingredientsList = ingredientsList;
//         this.applianceList = applianceList;
//         this.ustensilsList = ustensilsList;
//     }

//     displayItems(items, listElement) {
//         // Efface la liste existante
//         listElement.innerHTML = '';

//         // Ajoute chaque élément de la liste à la liste HTML
//         items.forEach(item => {
//             const listItem = document.createElement('li');
//             listItem.textContent = item;
//             listElement.appendChild(listItem);
//         });
//     }

//     displayIngredients(ingredients) {
//         this.displayItems(ingredients, this.ingredientsList);
//     }

//     displayAppliance(appliance) {
//         this.displayItems(appliance, this.applianceList);
//     }

//     displayUstensils(ustensils) {
//         this.displayItems(ustensils, this.ustensilsList);
//     }
// }