export default class List {
    constructor() {
        this.cardList = document.querySelector('.card-list');
        this.cardDiv = document.querySelector('.cards .card');
    }

    render() {
        let localValueInput = localStorage.getItem('cards');
        let cards = JSON.parse(localValueInput);
        this.cardList.innerHTML = "";
        cards.forEach((item) => {
            let cloneCard = this.cardDiv.cloneNode(true);
            if (cloneCard) {
                let number = cloneCard.querySelector('.number span');
                number.innerHTML += item.card;
                let comment = cloneCard.querySelector('.comment span');
                comment.innerHTML += 'Comment: ' + item.comment;

                cloneCard.hidden = false;
                this.cardList.appendChild(cloneCard);
            }
            // console.log(item.card);
        });
    }
}
