import TagTemplate from '../templates/TagTemplate.js';

export default class TagsController {
    constructor() {
        this.tagsList = []; // Tableau pour enregistrer les tags sélectionnés
        this.tagWrap = document.getElementById('filters_tags');

        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    // Fonction pour ajouter un tag à la liste
    addTagToList(tagDetails) {
        if (!this.isTagExists(tagDetails)) {
            this.tagsList.push(tagDetails);
            this.displayTag(tagDetails);
            this.emitListTagChangedEvent();
        }
    }

    // Fonction pour vérifier si un tag existe déjà dans la liste
    isTagExists(tagDetails) {
        return this.tagsList.some(tag => 
            tag.value === tagDetails.value &&
            tag.type === tagDetails.type
        );
    }

    // Fonction pour créer et ajouter un tag à l'écran
    displayTag(tagDetails) {
        const tagTemplate = new TagTemplate(tagDetails.value, tagDetails.type);
        const tagElement = tagTemplate.tagCard();
        this.tagWrap.appendChild(tagElement);
    }


    // Fonction pour supprimer un tag de la liste
    removeTagToList(tagDetails) {
        this.tagsList = this.tagsList.filter(tag => 
            !(tag.value === tagDetails.value && tag.type === tagDetails.type)
        );
        this.emitListTagChangedEvent();
    }

    // Fonction pour supprimer un tag du HTML
    undisplayTag(tagDetails) {
        const tagElement = tagDetails.element;
        tagElement.parentNode.removeChild(tagElement);
    }

    // Fonction pour retourner le tableau de tags
    getTagsList() {
        return this.tagsList;
    }

    // Fonction pour émettre l'événement listTagChanged
    emitListTagChangedEvent() {
        const listTagChangedEvent = new CustomEvent('listTagChanged', {
            detail: { tagsList: this.tagsList }
        });
        document.dispatchEvent(listTagChangedEvent);
    }

    // Fonction pour initialiser les écouteurs d'événements
    initializeEventListeners() {
        // Écoute de l'événement émis par ListClickComponent.js lorsqu'un tag est sélectionné
        const handleItemListSelected = event => {
            const { value, type, element } = event.detail;
            const tagDetails = { value, type, element };

            this.addTagToList(tagDetails);
            // console.log('Tableau des tags add', this.tagsList);
            this.getTagsList()
        };

        // Écoute de l'événement émis pour supprimer un tag
        const handleRemoveTag = event => {
            const { value, type, element } = event.detail;
            const tagDetails = { value, type, element };

            this.removeTagToList(tagDetails);
            this.undisplayTag(tagDetails);
            // console.log('Tableau des tags remove',this.tagsList);
            this.getTagsList()
        };

        document.addEventListener('ItemListSelected', handleItemListSelected);
        document.addEventListener('tagDeleted', handleRemoveTag);
        
    }
}