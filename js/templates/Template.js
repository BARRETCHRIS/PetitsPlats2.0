export default class FilterTemplate {
    constructor(filterType, items) {
        this.filterType = filterType;
        this.items = items;
    }

    generateHTML() {
        const filterList = document.createElement('ul');
        filterList.classList.add(`${this.filterType}_list`, 'list_scroll');

        this.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('listItem');
            listItem.textContent = item;
            filterList.appendChild(listItem);
        });

        return filterList;
    }
}
