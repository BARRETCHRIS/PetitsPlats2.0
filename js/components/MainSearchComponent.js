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

    clearValue(){
        this.mainInput.value = '';
        this.hideCross();
        this.hideErrorMessage();
        this.mainWordsArray = [];
        this.emitEmptyRecipesEvent(); // Émettre l'événement pour réinitialiser foundRecipes
    }

    containsForbiddenCharacters(value) {
        const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
        forbiddenCharactersRegex.test(value) ? this.showErrorMessage() : this.hideErrorMessage();
        return forbiddenCharactersRegex.test(value);
    }

    cleanInputValue(value) {
        const stopWords = ['la', 'le', 'les', 'de', 'des', 'du', 'et', 'ou', 'où', 'comme', 'dans', 'avec', 'donc', 'or', 'car', 'ne', 'pas', 'un', 'une', ',', '.', '/', ':', '?', '!', '&'];
        const splitValue = value.toLowerCase().split(/\s+|[,./:?!&]/);
        this.mainWordsArray = splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
        return this.mainWordsArray;
    }

    searchRecipes() {
        const allRecipes = DatasApi.getAllRecipes();
        const foundRecipes = [];

        allRecipes.forEach(recipe => {
            const { name, description, ingredients } = recipe;
            const lowercaseName = name.toLowerCase();
            const lowercaseDescription = description.toLowerCase();

            const nameMatches = this.mainWordsArray.every(word => lowercaseName.includes(word));
            const descriptionMatches = this.mainWordsArray.every(word => lowercaseDescription.includes(word));
            const ingredientsMatches = ingredients.some(ingredient => this.mainWordsArray.every(word => ingredient.ingredient.toLowerCase().includes(word)));

            if (nameMatches || descriptionMatches || ingredientsMatches && this.mainInput.value.length > 2) {
                foundRecipes.push(recipe);
            }
        });

        this.emitEventChange(foundRecipes); // Émettre l'événement avec les nouvelles recettes trouvées
        return foundRecipes;
    }

    handleInputChange(value) {
        if (value.length > 2) {
            this.containsForbiddenCharacters(value);
            this.cleanInputValue(value);
            this.searchRecipes();
        } else {
            this.hideErrorMessage();
            this.mainWordsArray = [];
            this.filteredRecipes = [];
            if (value.length === 0) {
                this.emitEmptyRecipesEvent(); // Réinitialise foundRecipes si l'entrée est vide
            }
        }
    }

    emitEventChange(foundRecipes) {
        const event = new CustomEvent('foundRecipesChange', {
            detail: {
                foundRecipes: foundRecipes
            }
        });
        document.dispatchEvent(event);
    }

    emitEmptyRecipesEvent() {
        const event = new CustomEvent('foundRecipesChange', {
            detail: {
                foundRecipes: []
            }
        });
        document.dispatchEvent(event);
    }

    initializeEventListeners() {
        this.mainInput.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); 
            }
        }); 

        this.mainInput.addEventListener('input', (event) => {
            const value = this.mainInput.value;
            value.length > 0 ? this.showCross() : this.hideCross();
            this.handleInputChange(value);
        });

        this.mainCross.addEventListener('click', (event) => {
            this.clearValue();
        });    
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

//     clearValue(){
//         this.mainInput.value = '';
//         this.hideCross();
//         this.hideErrorMessage();
//         this.mainWordsArray = [];
//         // console.log('main array', this.mainWordsArray);
//     }

//     containsForbiddenCharacters(value) {
//         const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
//         forbiddenCharactersRegex.test(value) ? this.showErrorMessage() : this.hideErrorMessage();
//         return forbiddenCharactersRegex.test(value);
//     }

//     cleanInputValue(value) {
//         const stopWords = ['la', 'le', 'les', 'de', 'des', 'du', 'et', 'ou', 'où', 'comme', 'dans', 'avec', 'donc', 'or', 'car', 'ne', 'pas', 'un', 'une', ',', '.', '/', ':', '?', '!', '&'];
//         const splitValue = value.toLowerCase().split(/\s+|[,./:?!&]/);
//         this.mainWordsArray = splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
//         // console.log('Valeur Spliter', splitValue);
//         // console.log('Valeur nettoyée', this.mainWordsArray);
//         return this.mainWordsArray;
//     }

