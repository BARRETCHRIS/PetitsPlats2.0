export default class InputsManager {
    constructor() {
        this.values = {
            main: '',
            ingredients: '',
            appliance: '',
            ustensils: '',
        };

        this.setupEventListeners();
    }

    getLowerCaseValue(input) {
        return input.value.toLowerCase().trim();
    }

    handleInputClear(inputId) {
        this.values[inputId.replace('_search', '')] = '';
        this.dispatchChangeEvent(`${inputId.replace('_search', '')}ValueChanged`, this.values[inputId.replace('_search', '')]);
    }

    setupCrossListener(crossId, inputElement) {
        const crossElement = document.getElementById(crossId);

        inputElement.addEventListener('input', () => {
            this.toggleVisibleCross(crossElement, inputElement.value);
        });

        crossElement.addEventListener('click', () => {
            inputElement.value = '';
            this.handleInputClear(inputElement.id);
            this.toggleVisibleCross(crossElement, inputElement.value);
        });

        this.toggleVisibleCross(crossElement, inputElement.value);
    }

    toggleVisibleCross(crossElement, inputValue) {
        if (inputValue.trim() !== '') {
            crossElement.classList.add('visible_cross');
        } else {
            crossElement.classList.remove('visible_cross');
        }
    }

    setupEventListeners() {
        ['main', 'ingredients', 'appliance', 'ustensils'].forEach((type) => {
            const inputElement = document.getElementById(`${type}_search`);
            const crossId = `${type}_cross`;

            this.setupCrossListener(crossId, inputElement);

            inputElement.addEventListener('input', (event) => {
                this.values[type] = this.getLowerCaseValue(event.target);
                this.dispatchChangeEvent(`${type}ValueChanged`, this.values[type]);
                this.toggleVisibleCross(document.getElementById(crossId), this.values[type]);
            });
        });
    }

    dispatchChangeEvent(eventName, value) {
        const event = new CustomEvent(eventName, { detail: value });
        document.dispatchEvent(event);
    }
}