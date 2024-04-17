export default class FiltersSearchManager {
    constructor(inputsManager, getDatasApi) {
        this.inputsManager = inputsManager;
        this.getDatasApi = getDatasApi;

        this.ingredientsListOrigin = [];
        this.applianceListOrigin = [];
        this.ustensilsListOrigin = [];

        this.ingredientsListUpdated = [];
        this.applianceListUpdated = [];
        this.ustensilsListUpdated = [];

        this.ingredientsValue = '';
        this.applianceValue = '';
        this.ustensilsValue = '';

        this.setupEventListeners();
    }

    async initializeFilters() {
        await this.getDatasApi.getAllRecipes();
        this.updateIngredientsList();
        this.updateApplianceList();
        this.updateUstensilsList();
    }

    updateListAndLog(method, list, logMessage) {
        list = method.call(this.getDatasApi);
        console.log(logMessage, list);
        return list;
    }

    updateIngredientsList() {
        this.ingredientsListOrigin = this.updateListAndLog(this.getDatasApi.getIngredients, this.ingredientsListOrigin, 'Ingredients List Origin:');
        this.checkLengthAndForbiddenCharacters('ingredientsValue', this.ingredientsValue);
    }

    updateApplianceList() {
        this.applianceListOrigin = this.updateListAndLog(this.getDatasApi.getAppliance, this.applianceListOrigin, 'Appliance List Origin:');
        this.checkLengthAndForbiddenCharacters('applianceValue', this.applianceValue);
    }

    updateUstensilsList() {
        this.ustensilsListOrigin = this.updateListAndLog(this.getDatasApi.getUstensils, this.ustensilsListOrigin, 'Ustensils List Origin:');
        this.checkLengthAndForbiddenCharacters('ustensilsValue', this.ustensilsValue);
    }

    setupEventListeners() {
        document.addEventListener('ingredientsValueChanged', (event) => this.handleValueChanged('ingredientsValue', event.detail));
        document.addEventListener('applianceValueChanged', (event) => this.handleValueChanged('applianceValue', event.detail));
        document.addEventListener('ustensilsValueChanged', (event) => this.handleValueChanged('ustensilsValue', event.detail));
    }

    handleValueChanged(fieldName, value) {
        console.log(`${fieldName} Value in FiltersSearchManager:`, value);
        this.checkLengthAndForbiddenCharacters(fieldName, value);
    }

    checkLengthAndForbiddenCharacters(fieldName, value) {
        const isLengthValid = value.length >= 3;
        const isValidCharacters = this.isValidValue(value);
        this.filterLists(fieldName, value, isLengthValid, isValidCharacters);
        this.displayErrorMessage(fieldName, isLengthValid, isValidCharacters);
    }

    filterLists(fieldName, value) {
        let originalList;
        let updatedList;

        switch (fieldName) {
            case 'ingredientsValue':
                originalList = this.ingredientsListOrigin;
                updatedList = this.ingredientsListUpdated;
                break;

            case 'applianceValue':
                originalList = this.applianceListOrigin;
                updatedList = this.applianceListUpdated;
                break;

            case 'ustensilsValue':
                originalList = this.ustensilsListOrigin;
                updatedList = this.ustensilsListUpdated;
                break;

            default:
                break;
        }

        // Filtre la liste originale
        updatedList = this.filterList(originalList, value);

        // Mise à jour de la liste mise à jour
        switch (fieldName) {
            case 'ingredientsValue':
                this.ingredientsListUpdated = updatedList;
                console.log('Filtered Ingredients List:', this.ingredientsListUpdated);
                break;

            case 'applianceValue':
                this.applianceListUpdated = updatedList;
                console.log('Filtered Appliance List:', this.applianceListUpdated);
                break;

            case 'ustensilsValue':
                this.ustensilsListUpdated = updatedList;
                console.log('Filtered Ustensils List:', this.ustensilsListUpdated);
                break;

            default:
                break;
        }
    }

    filterList(list, value) {
        return list.filter(item =>
            item.includes(value.trim())
        );
    }

    isValidValue(inputValue) {
        const forbiddenCharactersRegex = /[<>+=!@#$%^&*(),.?":{}|<>]/;
        return !forbiddenCharactersRegex.test(inputValue);
    }

    displayErrorMessage(fieldName, isLengthValid, isValidCharacters) {
        const cleanedFieldName = fieldName.replace('Value', '');
        const inputElement = document.getElementById(`${cleanedFieldName}_search`);
        const errorMessageDiv = document.getElementById(`${cleanedFieldName}_error_msg`);

        if (inputElement && errorMessageDiv) {
            if (isLengthValid && !isValidCharacters) {
                errorMessageDiv.textContent = 'Aucune entrée correspondante.';
            } else if (isLengthValid && isValidCharacters && this.isNoMatch(fieldName)) {
                errorMessageDiv.textContent = 'Aucune entrée correspondante.';
            } else {
                errorMessageDiv.textContent = '';
            }
        } else {
            console.warn(`Warning: Unable to find input element or error message div for ${cleanedFieldName}`);
        }
    }

    isNoMatch(fieldName) {
        let updatedList;

        switch (fieldName) {
            case 'ingredientsValue':
                updatedList = this.ingredientsListUpdated;
                break;

            case 'applianceValue':
                updatedList = this.applianceListUpdated;
                break;

            case 'ustensilsValue':
                updatedList = this.ustensilsListUpdated;
                break;

            default:
                return true;
        }

        return updatedList.length === 0;
    }
}