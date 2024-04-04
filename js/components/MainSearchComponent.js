import { DatasApi } from '../main.js';

export default class MainSearchComponent {
    constructor() {
        this.type = 'main';
        this.mainForm = document.getElementById('main_form');
        this.mainInput = document.getElementById('main_search');
        this.mainCross = document.getElementById('main_cross');
        this.mainLoop = document.getElementById('main_loop');
        this.mainErrorMsg = document.getElementById('main_error_msg');
        this.errorMessage = 'Pas de valeur correspondante';
        this.mainWordsArray = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.mainForm.addEventListener('submit', this.handleFormSubmit);
        if (this.mainLoop) {
            this.mainLoop.addEventListener('click', this.handleLoopClick);
        }
        this.mainInput.addEventListener('input', this.checkInput);
        this.mainCross.addEventListener('click', this.clearInputValueAndCross);
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.handleInput();
        if (this.isValidInput()) {
            this.clearInput();
        }
    }

    handleLoopClick = () => {
        this.handleInput();
        if (this.isValidInput()) {
            this.clearInput();
        }
    }

    clearInput() {
        this.mainInput.value = '';
        this.hideCross();
    }

    checkInput = () => {
        const inputValue = this.mainInput.value.trim();
        const hasForbiddenCharacters = this.containsForbiddenCharacters(inputValue);
        if (inputValue.length > 0) {
            this.showCross();
        } else {
            this.hideCross();
        }
        hasForbiddenCharacters ? this.showErrorMessage() : this.hideErrorMessage();
    }

    handleInput() {
        const inputValue = this.mainInput.value.trim();
        if (!this.containsForbiddenCharacters(inputValue)) {
            const cleanedWords = this.cleanInputValue(inputValue);
            const filteredWords = this.filterWords(cleanedWords);
            console.log("Données nettoyées :", cleanedWords);
            console.log("Données filtrées :", filteredWords);
            filteredWords.length === 0 ? this.showErrorMessage() : (this.updateMainWordsArray(filteredWords), this.hideErrorMessage());
        } else {
            this.showErrorMessage();
        }
    }

    clearInputValueAndCross = () => {
        this.mainInput.value = '';
        this.hideCross();
        this.hideErrorMessage();
        this.mainWordsArray = [];
        this.dispatchMainValuesChanged([]);
    }

    containsForbiddenCharacters(value) {
        const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
        return forbiddenCharactersRegex.test(value);
    }

    cleanInputValue(value) {
        const stopWords = ['la', 'le', 'les', 'de', 'du', 'et', 'ou', 'comme', 'dans', ',', '.', '/', ':', '?', '!', '&'];
        const splitValue = value.toLowerCase().split(/\s+|[,./:?!&]/);
        return splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
    }

    filterWords(words) {
        const allRecipes = DatasApi.getAllRecipes();
        return words.filter(word => {
            return allRecipes.some(recipe => {
                return (
                    recipe.name.toLowerCase().includes(word) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word)) ||
                    recipe.description.toLowerCase().includes(word)
                );
            });
        });
    }

    updateMainWordsArray(words) {
        words.forEach(word => {
            if (!this.mainWordsArray.includes(word)) {
                this.mainWordsArray.push(word);
                this.dispatchItemListSelected(word);
            }
        });
        this.dispatchMainWordsArrayChanged();
    }

    dispatchItemListSelected(value) {
        document.dispatchEvent(new CustomEvent('ItemListSelected', {
            detail: {
                value: value,
                type: this.type,
                element: ''
            }
        }));
    }

    showErrorMessage() {
        this.mainErrorMsg.textContent = this.errorMessage;
    }

    hideErrorMessage() {
        this.mainErrorMsg.textContent = '';
    }

    showCross() {
        this.mainCross.classList.add('visible_cross');
    }

    hideCross() {
        this.mainCross.classList.remove('visible_cross');
    }

    dispatchMainWordsArrayChanged() {
        document.dispatchEvent(new CustomEvent('MainWordsArrayChanged', { detail: { type: this.type, words: this.mainWordsArray } }));
    }

    dispatchMainValuesChanged(values) {
        document.dispatchEvent(new CustomEvent('MainValuesChanged', { detail: { type: this.type, values: values } }));
    }

    isValidInput() {
        return !this.containsForbiddenCharacters(this.mainInput.value.trim()) && this.filterWords(this.cleanInputValue(this.mainInput.value.trim())).length > 0;
    }
}




// import { DatasApi } from '../main.js';

