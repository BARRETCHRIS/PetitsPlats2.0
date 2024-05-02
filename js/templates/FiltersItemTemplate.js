export default class FiltersItemTemplate {
    constructor(item, filterType) {
        this.item = item;
        this.filterType = filterType;
    }

    filteritemCard(item, filterType) {
        const listItemCard = document.createElement('li');
        listItemCard.textContent = item;
        listItemCard.classList.add(`${filterType}_item`);
        listItemCard.style.cursor = "pointer";

        // Ajout d'une valeur à l'attribut value
        listItemCard.setAttribute('value', item); // Ajout d'une valeur à l'attribut value

        listItemCard.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('ItemListSelected', { 
                detail: {
                    value: item,
                    type: filterType
                } 
            }));
        });

        return listItemCard;
    }
}