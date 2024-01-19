export default class FilterTemplate {
    constructor(filterType, items) {
        this.filterType = filterType;
        this.items = items;
    }

    // TEST GENERATION ERREUR MESSAGE
    generateHTML() {
        const filterList = document.createElement('ul');
        filterList.classList.add(`${this.filterType}_list`, 'list_scroll');

        if (this.items.length === 0) {
            // Si la liste d'items est vide, affiche un message d'erreur
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('filter-error-message');
            errorMessage.textContent = "Aucune entrée correspondante.";
            filterList.appendChild(errorMessage);
        } else {
            this.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.classList.add('listItem');
                listItem.textContent = item;
                filterList.appendChild(listItem);
            });
        }

        return filterList;
    }
    // FIN TEST GENERATION ERREUR MESSAGE
}