// export default class MainSearchComponent {
//     constructor() {
//         this.type = 'main';
//         this.mainForm = document.getElementById('main_form');
//         this.mainInput = document.getElementById('main_search');
//         this.mainCross = document.getElementById('main_cross');
//         this.mainLoop = document.getElementById('main_loop');
//         this.mainErrorMsg = document.getElementById('main_error_msg');
//         this.errorMessage = 'Pas de valeur correspondante';
//         this.mainWordsArray = [];
//         this.initializeEventListeners();
//     }

//     initializeEventListeners() {
//         this.mainForm.addEventListener('submit', this.handleFormSubmit);
//         if (this.mainLoop) {
//             this.mainLoop.addEventListener('click', this.handleLoopClick);
//         }
//         this.mainInput.addEventListener('input', this.checkInput);
//         this.mainCross.addEventListener('click', this.clearInputValueAndCross);
//     }

//     handleFormSubmit = event => {
//         event.preventDefault();
//         this.handleInput();
//         if (!this.containsForbiddenCharacters(this.mainInput.value.trim())) {
//             this.clearInput();
//         }
//     }

//     handleLoopClick = () => {
//         this.handleInput();
//         if (!this.containsForbiddenCharacters(this.mainInput.value.trim())) {
//             this.clearInput();
//         }
//     }

//     clearInput() {
//         this.mainInput.value = '';
//         this.hideCross();
//     }

//     checkInput = () => {
//         const inputValue = this.mainInput.value.trim();
//         const hasForbiddenCharacters = this.containsForbiddenCharacters(inputValue);
//         if (inputValue.length > 0) {
//             this.showCross();
//         } else {
//             this.hideCross();
//         }
//         hasForbiddenCharacters ? this.showErrorMessage() : this.hideErrorMessage();
//     }

//     handleInput() {
//         const inputValue = this.mainInput.value.trim();
//         if (!this.containsForbiddenCharacters(inputValue)) {
//             const cleanedWords = this.cleanInputValue(inputValue);
//             const filteredWords = this.filterWords(cleanedWords);
//             console.log("Données nettoyées :", cleanedWords);
//             console.log("Données filtrées :", filteredWords);
//             filteredWords.length === 0 ? this.showErrorMessage() : (this.updateMainWordsArray(filteredWords), this.hideErrorMessage());
//         } else {
//             this.showErrorMessage();
//         }
//     }

//     clearInputValueAndCross = () => {
//         this.mainInput.value = '';
//         this.hideCross();
//         this.hideErrorMessage();
//         this.mainWordsArray = [];
//         this.dispatchMainValuesChanged([]);
//     }

//     containsForbiddenCharacters(value) {
//         const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
//         return forbiddenCharactersRegex.test(value);
//     }

//     cleanInputValue(value) {
//         const stopWords = ['la', 'le', 'les', 'de', 'du', 'et', 'ou', 'comme', 'dans', ',', '.', '/', ':', '?', '!', '&'];
//         const splitValue = value.toLowerCase().split(/\s+|[,./:?!&]/);
//         return splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
//     }

//     filterWords(words) {
//         const allRecipes = DatasApi.getAllRecipes();
//         return words.filter(word => {
//             return allRecipes.some(recipe => {
//                 return (
//                     recipe.name.toLowerCase().includes(word) ||
//                     recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word)) ||
//                     recipe.description.toLowerCase().includes(word)
//                 );
//             });
//         });
//     }

//     updateMainWordsArray(words) {
//         words.forEach(word => {
//             if (!this.mainWordsArray.includes(word)) {
//                 this.mainWordsArray.push(word);
//                 this.dispatchItemListSelected(word);
//             }
//         });
//         this.dispatchMainWordsArrayChanged();
//     }

//     dispatchItemListSelected(value) {
//         document.dispatchEvent(new CustomEvent('ItemListSelected', {
//             detail: {
//                 value: value,
//                 type: this.type,
//                 element: ''
//             }
//         }));
//     }

//     showErrorMessage() {
//         this.mainErrorMsg.textContent = this.errorMessage;
//     }

//     hideErrorMessage() {
//         this.mainErrorMsg.textContent = '';
//     }

//     showCross() {
//         this.mainCross.classList.add('visible_cross');
//     }

//     hideCross() {
//         this.mainCross.classList.remove('visible_cross');
//     }

//     dispatchMainWordsArrayChanged() {
//         document.dispatchEvent(new CustomEvent('MainWordsArrayChanged', { detail: { type: this.type, words: this.mainWordsArray } }));
//     }

//     dispatchMainValuesChanged(values) {
//         document.dispatchEvent(new CustomEvent('MainValuesChanged', { detail: { type: this.type, values: values } }));
//     }
// }