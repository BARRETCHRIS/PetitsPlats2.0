export default class FiltersItemTemplate {
    constructor(item, filterType) {
        this.item = item;
        this.filterType = filterType;
    }

    filteritemCard(item, filterType) {
        const listItemCard = document.createElement('li');
        listItemCard.textContent = item;
        listItemCard.classList.add(`${filterType}_item`);
        listItemCard.setAttribute('aria-checked', 'false');

        return listItemCard;
    }
}