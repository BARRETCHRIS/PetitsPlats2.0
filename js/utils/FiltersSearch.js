export default class FiltersSearch {
    constructor(getDatas, displayFiltersItems) {
        this.getDatas = getDatas;
        this.displayFiltersItems = displayFiltersItems;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const filterForms = document.querySelectorAll('.filter');
        filterForms.forEach(form => {
            const input = form.querySelector('.filter_search_input');
            const crossIcon = form.querySelector('.filter_search_cross');

            crossIcon.addEventListener('click', () => {
                // Réinitialise la valeur de l'input et déclenche un événement input manuellement
                input.value = '';
                this.triggerInputEvent(input);
            });

            input.addEventListener('input', () => {
                this.handleInputChange(form);
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Bloque l'action par défaut de la touche Entrée
                }
            });
        });
    }

    handleInputChange = async (form) => {
        const filterType = form.classList[0]; // Obtient le type de filtre à partir de la classe de formulaire
        const input = form.querySelector('.filter_search_input');

        const crossIcon = form.querySelector('.filter_search_cross');

        const inputValue = input.value.toLowerCase().trim();

        if (this.isValidInput(inputValue)) {
            if (inputValue) {
                crossIcon.classList.add('visible_cross');
            } else {
                crossIcon.classList.remove('visible_cross');
            }

            // Ajoute une vérification pour le nombre de caractères saisis
            if (inputValue.length >= 3 || inputValue.length === 0) {
                // Récupère les éléments mis à jour en fonction de la valeur d'entrée
                const updatedItems = await this.getUpdatedItems(filterType, inputValue);

                // Met à jour l'affichage avec les éléments filtrés
                this.displayFiltersItems.displayFilterItems(filterType, updatedItems, `${filterType}_form`);
            }
        } else {
            // La saisie n'est pas valide, réinitialise la liste à afficher
            this.displayFiltersItems.displayFilterItems(filterType, [], `${filterType}_form`);
        }
    }

    isValidInput(inputValue) {
        // Validation avec la regex pour bloquer les caractères spécifiques
        const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
        return !forbiddenCharactersRegex.test(inputValue);
    }

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

        // Filtre les éléments en fonction de la valeur d'entrée, ou renvoie tous les éléments si inputValue est vide
        const updatedItems = inputValue === '' ? originalItems : originalItems.filter(item =>
            item.toLowerCase().includes(inputValue)
        );

        return updatedItems;
    }

    triggerInputEvent(element) {
        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);
    }
}
