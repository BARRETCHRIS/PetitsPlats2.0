class FilterListTemplate {
    constructor() {
        this.listsDatasFilters = new ListsDatasFilters();
        console.log(this.listsDatasFilters);
        this.ingredientsList = this.listsDatasFilters.ingredientsList;
        this.appliancesList = this.listsDatasFilters.appliancesList;
        this.ustensilsList = this.listsDatasFilters.ustensilsList;
    }

    populateIngredientsList() {
        const ingredientsListElement = document.querySelector('.ingredients_list');
        this.ingredientsList.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsListElement.appendChild(li);
        });
    }

    populateApplianceList() {
        const applianceListElement = document.querySelector('.appliance_list');
        this.appliancesList.forEach(appliance => {
            const li = document.createElement('li');
            li.textContent = appliance;
            applianceListElement.appendChild(li);
        });
    }

    populateUstensilsList() {
        const ustensilsListElement = document.querySelector('.ustensils_list');
        this.ustensilsList.forEach(ustensil => {
            const li = document.createElement('li');
            li.textContent = ustensil;
            ustensilsListElement.appendChild(li);
        });
    }

    populateAllLists() {
        this.populateIngredientsList();
        this.populateApplianceList();
        this.populateUstensilsList();
    }
}

const filterListTemplate = new FilterListTemplate();
filterListTemplate.populateAllLists();
