export default class MainSearchComponent {
    constructor() {
        this.type = 'main';
        this.mainForm = document.getElementById('main_form');
        this.mainInput = document.getElementById('main_search');
        this.mainCross = document.getElementById('main_cross');
        this.mainLoop = document.getElementById('main_loop');
        this.mainErrorMsg = document.getElementById('main_error_msg');
        this.errorMessage = 'Pas de recette correspondante';
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

    clearMainSearch(reset = false){
        if (reset){this.mainInput.value = ''};
        this.hideCross();
        this.hideErrorMessage();
        this.mainWordsArray = []; 
        this.emitWordsArrayChangedEvent();  
    }

    containsForbiddenCharacters(value) {
        const forbiddenCharactersRegex = /[<>+=@#$%^*();":{}|<>]/;
        forbiddenCharactersRegex.test(value) ? this.showErrorMessage() : this.hideErrorMessage();
    }

    cleanInputValue(value) {
        const stopWords = ['la', 'le', 'les', 'd', 'de', 'des', 'du', 'et', 'ou', 'où', 'comme', 'dans', 'avec', 'donc', 'or', 'car', 'ne', 'pas', 'un', 'une', ',', '.', '/', ':', '?', '!', '&', ''];
        const splitValue = value.toLowerCase().split(/\s+|[,./:?!&]/);
        this.mainWordsArray = splitValue.filter(word => !stopWords.includes(word));
        
        // Émettre l'événement de changement du tableau de mots
        this.emitWordsArrayChangedEvent();
    }

    emitWordsArrayChangedEvent() {
        // Émettre un événement personnalisé pour les changements de mainWordsArray
        document.dispatchEvent(new CustomEvent('mainWordsChanged', { 
            detail: {
                mainWordsArray : this.mainWordsArray,
            } 
        }));
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

            if(value.length>2){
                this.containsForbiddenCharacters(value);
                this.cleanInputValue(value);
            }else{
                this.clearMainSearch();
            };
            // console.log('tableau des valeur ', this.mainWordsArray);
        });

        this.mainCross.addEventListener('click', (event) => {
            this.clearMainSearch(true);
            // console.log('tableau des valeur ', this.mainWordsArray);
        });   
    }
}