//     searchRecipes() {
//         const allRecipes = DatasApi.getAllRecipes();
//         const foundRecipes = [];

//         // Parcours de chaque recette
//         allRecipes.forEach(recipe => {
//             const { name, description, ingredients } = recipe;
//             const lowercaseName = name.toLowerCase();
//             const lowercaseDescription = description.toLowerCase();

//             const nameMatches = this.mainWordsArray.every(word => lowercaseName.includes(word));
//             const descriptionMatches = this.mainWordsArray.every(word => lowercaseDescription.includes(word));
//             const ingredientsMatches = ingredients.some(ingredient => this.mainWordsArray.every(word => ingredient.ingredient.toLowerCase().includes(word)));

//             if (nameMatches || descriptionMatches || ingredientsMatches &&this.mainInput.value.length > 2) {
//                 foundRecipes.push(recipe);
//             }
//         });

//         // Vérifie si aucun mot n'est trouvé dans les recettes
//         const noMatchingWords = foundRecipes.length === 0 && this.mainWordsArray.length > 0;

//         // Affiche le message d'erreur si aucun mot n'est trouvé dans les recettes
//         if (noMatchingWords) {
//             this.showErrorMessage();
//         } else {
//             this.hideErrorMessage();
//         }

//         // Émet un événement avec le nouveau foundRecipes
//         const event = new CustomEvent('foundRecipesChange', {
//             detail: {
//                 foundRecipes: foundRecipes
//             }
//         });
//         document.dispatchEvent(event);

//         console.log('Recettes trouvées', foundRecipes);
//         return foundRecipes;
//     }

//     handleInputChange(value) {
//         if (value.length > 2) {
//             this.containsForbiddenCharacters(value);
//             this.cleanInputValue(value);
//             this.searchRecipes();
//             this.emitEventChange();
//         } else {
//             this.hideErrorMessage();
//             this.mainWordsArray = [];
//             this.filteredRecipes = []; // Réinitialiser foundRecipes
//             this.emitEventChange(); // Émettre l'événement pour signaler la réinitialisation
//         }
//     }


//     emitEventChange() {
//         const event = new CustomEvent('mainSearchChange', {
//             detail: {
//                 wordsArray: this.mainWordsArray
//             }
//         });
//         document.dispatchEvent(event);
//     }

//     initializeEventListeners() {
//         // Empêche le comportement par défaut
//         this.mainInput.addEventListener('keydown', (event) => {
//             if (event.key === "Enter") {
//                 event.preventDefault(); 
//             }
//         }); 

//         this.mainInput.addEventListener('input', (event) => {
//             const value = this.mainInput.value;
//             value.length > 0 ? this.showCross() : this.hideCross();
//             this.handleInputChange(value);
//             this.searchRecipes();
//             // console.log('Main Word Array in EventInput MainSearch', this.mainWordsArray);
//         });

//         this.mainCross.addEventListener('click', (event) => {
//             this.clearValue();
//             this.emitEventChange();
//             // console.log('Main Word Array in EventClick MainSearch', this.mainWordsArray);
//         });    
//     }
// }



// // import { DatasApi } from '../main.js';

// // export default class MainSearchComponent {
// //     constructor() {
// //         this.type = 'main';
// //         this.mainForm = document.getElementById('main_form');
// //         this.mainInput = document.getElementById('main_search');
// //         this.mainCross = document.getElementById('main_cross');
// //         this.mainLoop = document.getElementById('main_loop');
// //         this.mainErrorMsg = document.getElementById('main_error_msg');
// //         this.errorMessage = 'Pas de valeur correspondante';
// //         this.mainWordsArray = [];
// //         this.initializeEventListeners();
// //     }

// //     showErrorMessage() {
// //         this.mainErrorMsg.textContent = this.errorMessage;
// //     }

