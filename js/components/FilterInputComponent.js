import { DatasApi } from '../main.js';

export default class FilterInputComponent {
    constructor(type) {
        this.type = type;
        this.api = DatasApi;

        this.inputValue = [];
        this.filteredValues = []; // Tableau pour les valeurs filtrées

        this.listElement = document.getElementById(`${this.type}_list`);
        this.inputElement = document.getElementById(`${this.type}_search`);
        this.crossElement = document.getElementById(`${this.type}_cross`);
        this.errorElement = document.getElementById(`${this.type}_error_msg`);

        this.errorMessage = 'Pas de valeur correspondante';

        this.initializeEventListeners();
    }

    checkValue() {
        const inputValue = this.inputElement.value.trim();
        const isValidLength = inputValue.length > 2;

        if (!isValidLength) {
            this.hideErrorMessage();
            return true;
        }

        const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
        const isValidInput = !forbiddenCharactersRegex.test(inputValue);

        if (!isValidInput) {
            this.showErrorMessage();
        } else {
            this.hideErrorMessage();
        }

        return isValidInput;
    }

    filterInputValue(value) {

        try {
            switch (this.type) {
                case 'ingredients':
                    this.filteredValues = this.api.getAllIngredients(); // Utilisation de l'API
                    break;
                case 'appliance':
                    this.filteredValues = this.api.getAllAppliances();
                    break;
                case 'ustensils':
                    this.filteredValues = this.api.getAllUstensils();
                    break;
                default:
                    console.error('Type de filtre non reconnu');
                    break;
            }

            // Filtrage des valeurs
            this.filteredValues = this.filteredValues.filter(val => val.includes(value));
            console.log(this.filteredValues);

            // Déclencher un événement personnalisé pour notifier le changement de valeurs filtrées
            this.dispatchFilteredValuesEvent(this.filteredValues);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    dispatchFilteredValuesEvent(filteredValues) {
        const event = new CustomEvent('FilteredValuesChanged', {
            detail: { type: this.type, values: filteredValues }
        });
        document.dispatchEvent(event);
    }

    clearInputValueAndCross() {
        this.inputElement.value = '';
        this.crossElement.classList.remove('visible_cross');
    }

    showErrorMessage() {
        this.errorElement.textContent = this.errorMessage;
    }

    hideErrorMessage() {
        this.errorElement.textContent = '';
    }

    initializeEventListeners() {
        this.inputElement.addEventListener('input', () => {
            const inputValue = this.inputElement.value.trim();
            (inputValue !== '') ? this.crossElement.classList.add('visible_cross') : this.crossElement.classList.remove('visible_cross');
            this.filterInputValue(inputValue);
            this.checkValue();
        });

        this.crossElement.addEventListener('click', () => {
            this.inputElement.value = '';
            this.crossElement.classList.remove('visible_cross');
            this.hideErrorMessage();
            // Déclencher un événement pour notifier la suppression des valeurs filtrées
            this.dispatchFilteredValuesEvent([]);
        });

        this.inputElement.addEventListener('blur', () => {
            this.checkValue();
        });
    }
}


// import { DatasApi } from '../main.js'; // Import de l'instance de l'API depuis main.js

// export default class FilterInputComponent {
//     constructor(type) {
//         this.type = type;
//         this.api = DatasApi; // Instance de l'API

//         this.inputValue = []

//         this.listElement = document.getElementById(`${this.type}_list`);
//         this.inputElement = document.getElementById(`${this.type}_search`);
//         this.crossElement = document.getElementById(`${this.type}_cross`);
//         this.errorElement = document.getElementById(`${this.type}_error_msg`);

//         this.errorMessage = 'Pas de valeur correspondante'; // Message d'erreur par défaut

//         this.initializeEventListeners();
//     }

//     checkValue(){
//         const inputValue = this.inputElement.value.trim();
//         const isValidLength = inputValue.length > 2;
        
//         if (!isValidLength) {
//             this.hideErrorMessage();
//             return true;
//         }
        
//         const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
//         const isValidInput = !forbiddenCharactersRegex.test(inputValue);
        
//         if (!isValidInput) {
//             this.showErrorMessage();
//         } else {
//             this.hideErrorMessage();
//         }
        
//         return isValidInput;
//     }

//     filterInputValue(value) {
//         try {
//             switch (this.type) {
//                 case 'ingredients':
//                     this.filteredValues = this.api.getAllIngredients();
//                     break;
//                 case 'appliance':
//                     this.filteredValues = this.api.getAllAppliances();
//                     break;
//                 case 'ustensils':
//                     this.filteredValues = this.api.getAllUstensils();
//                     break;
//                 default:
//                     console.error('Type de filtre non reconnu');
//                     break;
//             }

//             this.filteredValues = this.filteredValues.filter(val => val.includes(value));
//             console.log(this.filteredValues);
//             return this.filteredValues;
//         } catch (error) {
//             console.error(error);
//             return [];
//         }
//     }

//     clearInputValueAndCross(){
//         this.inputElement.value = '';
//         this.crossElement.classList.remove('visible_cross');
//     }

//     showErrorMessage(){
//         this.errorElement.textContent = this.errorMessage;
//     }

//     hideErrorMessage(){
//         this.errorElement.textContent = '';
//     }

//     initializeEventListeners() {
//         this.inputElement.addEventListener('input', async () => {
//             const inputValue = this.inputElement.value.trim();
//             (inputValue !== '') ? this.crossElement.classList.add('visible_cross') : this.crossElement.classList.remove('visible_cross');
//             await this.filterInputValue(inputValue); // Filtrage des valeurs à chaque saisie
//             this.checkValue(); // Vérification de la valeur saisie
//         });

//         this.crossElement.addEventListener('click', () => {
//             this.inputElement.value = '';
//             this.crossElement.classList.remove('visible_cross');
//             this.hideErrorMessage();

//         });

//         this.inputElement.addEventListener('blur', () => {
//             this.checkValue();
//         });
//     }
// }
