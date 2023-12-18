// Fonction pour gérer le clic sur le chevron
function toggleForm(formId, chevronId) {
    const form = document.getElementById(formId);
    const chevron = document.getElementById(chevronId);

    // Vérifier la hauteur actuelle du formulaire
    let isExpanded = form.style.maxHeight === "380px";

    // Mettre à jour la hauteur du formulaire et la rotation du chevron
    form.style.maxHeight = isExpanded ? "60px" : "380px";
    chevron.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
}

// Ajouter des gestionnaires de clic aux chevrons
document.getElementById("ingredients_chevron").addEventListener("click", function () {
    toggleForm("ingredients_form", "ingredients_chevron");
});

document.getElementById("appareils_chevron").addEventListener("click", function () {
    toggleForm("appareils_form", "appareils_chevron");
});

document.getElementById("ustensiles_chevron").addEventListener("click", function () {
    toggleForm("ustensiles_form", "ustensiles_chevron");
});