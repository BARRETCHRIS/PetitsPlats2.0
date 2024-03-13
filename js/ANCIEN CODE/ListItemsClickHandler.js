export default class ListItemsClickHandler {
    constructor() {
        this.selectedItems = [];
    }

    handleClick(item, listType) {
        // Vérifie si l'élément est déjà sélectionné
        const isSelected = this.isSelected(item, listType);

        if (!isSelected) {
            // L'élément n'est pas encore sélectionné, donc le sélectionner
            this.selectedItems.push({ text: item, listType });

            // Sélectionne l'élément visuellement
            this.updateItemVisualState(item, listType, true);
        }

        this.handleSelectedItems();
    }

    // Méthode pour vérifier si un élément est déjà sélectionné
    isSelected(item, listType) {
        return this.selectedItems.some(selectedItem => selectedItem.listType === listType && selectedItem.text === item);
    }

    // Méthode pour mettre à jour l'état visuel de l'élément
    updateItemVisualState(item, listType, isSelected) {
        const itemElements = document.querySelectorAll(`.${listType}Item`);

        itemElements.forEach(element => {
            if (element.textContent === item) {
                if (isSelected) {
                    element.classList.add('selected');
                    element.setAttribute('aria-checked', 'true');
                } else {
                    // On ne retire pas la classe "selected" ici pour éviter la désélection
                    element.setAttribute('aria-checked', 'false');
                }
            }
        });
    }

    // Méthode appelée pour manipuler les éléments sélectionnés
    handleSelectedItems() {
        console.log('Selected Items:', this.selectedItems);
        // Ajoutez ici votre logique pour traiter les éléments sélectionnés
    }

    getSelectedItems() {
        return this.selectedItems;
    }
}

// export default class ListItemsClickHandler {
//     constructor() {
//         this.selectedItems = [];
//     }

//     handleClick(item, listType) {
//         // Vérifie si l'élément est déjà sélectionné
//         const isSelected = this.isSelected(item, listType);

//         if (!isSelected) {
//             // L'élément n'est pas encore sélectionné, donc le sélectionner
//             this.selectedItems.push({ text: item, listType });

//             // Sélectionne l'élément visuellement
//             this.updateItemVisualState(item, listType, true);
//         }

//         this.handleSelectedItems();
//     }

//     // Méthode pour vérifier si un élément est déjà sélectionné
//     isSelected(item, listType) {
//         return this.selectedItems.some(selectedItem => selectedItem.listType === listType && selectedItem.text === item);
//     }

//     // Méthode pour mettre à jour l'état visuel de l'élément
//     updateItemVisualState(item, listType, isSelected) {
//         const itemElements = document.querySelectorAll(`.${listType}Item`);

//         itemElements.forEach(element => {
//             if (element.textContent === item) {
//                 if (isSelected) {
//                     element.classList.add('selected');
//                     element.setAttribute('aria-checked', 'true');
//                 } else {
//                     element.setAttribute('aria-checked', 'false');
//                 }
//             }
//         });
//     }

//     // Méthode appelée pour manipuler les éléments sélectionnés
//     handleSelectedItems() {
//         console.log('Selected Items:', this.selectedItems);
//         // Ajoute ici votre logique pour traiter les éléments sélectionnés
//     }
// }