export default class Form {
    constructor(list) {
        this.list = list;
        this.cardNumber = document.querySelectorAll('#card .number input');
        this.comment = document.querySelector('#card .comment textarea');
        this.button = document.querySelector('#card .submit');
        this.visaLogo = document.querySelector('#card .fa-cc-visa');
        this.masterCardLogo = document.querySelector('#card .fa-cc-mastercard');
        this.addEventListeners();

    }

    addEventListeners() {
        this.cardNumber.forEach((item) => {
            item.addEventListener('keyup', this.inputKeyUp.bind(this))
        });
        this.button.addEventListener('click', this.getDataForm.bind(this))
    }

    inputKeyUp(event) {
        let length = event.target.value.length;
        if (length === 4) {
            let index = Array.prototype.indexOf.call(this.cardNumber, event.target);
            let nextIndex = index + 1;
            let nextEl = this.cardNumber[nextIndex];
            if (nextEl) nextEl.focus();
        }
        this.validateCardNumber();
    }

    validateCardNumber() {
        let prefix = this.cardNumber[0].value[0];
        let validateText = document.querySelector('.validate-text');

        while (validateText.hasChildNodes()) {
            validateText.removeChild(validateText.firstChild);
        }

        switch (prefix) {
            case '5':
                this.masterCardLogo.hidden = false;
                this.visaLogo.hidden = true;
                this.button.disabled = false;
                break;
            case '4':
                this.visaLogo.hidden = false;
                this.masterCardLogo.hidden = true;
                this.button.disabled = false;
                break;
            case undefined:
                validateText.innerText += 'Enter the card number';
                this.visaLogo.hidden = true;
                this.masterCardLogo.hidden = true;
                this.button.disabled = true;
                break;
            default:
                validateText.innerText += 'Enter the card number Visa or MasterCard';
                this.visaLogo.hidden = true;
                this.masterCardLogo.hidden = true;
                this.button.disabled = true;
        }
    }

    getDataForm() {
        let inputsDataValue = Array.prototype.map.call(this.cardNumber, (item) => {
            return item.value;
        });
        let inputsData = inputsDataValue.join(" ");

        if (inputsData.length === 19) {
            let cardsData = localStorage.getItem('cards');
            let cards = !cardsData ? [] : JSON.parse(cardsData);
            cards.push({
                card: inputsData,
                comment: this.comment.value
            });
            cardsData = JSON.stringify(cards);
            localStorage.setItem('cards', cardsData);
            this.list.render();
        }
        let modal = document.querySelector('.modal-form');
        modal.classList.remove('visible');
        document.querySelector('.overlay').hidden = true;
        document.querySelector('#card').reset();
    }
}