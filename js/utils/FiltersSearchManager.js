import DisplayFiltersItems from "./DisplayFiltersItems.js";

// Définition de la classe FiltersSearch
export default class FiltersSearchManager {
    // Le constructeur prend deux fonctions en paramètres et les assigne comme propriétés
    constructor(getDatas, displayFiltersItems) {
        this.getDatas = getDatas;

        // Intanciation DisplayFiltersItems pour chaque type de filtre
        this.displayFiltersItemsIngredients = new DisplayFiltersItems('ingredients_search', 'ingredients');
        this.displayFiltersItemsAppliance = new DisplayFiltersItems('appliance_search', 'appliance');
        this.displayFiltersItemsUstensils = new DisplayFiltersItems('ustensils_search', 'ustensils');

        // Initialise les écouteurs d'événements
        this.setupEventListeners();

        // Charge toutes les listes à l'initialisation de la page
        this.loadAllItems();
    }

    loadAllItems() {
        console.log('Loading all items...');
        const ingredients = this.getDatas.getIngredients();
        console.log('Ingredients:', ingredients);
        const appliances = this.getDatas.getAppliance();
        console.log('Appliances:', appliances);
        const ustensils = this.getDatas.getUstensils();
        console.log('Ustensils:', ustensils);

        this.displayFiltersItemsIngredients.displayFilterItems(ingredients);
        this.displayFiltersItemsAppliance.displayFilterItems(appliances);
        this.displayFiltersItemsUstensils.displayFilterItems(ustensils);
    }

    // Méthode pour configurer les écouteurs d'événements sur les formulaires de filtres
    setupEventListeners() {
        // Sélectionne tous les formulaires de filtres dans le document
        const filterForms = document.querySelectorAll('.filter');
        // Itère sur chaque formulaire et configure les écouteurs d'événements
        filterForms.forEach(form => this.setupFormEventListeners(form));
    }

    // Méthode pour configurer les écouteurs d'événements sur un formulaire spécifique
    setupFormEventListeners(form) {
        const input = form.querySelector('.filter_search_input');
        const crossIcon = form.querySelector('.filter_search_cross');

        // Ajoute un écouteur pour le clic sur l'icône de croix
        crossIcon.addEventListener('click', () => this.resetInput(input));
        // Ajoute un écouteur pour l'événement d'entrée dans l'input
        input.addEventListener('input', () => this.handleInputChange(form));
        // Ajoute un écouteur pour la touche enfoncée dans l'input
        input.addEventListener('keydown', (event) => this.blockEnterKey(event));
    }

    // Méthode pour réinitialiser la valeur de l'input et déclencher manuellement un événement input
    resetInput(input) {
        input.value = '';
        this.triggerInputEvent(input);
    }

    // Méthode pour gérer le changement de valeur dans l'input du filtre
    handleInputChange = async (form) => {
        // Obtient le type de filtre du formulaire
        const filterType = this.getFilterType(form);
        const input = form.querySelector('.filter_search_input');
        const crossIcon = form.querySelector('.filter_search_cross');
        const errorMessage = form.querySelector('.error_message');
        const inputValue = this.getTrimmedLowerCaseValue(input);

        // Gère la visibilité de l'icône de croix dès qu'il y a quelque chose dans l'input
        this.toggleCrossIconVisibility(crossIcon, inputValue);

        // Vérifie la validité de la saisie
        const isValidInputValue = this.isValidInput(inputValue);
        if (isValidInputValue) {
            // Vérifie la longueur de la saisie
            if (this.isInputLengthValid(inputValue)) {
                // Obtient les éléments mis à jour en fonction du type de filtre et de la valeur d'entrée
                const updatedItems = await this.getUpdatedItems(filterType, inputValue);

                if (updatedItems.length === 0) {
                    // Affiche le message "Aucune correspondance trouvée" si la liste mise à jour est vide
                    this.showNoMatchMessage(errorMessage);
                } else {
                    // Met à jour l'affichage avec les éléments filtrés
                    this.updateDisplay(filterType, updatedItems);
                    // Cache le message d'erreur
                    errorMessage.textContent = '';
                    errorMessage.style.display = 'none';
                }
            } else {
                // Réinitialise la liste à afficher si la longueur de la saisie n'est pas valide
                this.resetDisplay(filterType);
                // Cache le message d'erreur
                errorMessage.textContent = '';
                errorMessage.style.display = 'none';
            }
        } else {
            // Réinitialise la liste à afficher si la saisie n'est pas valide
            this.resetDisplay(filterType);
            // Affiche un message d'erreur si la saisie n'est pas valide
            errorMessage.textContent = 'Caractères interdits détectés.';
            errorMessage.style.display = 'block';
        }
    }

    // Méthode pour obtenir le type de filtre à partir de la classe du formulaire
    getFilterType(form) {
        return form.classList[0];
    }

    // Méthode pour obtenir la valeur de l'input en minuscules et sans espaces au début et à la fin
    getTrimmedLowerCaseValue(input) {
        return input.value.toLowerCase().trim();
    }

    // Méthode pour valider la saisie en utilisant une expression régulière
    isValidInput(inputValue) {
        const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
        return !forbiddenCharactersRegex.test(inputValue);
    }

    // Méthode pour basculer la visibilité de l'icône de croix dès qu'il y a quelque chose dans l'input
    toggleCrossIconVisibility(crossIcon, inputValue) {
        // La visibilité dépend maintenant de la présence de texte dans l'input
        crossIcon.classList.toggle('visible_cross', inputValue.length > 0);
    }

