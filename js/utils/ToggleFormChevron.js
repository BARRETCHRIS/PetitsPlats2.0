export default class ToggleFormChevron {
    static toggleFormFilters(formId, chevronId, inputId, crossClass) {
        const form = document.getElementById(formId);
        const chevron = document.getElementById(chevronId);
        const input = document.getElementById(inputId);
        const cross = input ? input.nextElementSibling : null;

        // Vérifier la hauteur actuelle du formulaire
        let isExpanded = form.style.maxHeight === "380px";

        // Enregistrer l'état initial de la croix
        const initialCrossClass = cross ? cross.className : "";

        // Vider le champ de l'input s'il n'est pas vide et le formulaire est en train d'être réduit
        if (!isExpanded && input && input.value.trim() !== "") {
            input.value = "";
            // Mettre à jour la classe de la croix
            if (cross) {
                cross.className = initialCrossClass;
            }
        }

        // Mettre à jour la hauteur du formulaire et la rotation du chevron
        form.style.maxHeight = isExpanded ? "60px" : "380px";
        chevron.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    }

    static addToggleEventListener(elementId, formId, inputId, crossClass) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener("click", function () {
                ToggleFormChevron.toggleFormFilters(formId, elementId, inputId, crossClass);
            });

            // Enregistrer l'état initial de la croix au chargement de la page
            const input = document.getElementById(inputId);
            const cross = input ? input.nextElementSibling : null;
            if (cross) {
                element.dataset.initialCrossClass = cross.className;
            }
        }

        // Ajouter un écouteur pour rétablir la classe de la croix lors de l'expansion du formulaire
        document.addEventListener("transitionend", function (event) {
            const form = document.getElementById(formId);
            const chevron = document.getElementById(elementId);
            if (event.propertyName === "max-height" && form.style.maxHeight === "60px") {
                const input = document.getElementById(inputId);
                const cross = input ? input.nextElementSibling : null;
                if (cross) {
                    cross.className = element.dataset.initialCrossClass;
                }
            }
        });
    }
}