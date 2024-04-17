import { DatasApi } from '../main.js'; // Importation de DatasApi depuis le fichier main.js

export default class FilteredDatasController {
    constructor() {
        this.tagsList = []; // Tableau pour enregistrer les tags
        this.MainSeachWord =[] // Tableau pour enregistrer les mots filtres de MainSearchComponents
        this.filtersDatas
        this.originalRecipes = DatasApi.getAllRecipes(); // Appel de la fonction getAllRecipes
        this.filteredRecipes = []; // Tableau pour enregistrer les recettes filtrées

        this.mainErrorMsg = document.getElementById('main_error_msg');
        this.errorMessage = 'Pas de valeur correspondante';

        // Initialisation des écouteurs d'événements
        this.initializeEventListeners();
    }

    showErrorMessage() {
        this.mainErrorMsg.textContent = this.errorMessage;
    }

    hideErrorMessage() {
        this.mainErrorMsg.textContent = '';
    }

    // Fonction pour gérer l'événement listTagChanged
    handleListTagChanged(event) {
        const { tagsList } = event.detail;
        this.tagsList = tagsList.slice(); // Copie de tagsList
        this.filterRecipes(); // Filtrer les recettes
    }

    // Fonction pour gérer l'événement mainWordsChanged
    handleMainWordsChanged(event) {
        const { mainWordsArray } = event.detail;
        this.MainSeachWord = mainWordsArray.slice(); // Copie de mainWordsArray
        this.filterRecipes(); // Filtrer les recettes
    }

    // Fonction pour filtrer les recettes en fonction des critères
    filterRecipes() {
        this.filteredRecipes = []; // Réinitialisation de filteredRecipes
        this.originalRecipes.forEach(recipe => {
            // Vérification des critères de tagsList
            const tagMatches = this.tagsList.every(tag => {
                switch(tag.type) {
                    case 'ingredients':
                        return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.value.toLowerCase());
                    case 'appliance':
                        return recipe.appliance.toLowerCase() === tag.value.toLowerCase();
                    case 'ustensils':
                        return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tag.value.toLowerCase());
                    default:
                        return false;
                }
            });

            // Vérification des mots-clés de MainSeachWord dans le titre, la description et les ingrédients
            const searchMatches = this.MainSeachWord.every(word =>
                recipe.name.toLowerCase().includes(word.toLowerCase()) ||
                recipe.description.toLowerCase().includes(word.toLowerCase()) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word.toLowerCase()))
            );

            // Si la recette correspond à tous les critères de tagsList et contient tous les mots-clés de MainSeachWord, l'ajouter à filteredRecipes
            if (tagMatches && searchMatches) {
                this.filteredRecipes.push(recipe);
            }
        });

        console.log('Recettes filtrées:', this.filteredRecipes);
    }

    // Fonction pour initialiser les écouteurs d'événements
    initializeEventListeners() {
        // Écoute de l'événement listTagChanged émis par TagsController.js
        document.addEventListener('listTagChanged', (event) => {
            this.handleListTagChanged(event);
        }); 

        // Écoute de l'événement mainWordsChanged émis par MainSearchComponent.js
        document.addEventListener('mainWordsChanged', (event) => {
            this.handleMainWordsChanged(event);
        }); 
    }    
}


// import { DatasApi } from '../main.js'; // Importation de DatasApi depuis le fichier main.js

// export default class FilteredDatasController {
//     constructor() {
//         this.tagsList = []; // Tableau pour enregistrer les tags
//         this.MainSeachWord =[] // Tableau pour enregistrer les mots filtres de MainSearchComponents
//         this.originalRecipes = DatasApi.getAllRecipes;
//         this.filteredRecipes = []; // Tableau pour enregistrer les recettes filtrées

//         this.mainErrorMsg = document.getElementById('main_error_msg');
//         this.errorMessage = 'Pas de valeur correspondante';

//         // Initialisation des écouteurs d'événements
//         this.initializeEventListeners();

       
//     }

//     showErrorMessage() {
//         this.mainErrorMsg.textContent = this.errorMessage;
//     }

//     hideErrorMessage() {
//         this.mainErrorMsg.textContent = '';
//     }

//     // Fonction pour gérer l'événement listTagChanged
//     handleListTagChanged(event) {
//         const { tagsList } = event.detail;
//         // Réinitialise tagsList
//         this.tagsList = [];
//         // Ajoute les éléments restants de tagsList à tagsList
//         tagsList.forEach(tag => {
//             this.tagsList.push(tag);
//         });
//         console.log('Tags List updated:', this.tagsList);
//     }

//     // Fonction pour gérer l'événement listTagChanged
//     handleMainWordsChanged(event) {
//         const {mainWordsArray} = event.detail;
//         // Réinitialise MainSeachWord
//         this.MainSeachWord = [];
//         // Ajoute les éléments restants de mainWordsArray à MainSeachWord
//         mainWordsArray.forEach(word => {
//             this.MainSeachWord.push(word);
//         });
//         console.log('Main Words List updated:', this.MainSeachWord);
//     }

//     // Fonction pour initialiser les écouteurs d'événements
//     initializeEventListeners() {
//         // Écoute de l'événement listTagChanged émis par TagsController.js
//         document.addEventListener('listTagChanged', (event) => {
//             this.handleListTagChanged(event);
//             console.log('Tags List updated:', this.tagsList);
//         }); 

//         // Écoute de l'événement mainWordsChanged émis par MainSearchComponent.js
//         document.addEventListener('mainWordsChanged', (event) => {
//             this.handleMainWordsChanged(event);
//             console.log('Main Words List updated:', this.MainSeachWord);
//         }); 
//     }


// }