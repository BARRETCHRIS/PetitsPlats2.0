export default class TagTemplate {
    constructor(tagValue, tagType) {
        this.tagValue = tagValue;
        this.tagType = tagType
    }

    tagCard() {
        const tagCard = document.createElement('div');
        tagCard.classList.add('tag_wrap');

        const tagValue = document.createElement('span');
        tagValue.textContent = this.tagValue;
        tagValue.setAttribute('data-value', 'tagValue');
        tagValue.setAttribute('data-type', 'tagType');
        tagValue.classList.add('tag');

        const tagCross = document.createElement('span');
        tagCross.classList.add('delete_tag');
        tagCross.style.cursor = "pointer";
        const crossImg = document.createElement('img');
        crossImg.src = "assets/icons/cross.svg";
        crossImg.classList.add('tag_cross');
        crossImg.alt = "Supprimer le tag";
        crossImg.id = `${tagValue}_cross`;
        tagCross.appendChild(crossImg);

        tagCard.appendChild(tagValue);
        tagCard.appendChild(tagCross);

        tagCross.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('tagDeleted', { 
                detail: {
                    value: this.tagValue,
                    type: this.tagType,
                    element : tagCard
                } 
            }));
        });

        return tagCard;
    }
}