// //     hideErrorMessage() {
// //         this.mainErrorMsg.textContent = '';
// //     }

// //     showCross() {
// //         this.mainCross.classList.add('visible_cross');
// //     }

// //     hideCross() {
// //         this.mainCross.classList.remove('visible_cross');
// //     }

// //     clearValue(){
// //         this.mainInput.value = '';
// //         this.hideCross();
// //         this.hideErrorMessage();
// //         this.mainWordsArray = [];
// //         console.log('main array', this.mainWordsArray);
// //     }

// //     containsForbiddenCharacters(value) {
// //         const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
// //         forbiddenCharactersRegex.test(value) ? this.showErrorMessage() : this.hideErrorMessage();
// //         return forbiddenCharactersRegex.test(value);
// //     }

// //     cleanInputValue(value) {
// //         const stopWords = ['la', 'le', 'les', 'de', 'des', 'du', 'et', 'ou', 'où', 'comme', 'dans', 'avec', 'donc', 'or', 'car', 'ne', 'pas', 'un', 'une', ',', '.', '/', ':', '?', '!', '&'];
// //         const splitValue = value.toLowerCase().split(/\s+|[,./:?!&]/);
// //         this.mainWordsArray = splitValue.filter(word => word.length > 2 && !stopWords.includes(word));
// //         console.log('Valeur Spliter', splitValue);
// //         console.log('Valeur nettoyée', this.mainWordsArray);
// //         return this.mainWordsArray;
// //     }

// //     searchRecipes() {
// //         const allRecipes = DatasApi.getAllRecipes();
// //         const foundRecipes = [];

// //         // Parcours de chaque recette
// //         allRecipes.forEach(recipe => {
// //             const { name, description, ingredients } = recipe;
// //             const lowercaseName = name.toLowerCase();
// //             const lowercaseDescription = description.toLowerCase();

// //             const nameMatches = this.mainWordsArray.every(word => lowercaseName.includes(word));
// //             const descriptionMatches = this.mainWordsArray.every(word => lowercaseDescription.includes(word));
// //             const ingredientsMatches = ingredients.some(ingredient => this.mainWordsArray.every(word => ingredient.ingredient.toLowerCase().includes(word)));

// //             if (nameMatches || descriptionMatches || ingredientsMatches &&this.mainInput.value.length > 2) {
// //                 foundRecipes.push(recipe);
// //             }
// //         });

// //         // Vérifie si aucun mot n'est trouvé dans les recettes
// //         const noMatchingWords = foundRecipes.length === 0 && this.mainWordsArray.length > 0;

// //         // Affiche le message d'erreur si aucun mot n'est trouvé dans les recettes
// //         if (noMatchingWords) {
// //             this.showErrorMessage();
// //         } else {
// //             this.hideErrorMessage();
// //         }

// //         console.log('Recettes trouvées', foundRecipes);
// //         return foundRecipes;
// //     }

// //     handleInputChange(value) {
// //         if (value.length > 2) {
// //             this.containsForbiddenCharacters(value);
// //             this.cleanInputValue(value);
// //             this.emitEventChange();
// //         } else {
// //             this.hideErrorMessage();
// //             this.mainWordsArray = [];
// //         }
// //     }

// //     emitEventChange() {
// //         const event = new CustomEvent('mainSearchChange', {
// //             detail: {
// //                 wordsArray: this.mainWordsArray
// //             }
// //         });
// //         document.dispatchEvent(event);
// //     }

// //     initializeEventListeners() {
// //         // Empêche le comportement par défaut
// //         this.mainInput.addEventListener('keydown', (event) => {
// //             if (event.key === "Enter") {
// //                 event.preventDefault(); 
// //             }
// //         }); 

// //         this.mainInput.addEventListener('input', (event) => {
// //             const value = this.mainInput.value;
// //             value.length > 0 ? this.showCross() : this.hideCross();
// //             this.handleInputChange(value);
// //             this.searchRecipes();
// //         });

// //         this.mainCross.addEventListener('click', (event) => {
// //             this.clearValue();
// //             this.emitEventChange();
// //         }); 
// //     }
// // }