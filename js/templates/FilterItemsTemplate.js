import ListItemsClickHandler from '../utils/ListItemsClickHandler.js';

export default class FilterItemsTemplate {
    constructor() {
        this.listItemClickHandler = new ListItemsClickHandler();
    }

    createListItem(item, listType) {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.classList.add(`${listType}Item`);

        // Ajoute un écouteur de clic pour réagir aux clics sur les balises <li>
        listItem.addEventListener('click', () => this.handleListItemClick(item, listType));

        return listItem;
    }

    handleListItemClick(item, listType) {
        this.listItemClickHandler.handleClick(item, listType);
    }
}