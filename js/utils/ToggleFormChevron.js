
export default class ToggleFormChevron {
    static toggleFormFilters(formId, chevronId) {
        const form = document.getElementById(formId);
        const chevron = document.getElementById(chevronId);

        // Vérifier la hauteur actuelle du formulaire
        let isExpanded = form.style.maxHeight === "380px";

        // Mettre à jour la hauteur du formulaire et la rotation du chevron
        form.style.maxHeight = isExpanded ? "60px" : "380px";
        chevron.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    }

    static addToggleEventListener(elementId, formId, chevronId) {
        document.getElementById(elementId).addEventListener("click", function () {
            ToggleFormChevron.toggleFormFilters(formId, chevronId);
        });
    }
}
