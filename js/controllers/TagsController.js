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

    // Fonction pour initialiser les écouteurs d'événements
    initializeEventListeners() {
        // Écoute de l'événement émis par ListClickComponent.js lorsqu'un tag est sélectionné
        const handleItemListSelected = event => {
            const { value, type, element } = event.detail;
            const tagDetails = { value, type, element };

            this.addTagToList(tagDetails);
            this.displayTag(tagDetails);
            console.log('Tableau des tags add', this.tagsList);
            this.getTagsList()
        };

        // Écoute de l'événement émis pour supprimer un tag
        const handleRemoveTag = event => {
            const { value, type, element } = event.detail;
            const tagDetails = { value, type, element };

            this.removeTagToList(tagDetails);
            this.undisplayTag(tagDetails);
            console.log('Tableau des tags remove',this.tagsList);
            this.getTagsList()
        };

        document.addEventListener('ItemListSelected', handleItemListSelected);
        document.addEventListener('tagDeleted', handleRemoveTag);
        
    }
}




// import TagTemplate from '../templates/TagTemplate.js';

// export default class TagsController {
//     constructor() {
//         this.tagsList = []; // Tableau pour enregistrer les tags sélectionnés
//         this.tagWrap = document.getElementById('filters_tags');

//         // Initialisation des écouteurs d'événements
//         this.initializeEventListeners();
//     }

//     // Fonction pour ajouter un tag à la liste
//     addTagToList(tagDetails) {
//         if (!this.isTagExists(tagDetails)) {
//             this.tagsList.push(tagDetails);
//         }
//         console.log('De la fonction addTagToList', this.tagsList);
//     }

//     // Fonction pour vérifier si un tag existe déjà dans la liste
//     isTagExists(tagDetails) {
//         return this.tagsList.some(tag => 
//             tag.value === tagDetails.value &&
//             tag.type === tagDetails.type
//         );
//     }

//     // Fonction pour créer et ajouter un tag à l'écran
//     displayTag(tagDetails) {
//         const tagTemplate = new TagTemplate(tagDetails.value, tagDetails.type);
//         const tagElement = tagTemplate.tagCard();
//         this.tagWrap.appendChild(tagElement);
//     }

//     // Fonction pour supprimer un tag de la liste
//     removeTagToList(tagDetails) {
//         this.tagsList = this.tagsList.filter(tag => 
//             !(tag.value === tagDetails.value && tag.type === tagDetails.type)
//         );
//     }

//     // Fonction pour retourner le tableau de tags
//     getTagsList() {
//         return this.tagsList;
//     }

//     // Fonction pour initialiser les écouteurs d'événements
//     initializeEventListeners() {
//         // Écoute de l'événement émis par ListClickComponent.js lorsqu'un tag est sélectionné
//         const handleItemListSelected = event => {
//             const { value, type, element } = event.detail;
//             const tagDetails = { value, type, element };

//             this.addTagToList(tagDetails);
//             this.displayTag(tagDetails);
//         };

//         document.addEventListener('ItemListSelected', handleItemListSelected);
//     }
// }



// import TagTemplate from '../templates/TagTemplate.js';

// export default class TagsController {
//     constructor() {
//         this.tagsList = []; // Tableau pour enregistrer les tags sélectionnés
//         this.tagWrap = document.getElementById('filters_tags');

//         // Initialisation des écouteurs d'événements
//         this.initializeEventListeners();
//     }

//     // Ajoute un tag sélectionné au tableau
//     addTagToList(tagDetails) {
//         // Vérifie si le tag existe déjà dans la liste
//         const exists = this.tagsList.some(tag => 
//             tag.value === tagDetails.value &&
//             tag.type === tagDetails.type
//         );

//         // Ajoute le tag uniquement s'il n'existe pas déjà dans la liste
//         if (!exists) {
//             this.tagsList.push(tagDetails);
//             console.log("Tag ajouté à la liste :", tagDetails);
//             console.log('Tag Array Clean', this.tagsList);
//             // Rend à nouveau les tags chaque fois qu'un nouveau tag est ajouté
//             this.renderTags();
//         }

//         return this.tagsList;
//     }

//     // Méthode pour rendre les tags à nouveau
//     renderTags() {
//         this.tagWrap.innerHTML = ''; // Efface les tags existants avant de les rendre à nouveau

//         // Parcours de this.tagsList et création des éléments de tag pour chaque élément
//         this.tagsList.forEach(tag => {
//             const tagTemplate = new TagTemplate(tag.value, tag.type); // Utilisation du template des tags
//             const tagElement = tagTemplate.tagCard();
//             this.tagWrap.appendChild(tagElement);
//         });
//     }
    
//     // Méthode pour retourner le tableau this.tagsList
//     getTagsList() {
//         return this.tagsList;
//     }

//     // Méthode pour initialiser les écouteurs d'événements
//     initializeEventListeners() {
//         // Écoute de l'événement émis par ListClickComponent.js lorsqu'un tag est sélectionné
//         document.addEventListener('ItemListSelected', event => {
//             const { value, type, element } = event.detail;
//             const tagDetails = {
//                 value: value,
//                 type: type,
//                 element: element
//             };
//             this.addTagToList(tagDetails);
//         });
//     }
// }