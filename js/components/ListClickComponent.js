export default class ListClickListClickComponentListener {
    constructor() {
        this.selectedValues = []; // Tableau pour stocker toutes les valeurs sélectionnées avec leur type de filtre correspondant
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('click', event => {
            const clickedElement = event.target;
            const listItem = clickedElement.closest('li'); // Trouve l'élément <li> le plus proche
            if (listItem) {
                const listParent = listItem.parentElement;
                const type = listParent.id.replace('_list', ''); // Récupére le type de filtre à partir de l'identifiant de la liste parente
                const value = listItem.textContent.trim(); // Récupére la valeur du <li>

                // Vérifier si la valeur est déjà sélectionnée
                const existingItemIndex = this.selectedValues.findIndex(item => item.type === type && item.value === value);

                if (existingItemIndex !== -1) {
                    // Si la valeur est déjà sélectionnée, la retirer du tableau et enlever la classe "selected"
                    this.selectedValues.splice(existingItemIndex, 1);
                    listItem.classList.remove('selected');
                    listItem.setAttribute('aria-checked', 'false');
                } else {
                    // Sinon, ajoute la valeur au tableau et ajouter la classe "selected"
                    this.selectedValues.push({ type, value });
                    listItem.classList.add('selected');
                    listItem.setAttribute('aria-checked', 'true');
                }

                // Dispatch event to inform other files of the change
                const selectedValuesEvent = new CustomEvent('SelectedValuesChanged', {
                    detail: {
                        values: this.selectedValues
                    }
                });
                document.dispatchEvent(selectedValuesEvent);
            }
        });
    }
}



// export default class ListClickComponent {
//     constructor() {
//         this.selectedValues = []; // Tableau pour stocker toutes les valeurs sélectionnées avec leur type de filtre correspondant
//         this.initializeEventListeners();
//     }

//     initializeEventListeners() {
//         document.addEventListener('click', event => {
//             const clickedElement = event.target;
//             const listItem = clickedElement.closest('li'); // Trouve l'élément <li> le plus proche
//             if (listItem) {
//                 const listParent = listItem.parentElement;
//                 const type = listParent.id.replace('_list', ''); // Récupére le type de filtre à partir de l'identifiant de la liste parente
//                 const value = listItem.textContent.trim(); // Récupére la valeur du <li>

//                 // Vérifier si la valeur est déjà sélectionnée
//                 const existingItemIndex = this.selectedValues.findIndex(item => item.type === type && item.value === value);

//                 if (existingItemIndex !== -1) {
//                     // Si la valeur est déjà sélectionnée, la retirer du tableau
//                     this.selectedValues.splice(existingItemIndex, 1);
//                 } else {
//                     // Sinon, ajoute la valeur au tableau
//                     this.selectedValues.push({ type, value });
//                 }

//                 // Dispatch event to inform other files of the change
//                 const selectedValuesEvent = new CustomEvent('SelectedValuesChanged', {
//                     detail: {
//                         values: this.selectedValues
//                     }
//                 });
//                 document.dispatchEvent(selectedValuesEvent);
//             }
//         });
//     }
// }


// export default class ListClickComponent {
//     constructor() {
//         this.selectedValues = []; // Tableau pour stocker toutes les valeurs sélectionnées avec leur type de filtre correspondant
//         this.initializeEventListeners();
//     }

//     initializeEventListeners() {
//         document.addEventListener('click', event => {
//             const clickedElement = event.target;
//             const listItem = clickedElement.closest('li'); // Trouve l'élément <li> le plus proche
//             if (listItem) {
//                 const value = listItem.textContent.trim(); // Récupére la valeur du <li>
//                 const parentList = listItem.closest('ul'); // Trouve la liste parente de l'élément <li>
//                 if (parentList) {
//                     const type = parentList.id.replace('_list', ''); // Récupére le type de filtre à partir de l'identifiant de la liste parente

//                     // Vérifier si la valeur est déjà sélectionnée
//                     const existingItemIndex = this.selectedValues.findIndex(item => item.type === type && item.value === value);

//                     if (existingItemIndex !== -1) {
//                         // Si la valeur est déjà sélectionnée, la retirer du tableau
//                         this.selectedValues.splice(existingItemIndex, 1);
//                     } else {
//                         // Sinon, ajoute la valeur au tableau
//                         this.selectedValues.push({ type, value });
//                     }

//                     // Dispatch event to inform other files of the change
//                     const selectedValuesEvent = new CustomEvent('SelectedValuesChanged', {
//                         detail: {
//                             values: this.selectedValues
//                         }
//                     });
//                     document.dispatchEvent(selectedValuesEvent);
//                 }
//             }
//         });
//     }
// }