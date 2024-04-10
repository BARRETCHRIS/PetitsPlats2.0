export default class ListClickComponent {
    constructor() {
        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    // Ajoute la classe 'selected' à l'élément cliqué
    addItemToList(itemDetails) {
        // console.log("Item ajouté à la liste :", itemDetails);

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