    // Méthode pour vérifier la longueur de la saisie
    isInputLengthValid(inputValue) {
        return inputValue.length >= 3 || inputValue.length === 0;
    }

    // Méthode asynchrone pour obtenir les éléments mis à jour en fonction du type de filtre et de la valeur d'entrée
    async getUpdatedItems(filterType, inputValue) {
        // Récupère les éléments d'origine en fonction du type de filtre
        let originalItems = [];
        switch (filterType) {
            case 'ingredients':
                originalItems = await this.getDatas.getIngredients();
                break;
            case 'appliance':
                originalItems = await this.getDatas.getAppliance();
                break;
            case 'ustensils':
                originalItems = await this.getDatas.getUstensils();
                break;
        }
        // Filtre les éléments en fonction de la valeur d'entrée ou renvoie tous les éléments si inputValue est vide
        return inputValue === '' ? originalItems : originalItems.filter(item =>
            item.toLowerCase().includes(inputValue)
        );
    }

    // Méthode pour mettre à jour l'affichage avec les éléments filtrés
    updateDisplay(filterType, updatedItems) {
        switch (filterType) {
            case 'ingredients':
                this.displayFiltersItemsIngredients.displayFilterItems(updatedItems);
                break;
            case 'appliance':
                this.displayFiltersItemsAppliance.displayFilterItems(updatedItems);
                break;
            case 'ustensils':
                this.displayFiltersItemsUstensils.displayFilterItems(updatedItems);
                break;
        }
    }

    // Méthode pour réinitialiser l'affichage du filtre à la liste complète
    resetDisplay(filterType) {
        switch (filterType) {
            case 'ingredients':
                this.loadAllItems();  // Charge les éléments originaux
                break;
            case 'appliance':
                this.loadAllItems();  // Charge les éléments originaux
                break;
            case 'ustensils':
                this.loadAllItems();  // Charge les éléments originaux
                break;
        }
    }

    // Méthode pour déclencher manuellement un événement input sur un élément donné
    triggerInputEvent(element) {
        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);
    }

    // Méthode pour bloquer l'action par défaut de la touche Entrée
    blockEnterKey(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    // Méthode pour afficher un message "Aucune correspondance trouvée"
    showNoMatchMessage(errorMessage, filterType) {
        if (this.isListEmpty(filterType)) {
            errorMessage.innerHTML = 'Aucune correspondance trouvée.';
            errorMessage.style.display = 'block';
        }
    }

    // Méthode pour vérifier si la liste est vide
    isListEmpty(filterType) {
        switch (filterType) {
            case 'ingredients':
                return this.displayFiltersItemsIngredients.list.childElementCount === 0;
            case 'appliance':
                return this.displayFiltersItemsAppliance.list.childElementCount === 0;
            case 'ustensils':
                return this.displayFiltersItemsUstensils.list.childElementCount === 0;
            default:
                return true;
        }
    }
}

// Explications complémentaires

// Constructeur (constructor) :
// Le constructeur initialise une instance de la classe FiltersSearch.
// Il prend deux fonctions (getDatas et displayFiltersItems) comme paramètres et les assigne comme propriétés de l'instance.

// Méthode setupEventListeners :
// Cette méthode configure les écouteurs d'événements pour tous les formulaires de filtres présents dans le document.
// Elle sélectionne tous les formulaires de filtres et itère sur chaque formulaire pour configurer les écouteurs d'événements à l'aide de setupFormEventListeners.

// Méthode setupFormEventListeners :
// Cette méthode configure les écouteurs d'événements (clic, input, et keydown) pour un formulaire spécifique.
// Elle utilise les sélecteurs pour obtenir les éléments pertinents du formulaire tels que l'input et l'icône de croix.

// Méthode resetInput :
// Cette méthode réinitialise la valeur de l'input à une chaîne vide et déclenche manuellement un événement 'input'.

// Méthode handleInputChange :
// Cette méthode est appelée lorsqu'il y a un changement dans l'input du formulaire de filtre.
// Elle obtient le type de filtre, la valeur de l'input, puis gère la visibilité de l'icône de croix et la validité de la saisie.
// Si la saisie est valide et la longueur est suffisante, elle obtient les éléments mis à jour et met à jour l'affichage.

// Méthode getFilterType :
// Cette méthode obtient le type de filtre à partir de la classe du formulaire.

// Méthode getTrimmedLowerCaseValue :
// Cette méthode obtient la valeur de l'input en minuscules et sans espaces au début et à la fin.

// Méthode isValidInput :
// Cette méthode utilise une expression régulière pour valider la saisie et vérifie si elle contient des caractères interdits.

// Méthode toggleCrossIconVisibility :
// Cette méthode gère la visibilité de l'icône de croix en fonction de la présence de texte dans l'input.

// Méthode isInputLengthValid :
// Cette méthode vérifie la longueur de la saisie pour déterminer si elle est valide.

// Méthode getUpdatedItems :
// Cette méthode est asynchrone et obtient les éléments mis à jour en fonction du type de filtre et de la valeur d'entrée.
// Elle utilise les fonctions getIngredients, getAppliance, ou getUstensils en fonction du type de filtre.

// Méthode updateDisplay :
// Cette méthode met à jour l'affichage avec les éléments filtrés en utilisant la fonction displayFilterItems.

// Méthode resetDisplay :
// Cette méthode réinitialise l'affichage du filtre à une liste vide en utilisant la fonction displayFilterItems.

// Méthode triggerInputEvent :
// Cette méthode déclenche manuellement un événement 'input' sur un élément donné.

// Méthode blockEnterKey :
// Cette méthode bloque l'action par défaut de la touche Entrée lorsqu'elle est enfoncée dans l'input.