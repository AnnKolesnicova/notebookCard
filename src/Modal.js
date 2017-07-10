export default class Modal {
    constructor() {
        let button = document.querySelector('#header a');
        button.addEventListener("click", this.openModal.bind(this));

        let overlay = document.querySelector('.overlay');
        overlay.addEventListener("click", this.closeModal.bind(this));
    }

    openModal() {
        let modal = document.querySelector('.modal-form');
        document.querySelector('.overlay').hidden = false;
        modal.classList.add('visible');
    }

     closeModal() {
        let modal = document.querySelector('.modal-form');
        modal.classList.remove('visible');
        document.querySelector('.overlay').hidden = true;
    }
}
