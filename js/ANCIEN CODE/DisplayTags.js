import TagTemplate from "../templates/TagTemplate.js";
export default class DisplayTags {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.tags = [];
    }

    createTag(tagName, listItem) {
        const existingTag = this.getTagByName(tagName);

        if (!existingTag) {
            const tagHTML = TagTemplate.generateHTML(tagName);
            const tagElement = document.createElement('div');
            tagElement.innerHTML = tagHTML;
            this.container.appendChild(tagElement);

            const deleteButton = tagElement.querySelector('.delete_tag');
            deleteButton.addEventListener('click', () => {
                this.deleteTag(tagName);
            });

            const filterType = this.getFilterTypeFromListItem(listItem);

            this.tags.push({
                tagName: tagName,
                listItem: listItem,
                tagElement: tagElement,
                nameList: filterType
            });

            // // Ajoute la classe 'selected' et modifie l'attribut 'aria-checked'
            // listItem.classList.add('selected');
            // listItem.setAttribute('aria-checked', 'true');
        }

        // Ajoute l'émission de l'événement 'tagsUpdated' après chaque modification des tags
        document.dispatchEvent(new Event('tagsUpdated'));

        // Retourne les tags après chaque mise à jour
        return this.tags;
    }
   
    deleteTag(tagName) {
        const tagInfoIndex = this.tags.findIndex(tag => tag.tagName === tagName);
        if (tagInfoIndex !== -1) {
            const tagInfo = this.tags[tagInfoIndex];
            this.container.removeChild(tagInfo.tagElement);

            // Utilisez splice pour supprimer l'élément à l'index correspondant
            this.tags.splice(tagInfoIndex, 1);

            // // Supprime la classe 'selected' et modifiez l'attribut 'aria-checked'
            // listItem.classList.remove('selected');
            // listItem.setAttribute('aria-checked', 'false');
        }
        // Ajoute l'émission de l'événement 'tagsUpdated' après chaque modification des tags
        document.dispatchEvent(new Event('tagsUpdated'));

        // Retourne les tags après chaque mise à jour
        return this.tags;
    }

    getTagByName(tagName) {
        return this.tags.find(tag => tag.tagName === tagName);
    }

    getFilterTypeFromListItem(listItem) {
        // Récupére le filterType en analysant les classes du parent ul
        const filterTypeClass = listItem.parentElement.classList[0]; // Utilise la première classe du parent ul
        return filterTypeClass.replace('_list', ''); 
    }

    getTags() {
        return this.tags;
    }
}