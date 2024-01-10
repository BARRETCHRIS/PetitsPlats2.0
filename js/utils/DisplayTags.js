import TagTemplate from "../templates/TagTemplate.js";
export default class DisplayTags {
    constructor(containerSelector, listIds) {
        this.container = document.querySelector(containerSelector);
        this.listIds = listIds;
        this.tags = [];
    }

    createTag(tagName, listItem, nameList) {
        const existingTag = this.getTagByName(tagName);

        if (!existingTag) {
            const tagHTML = TagTemplate.generateHTML(tagName);
            const tagElement = document.createElement('div');
            tagElement.innerHTML = tagHTML;
            this.container.appendChild(tagElement);

            const deleteButton = tagElement.querySelector('.delete_tag');
            deleteButton.addEventListener('click', () => {
                this.deleteTag(tagName, listItem);
            });

            // console.log(listItem)

            const filterType = this.getFilterTypeFromListItem(listItem);

            this.tags.push({
                tagName: tagName,
                listItem: listItem,
                tagElement: tagElement,
                nameList: filterType
            });

            // Ajoute la classe 'selected' et modifie l'attribut 'aria-checked'
            listItem.classList.add('selected');
            listItem.setAttribute('aria-checked', 'true');
        }
        console.log(this.tags)
    }
    
    deleteTag(tagName, listItem) {
        const tagInfo = this.tags.find(tag => tag.tagName === tagName && tag.listItem === listItem);
        if (tagInfo) {
            this.container.removeChild(tagInfo.tagElement);
            this.tags = this.tags.filter(tag => tag !== tagInfo);

            // Supprime la classe 'selected' et modifiez l'attribut 'aria-checked'
            listItem.classList.remove('selected');
            listItem.setAttribute('aria-checked', 'false');
        }
    }

    getTagByName(tagName) {
        return this.tags.find(tag => tag.tagName === tagName);
    }

    getFilterTypeFromListItem(listItem) {
        // Récupére le filterType en analysant les classes du parent ul
        const filterTypeClass = listItem.parentElement.classList[0]; // Utilise la première classe du parent ul
        return filterTypeClass.replace('_list', ''); 
    }
}