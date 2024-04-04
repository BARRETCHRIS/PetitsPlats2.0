export default class ListClickComponent {
    constructor() {
        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    // Ajoute la classe 'selected' à l'élément cliqué
    addItemToList(itemDetails) {
        console.log("Item ajouté à la liste :", itemDetails);

        // Met à jour la classe et l'attribut aria-checked de l'élément cliqué
        const listItem = itemDetails.element;
        if (listItem) {
            listItem.classList.add('selected');
            listItem.setAttribute('aria-checked', 'true');
        }
    }

    // Méthode pour initialiser les écouteurs d'événements
    initializeEventListeners() {
        // Écoute de l'événement émis par FiltersItemTemplate.js lorsqu'un élément est sélectionné
        document.addEventListener('ItemListSelected', event => {
            const { value, type, element } = event.detail;
            const itemDetails = { value, type, element };
            this.addItemToList(itemDetails);
        });
    }
}



// export default class ListClickComponent {
//     constructor() {
//         this.clickedItems = []; // Tableau pour enregistrer les éléments cliqués

//         // Initialisation des écouteurs d'événements
//         this.initializeEventListeners();
//     }

//     // Ajoute un élément cliqué au tableau
//     addItemToList(itemDetails) {
//         this.clickedItems.push(itemDetails);
//         console.log("Item ajouté à la liste :", itemDetails);
//         console.log(this.clickedItems);

//         // Met à jour la classe et l'attribut aria-checked de l'élément cliqué
//         const listItem = document.querySelector(`.${itemDetails.type}_item[value="${itemDetails.value}"]`);
//         if (listItem) {
//             listItem.classList.add('selected');
//             listItem.setAttribute('aria-checked', 'true');
//         }

//         // Déclenche l'événement tagsSelectedChanged avec les nouvelles valeurs du tableau
//         this.triggerTagsSelectedChanged();
//     }

//     // Méthode pour déclencher l'événement tagsSelectedChanged
//     triggerTagsSelectedChanged() {
//         document.dispatchEvent(new CustomEvent('tagsSelectedChanged', { detail: { clickedItems: this.clickedItems } }));
//     }

//     // Méthode pour initialiser les écouteurs d'événements
//     initializeEventListeners() {
//         // Écoute de l'événement émis par FiltersItemTemplate.js lorsqu'un élément est sélectionné
//         document.addEventListener('ItemListSelected', event => {
//             const { value, type, element } = event.detail;
//             const itemDetails = { value, type, element };
//             this.addItemToList(itemDetails);
//         });
//     }
// }