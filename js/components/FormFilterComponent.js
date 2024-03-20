import FilterInputComponent from './FilterInputComponent.js';

export default class FormFilterComponent {
    constructor(type) {
        this.type = type;

        this.inputManager = new FilterInputComponent(this.type);

        this.formElement = document.getElementById(`${this.type}_form`);
        this.chevronElement = document.getElementById(`${this.type}_chevron`);
        
        // initialisation de l'écouteur pour l'ouverture d'un formulaire avec fermeture des autres formulaires ouverts
        this.initializeEventListeners();
    }

    openForm(){
        dispatchEvent(new Event('OpenFormEvent'));
        this.formElement.style.maxHeight = '380px';
        this.chevronElement.style.transform = 'rotate(180deg)';
        this.inputElement = '';
    }

    closeForm(){
        this.formElement.style.maxHeight = '60px';
        this.chevronElement.style.transform = 'rotate(0deg)';
        this.inputManager.clearInputValueAndCross(); // Appel de la méthode pour vider la valeur de l'input et efface la croix
    }

    openingFormHandle(){
        (this.formElement.style.maxHeight === "60px") ? this.openForm() : this.closeForm();
    }

    initializeEventListeners() {
        // Ajouter l'écouteur d'événement pour les valeurs filtrées changées
        document.addEventListener('FilteredValuesChanged', (event) => {
            const { type, values } = event.detail;
            // Mettre à jour l'affichage en fonction du type de filtre et des nouvelles valeurs
        });

        addEventListener('OpenFormEvent', () => {
            this.closeForm();
        });

        this.chevronElement.addEventListener('click', () => {
            this.openingFormHandle();
        });
    }
}