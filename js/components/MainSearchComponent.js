import { DatasApi } from '../main.js'; // Import de l'instance de l'API depuis main.js

export default class MainSearchComponent {
    constructor() {
        // Initialisations...
        this.type = 'main';
        this.mainForm = document.getElementById(main_form);
        this.mainInput = document.getElementById(`main_search`);
        this.mainCross = document.getElementById(`main_cross`);
        this.mainLoop = document.getElementById(`main_Loop`);
        this.mainErrorMsg = document.getElementById(`main_error_msg`);
        this.errorMessage = 'Pas de valeur correspondante';
        this.mainWordsArray = [];
        this.initializeEventListeners();
    }

    checkValue() {
        const inputValue = this.mainInput.value.trim();
        const isValidLength = inputValue.length > 2;
        if (!isValidLength) {
            this.hideErrorMessage();
            this.filteredValues = []; // Réinitialise les valeurs filtrées
            return true;
        }
        const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
        const isValidInput = !forbiddenCharactersRegex.test(inputValue);
        if (!isValidInput) {
            this.showErrorMessage();
            this.filteredValues = []; // Réinitialise les valeurs filtrées
        } else {
            this.hideErrorMessage();
        }
        return isValidInput;
    }

    cleanInputValue(value) {
        // Nettoyage des valeurs
        const stopWords = ['la', 'le', 'les', 'de', 'du', 'et', 'ou', 'comme', 'dans', ',', '.', '/', ':', '?', '!', '&'/*autres mots à exclure ... */];
        const splitValue = value.trim().toLowerCase().split(/\s+|[,./:?!&]/);
        const mainWordSplit = splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
        console.log("Mots nettoyés : ", mainWordSplit);
        return mainWordSplit;
    }

    filterWords(words) {
        // Filtre des mots par rapport à DatasApi.getAllRecipes
        const allRecipes = DatasApi.getAllRecipes();
        console.log("Toutes les recettes : ", allRecipes);

        // Filtrage des mots
        const filteredWords = words.filter(word => {
            return allRecipes.some(recipe => {
                return (
                    recipe.name.toLowerCase().includes(word) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word)) ||
                    recipe.description.toLowerCase().includes(word)
                );
            });
        });
        console.log("Mots filtrés : ", filteredWords);
        return filteredWords;
    }

    updateMainWordsArray() {
        const inputValue = this.mainInput.value;

        // Nettoyage des valeurs
        const cleanedWords = this.cleanInputValue(inputValue);

        // Filtrage des mots
        const filteredWords = this.filterWords(cleanedWords);

        // Intègre les mots filtrés à this.mainWordsArray
        filteredWords.forEach(word => {
            if (!this.mainWordsArray.includes(word)) {
                this.mainWordsArray.push(word);
            }
        });

        // Diffusion de l'événement pour notifier le changement
        document.dispatchEvent(new CustomEvent('MainWordsArrayChanged', { detail: { type: this.type, words: this.mainWordsArray } }));
    }

    clearInputValueAndCross() {
        this.mainInput.value = '';
        this.mainCross.classList.remove('visible_cross');
        this.hideErrorMessage();
        this.filteredValues = []; // Réinitialise les valeurs filtrées
        document.dispatchEvent(new CustomEvent('MainValuesChanged', { detail: { type: this.type, values: [] } }));
    }

    showErrorMessage() {
        this.mainErrorMsg.textContent = this.errorMessage;
    }

    hideErrorMessage() {
        this.mainErrorMsg.textContent = '';
    }

    initializeEventListeners() {
        this.mainInput.addEventListener('input', async () => {
            const inputValue = this.mainInput.value.trim().toLowerCase();
            (inputValue !== '') ? this.mainCross.classList.add('visible_cross') : this.mainCross.classList.remove('visible_cross');
            // this.filterInputValue(inputValue); // Filtrage des valeurs à chaque saisie
            this.checkValue(); // Vérification de la valeur saisie
            this.updateMainWordsArray(); // Mise à jour de this.mainWordsArray avec les mots filtrés
            // this.checkFilteredValues(); // Vérifie s'il y a des correspondances
        });

        this.mainCross.addEventListener('click', () => {
            this.clearInputValueAndCross();
        });
    }
}


// import { DatasApi } from '../main.js'; // Import de l'instance de l'API depuis main.js

// export default class MainSearchComponent{
//     constructor() {
//         this.type = 'main';
//         this.mainForm = document.getElementById(main_form);
//         this.mainInput = document.getElementById(`main_search`);
//         this.mainCross = document.getElementById(`main_cross`);
//         this.mainLoop = document.getElementById(`main_Loop`);
//         this.mainErrorMsg = document.getElementById(`main_error_msg`);

//         this.errorMessage = 'Pas de valeur correspondante';
//         this.mainWordsArray = [];

//         this.initializeEventListeners();
//     }

//     checkValue(){
//         const inputValue = this.mainInput.value.trim();
//         const isValidLength = inputValue.length > 2;

//         if (!isValidLength) {
//             this.hideErrorMessage();
//             this.filteredValues = []; // Réinitialise les valeurs filtrées
//             return true;
//         }

//         const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
//         const isValidInput = !forbiddenCharactersRegex.test(inputValue);

//         if (!isValidInput) {
//             this.showErrorMessage();
//             this.filteredValues = []; // Réinitialise les valeurs filtrées
//         } else {
//             this.hideErrorMessage();
//         }

//         return isValidInput;
//     }    

//     splitInputValueIntoWords() {
//         const stopWords = ['la', 'le', 'les', 'de', 'du', 'et', 'ou', 'comme', 'dans', ',', '.', '/', ':', '?', '!', '&'/*autres mots à exclure ... */];
//         const inputValue = this.mainInput.value.trim().toLowerCase();
//         const splitValue = inputValue.split(/\s+|[,./:?!&]/);
//         const mainWordSplit = splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
//         console.log(mainWordSplit);
//         return mainWordSplit;
//     }


//     clearInputValueAndCross(){
//         this.mainInput.value = '';
//         this.mainCross.classList.remove('visible_cross');
//         this.hideErrorMessage();
//         this.filteredValues = []; // Réinitialise les valeurs filtrées
//         document.dispatchEvent(new CustomEvent('MainValuesChanged', { detail: { type: this.type, values: [] } }));
//     }

//     showErrorMessage(){
//         this.mainErrorMsg.textContent = this.errorMessage;
//     }

//     hideErrorMessage(){
//         this.mainErrorMsg.textContent = '';
//     }


//     initializeEventListeners() {
//         this.mainInput.addEventListener('input', async () => {
//             const inputValue = this.mainInput.value.trim().toLowerCase();
//             (inputValue !== '') ? this.mainCross.classList.add('visible_cross') : this.mainCross.classList.remove('visible_cross');
//             // this.filterInputValue(inputValue); // Filtrage des valeurs à chaque saisie
//             this.checkValue(); // Vérification de la valeur saisie
//             this.splitInputValueIntoWords(); // Découpage de la valeur en mots
//             // this.checkFilteredValues(); // Vérifie s'il y a des correspondances
//         });

//         this.mainCross.addEventListener('click', () => {
//             this.clearInputValueAndCross();
//         });
//     }
// }