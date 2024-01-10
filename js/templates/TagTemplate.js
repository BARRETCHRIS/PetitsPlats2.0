export default class TagTemplate {
    constructor(tagName) {
        this.tagName = tagName;
    }

    static generateHTML(tagName) {
        return `
            <div class="tag_wrap">
                <span class="tag">${tagName}</span>
                <span class="delete_tag">
                    <img class="tag_cross" src="assets/icons/cross.svg" alt="Supprimer le tag">
                </span>
            </div>
        `;
    }
}