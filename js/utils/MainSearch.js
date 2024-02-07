export default class Search {
    constructor(getDatas, displayRecipes) {
        this.getDatas = getDatas;
        this.displayRecipes = displayRecipes;

        // Crée un élément pour afficher le message d'erreur à côté de l'input
        this.errorMessageElement = document.createElement('p');
        this.errorMessageElement.classList.add('filter-error-message');
        this.errorMessageElement.style.display = 'none'; // Masque initialement le message d'erreur
        document.querySelector('.header_search').appendChild(this.errorMessageElement);

        // Ajoute un gestionnaire d'événements au clic sur la loupe
        const mainSearchLoop = document.querySelector('.main_search_loop');
        mainSearchLoop.addEventListener('click', () => {
            const mainSearchInput = document.getElementById('main_search');

            // Vérifie si la saisie contient des caractères interdits
            const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
            if (forbiddenCharactersRegex.test(mainSearchInput.value)) {
                // Affiche un message d'erreur à côté de l'input si des caractères interdits sont présents
                this.displayErrorMessage("La saisie contient des caractères interdits.");
                return;
            }

            const searchResult = this.handleSearch(mainSearchInput.value);

            // Affiche un message d'erreur si aucune correspondance n'est trouvée dans les recettes
            if (searchResult.length === 0) {
                this.displayErrorMessage("Aucune entrée correspondante dans les recettes.");
            } else {
                // Sinon, masque le message d'erreur
                this.errorMessageElement.style.display = 'none';
            }
        });

        // Ajoute un gestionnaire d'événements à l'input main_search pour afficher/masquer la croix
        const mainSearchInput = document.getElementById('main_search');
        mainSearchInput.addEventListener('input', () => {
            this.toggleClearButtonVisibility(mainSearchInput.value);
        });

        // Ajoute un gestionnaire d'événements au clic sur la croix pour vider le champ de l'input
        const clearButton = document.querySelector('.main_search_cross');
        clearButton.addEventListener('click', () => {
            mainSearchInput.value = ''; // Vide le champ de l'input
            clearButton.style.display = 'none'; // Masque la croix
            this.errorMessageElement.style.display = 'none'; // Masque le message d'erreur
            this.handleSearch(''); // Déclenche la recherche avec une chaîne vide pour afficher toutes les recettes
        });

        // Initialise la visibilité de la croix au chargement de la page
        this.toggleClearButtonVisibility('');
    }

    handleSearch(query) {
    // Liste de mots à exclure
        const stopWords = ['la', 'le', 'les', 'de', 'du', 'et', 'ou', 'comme', 'dans', /*autres mots à exclure ... */];

        // Vérifie si la longueur de la requête est supérieure à 2 caractères
        if (query.length >= 3) {
            // Split la requête en un tableau de mots
            const searchWords = query.toLowerCase().split(' ');
            console.log(searchWords);

            // Filtrer les mots de recherche pour exclure les stop words
            const filteredSearchWords = searchWords.filter(word => !stopWords.includes(word));
            console.log(filteredSearchWords);

            // Recherche les recettes correspondantes dans le tableau des recettes
            const matchingRecipes = this.searchRecipes(filteredSearchWords);

            // Affiche les recettes correspondantes si la recherche a produit un résultat
            if (matchingRecipes.length > 0) {
                this.displayRecipes.emptyContainer();
                this.displayRecipes.displayAllRecipes(matchingRecipes);
            } else {
                // Si la recherche n'a produit aucun résultat, affiche toutes les recettes
                this.displayRecipes.emptyContainer();
                this.displayRecipes.displayAllRecipes(this.getDatas.recipes);
            }

            return matchingRecipes; // Ajoute cette ligne pour retourner le résultat de la recherche
        } else {
            // Si la longueur de la requête est inférieure à 3 caractères, affiche toutes les recettes
            this.displayRecipes.emptyContainer();
            this.displayRecipes.displayAllRecipes(this.getDatas.recipes);

            return []; // Ajoute cette ligne pour retourner un tableau vide
        }
    }

    searchRecipes(searchWords) {
        // Filtre les recettes qui correspondent à tous les mots de la recherche dans les éléments name, ingredients et description
        return this.getDatas.recipes.filter(recipe =>
            searchWords.every(word =>
                recipe.name.toLowerCase().includes(word) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word)) ||
                recipe.description.toLowerCase().includes(word)
            )
        );
    }



    toggleClearButtonVisibility(value) {
        // Affiche/masque la croix en fonction de la présence de texte dans l'input
        const clearButton = document.querySelector('.main_search_cross');
        if (value.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    }

    displayErrorMessage(message) {
        // Affiche le message d'erreur à côté de l'input
        this.errorMessageElement.textContent = message;
        this.errorMessageElement.style.display = 'block';
    }
}