// export default class FilterTemplate {
//     constructor(filterType, items) {
//         this.filterType = filterType;
//         this.items = items;
//     }
    
//     generateHTML() {
//         const filterList = document.createElement('ul');
//         filterList.classList.add(`${this.filterType}_list`, 'list_scroll');

//          this.items.forEach(item => {
//                 const listItem = document.createElement('li');
//                 listItem.classList.add('listItem');
//                 listItem.textContent = item;
//                 filterList.appendChild(listItem);
//             });

//         return filterList;
//     }
// }

export default class FilterItemsTemplate {
    constructor() {}

    generateFilterItems(items, parentElementId) {
        const parentElement = document.getElementById(parentElementId);

        if (!parentElement) {
            console.error(`Parent element with id '${parentElementId}' not found.`);
            return;
        }

        // Supprime tous les éléments enfants du parent avant d'ajouter les nouveaux
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            parentElement.appendChild(li);
        });
    }
}
