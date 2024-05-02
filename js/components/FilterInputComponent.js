import { DatasApi } from '../main.js'; // Import de l'instance de l'API depuis main.js

export default class FilterInputComponent {
    constructor(type) {
        this.type = type;

        this.listElement = document.getElementById(`${this.type}_list`);
        this.inputElement = document.getElementById(`${this.type}_search`);
        this.crossElement = document.getElementById(`${this.type}_cross`);
        this.errorElement = document.getElementById(`${this.type}_error_msg`);

        this.errorMessage = 'Pas de valeur correspondante'; // Message d'erreur par défaut
        this.filteredValues = []; // Valeurs filtrées

        this.initializeEventListeners();
    }

    checkValue(){
        const inputValue = this.inputElement.value.trim();
        const isValidLength = inputValue.length > 2;

        if (!isValidLength) {
            this.hideErrorMessage();
            this.filteredValues = []; // Réinitialise les valeurs filtrées
            return true;
        }

        const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
        const isValidInput = !forbiddenCharactersRegex.test(inputValue);

        if (!isValidInput) {
            this.showErrorMessage();
            this.filteredValues = []; // Réinitialise les valeurs filtrées
        } else {
            this.hideErrorMessage();
        }

        return isValidInput;
    }

    checkFilteredValues() {
        const inputValue = this.inputElement.value.trim();
        const isValidLength = inputValue.length > 2;
        if (this.filteredValues.length === 0 && isValidLength) {
            this.showErrorMessage(); // Afficher le message d'erreur s'il n'y a pas de correspondance
        } else {
            this.hideErrorMessage(); // Masquer le message d'erreur s'il y a des correspondances
        }
    }

    filterInputValue(value) {
        try {
            const inputValue = this.inputElement.value.trim();
            if (inputValue.length > 2) {
                this.filteredValues = DatasApi.getItemsByType(this.type);
                this.filteredValues = this.filteredValues.filter(val => val.includes(value));
                console.log(this.filteredValues);
            } else {
                this.filteredValues = DatasApi.getItemsByType(this.type);
            }
            document.dispatchEvent(new CustomEvent('FilteredValuesChanged', { detail: { type: this.type, values: this.filteredValues } }));
            return this.filteredValues;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    clearInputValueAndCross(){
        this.inputElement.value = '';
        this.crossElement.classList.remove('visible_cross');
        this.hideErrorMessage();
        this.filteredValues = []; // Réinitialise les valeurs filtrées
        document.dispatchEvent(new CustomEvent('FilteredValuesChanged', { detail: { type: this.type, values: [] } }));
    }

    showErrorMessage(){
        this.errorElement.textContent = this.errorMessage;
    }

    hideErrorMessage(){
        this.errorElement.textContent = '';
    }

    initializeEventListeners() {
        this.inputElement.addEventListener('input', async () => {
            const inputValue = this.inputElement.value.trim().toLowerCase();
            (inputValue !== '') ? this.crossElement.classList.add('visible_cross') : this.crossElement.classList.remove('visible_cross');
            this.filterInputValue(inputValue); // Filtrage des valeurs à chaque saisie
            this.checkValue(); // Vérification de la valeur saisie
            this.checkFilteredValues(); // Vérifie s'il y a des correspondances
        });
        
        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Empêcher le comportement par défaut
            }
        });

        this.crossElement.addEventListener('click', () => {
            this.clearInputValueAndCross();
        });

        this.inputElement.addEventListener('blur', () => {
            this.checkValue();
            this.checkFilteredValues();
        });
    }
}